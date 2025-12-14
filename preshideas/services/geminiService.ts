import path from "path";
import * as dotenv from "dotenv";
import {
  GoogleGenerativeAI,
  GenerativeModel,
} from "@google/generative-ai";
import { WorkflowStep, AgentConfig } from "../types";

// --- FORCE LOAD ENV VARS ---
if (typeof window === "undefined") {
  try {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
  } catch (e) {
    // Ignore
  }
}

// --- CONSTANTS ---
// We will cycle through these until one works for your API Key
const MODEL_CANDIDATES = [
  "gemini-1.5-flash",      // Newest Standard
  "gemini-1.5-flash-001",  // Specific Version
  "gemini-1.5-flash-8b",   // Lightweight Version
  "gemini-1.0-pro",        // Legacy Standard (most compatible)
  "gemini-pro"             // Oldest Alias
];

export class GeminiServiceError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "GeminiServiceError";
  }
}

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string | undefined;

  constructor(options: { apiKey?: string } = {}) {
    this.apiKey = (options.apiKey || process.env.API_KEY || "").trim();
    
    if (this.apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
      } catch (err) {
        console.error("Failed to init Gemini Client:", err);
      }
    }
  }

  // --- CORE HELPER: TRY ALL MODELS ---
  private async generateWithFallback(prompt: string): Promise<string> {
    if (!this.genAI) throw new Error("No API Key");

    let lastError = null;

    for (const modelName of MODEL_CANDIDATES) {
      try {
        // console.log(`Attempting model: ${modelName}`); // Uncomment to debug
        const model = this.genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } catch (error: any) {
        // If 404 (Model Not Found) or 400 (Not supported), try next
        if (error.message?.includes("404") || error.message?.includes("not found")) {
          // console.warn(`Model ${modelName} not available, trying next...`);
          lastError = error;
          continue; 
        }
        // If it's a real error (like Quota Exceeded), stop trying
        throw error;
      }
    }
    throw lastError || new Error("All models failed");
  }

  // --- HELPER: Strip Markdown ---
  private cleanAndParseJSON<T>(text: string): T {
    try {
      const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON Parse Error. Raw text:", text);
      throw new Error("Failed to parse AI response");
    }
  }

  async generateWorkflow(task: string): Promise<WorkflowStep[]> {
    if (!this.genAI) return this.smartFallbackWorkflow(task);

    const prompt = `
      Act as an Automation Architect. Design a 4-step workflow for: "${task}".
      Guidelines:
      1. Use REAL tools (e.g. Stripe, Slack, HubSpot) not generic names.
      2. Return ONLY a raw JSON array.
      
      JSON Structure:
      [
        { "step": 1, "title": "Trigger Name", "tool": "Tool Name", "description": "Details..." }
      ]
    `;

    try {
      // USE THE FALLBACK MECHANISM
      const text = await this.generateWithFallback(prompt);
      return this.cleanAndParseJSON<WorkflowStep[]>(text);
    } catch (error) {
      console.error("All Models Failed (Workflow):", error);
      return this.smartFallbackWorkflow(task);
    }
  }

  async generateAgentConfig(idea: string): Promise<AgentConfig> {
    if (!this.genAI) return this.smartFallbackAgent(idea);

    const prompt = `
      Create an AI Agent config for: "${idea}".
      Return ONLY a raw JSON object.
      
      JSON Structure:
      {
        "name": "Agent Name",
        "role": "Short Role Description",
        "instructions": ["Rule 1", "Rule 2", "Rule 3"],
        "capabilities": ["Skill 1", "Skill 2", "Skill 3"]
      }
    `;

    try {
      // USE THE FALLBACK MECHANISM
      const text = await this.generateWithFallback(prompt);
      return this.cleanAndParseJSON<AgentConfig>(text);
    } catch (error) {
      console.error("All Models Failed (Agent):", error);
      return this.smartFallbackAgent(idea);
    }
  }

  // --- SMART FALLBACKS ---
  private smartFallbackWorkflow(task: string): WorkflowStep[] {
    console.log("Using Smart Fallback (Workflow)");
    const t = task.toLowerCase();
    
    let triggerTool = "Webhook";
    let triggerTitle = "Receive Data";
    if (t.includes("stripe") || t.includes("payment")) { triggerTool = "Stripe"; triggerTitle = "Payment Succeeded"; }
    else if (t.includes("email") || t.includes("gmail")) { triggerTool = "Gmail"; triggerTitle = "New Email Received"; }

    return [
      { step: 1, title: triggerTitle, tool: triggerTool, description: `Triggers on: ${task}` },
      { step: 2, title: "Process Data", tool: "Python Script", description: "Validates and formats the incoming data." },
      { step: 3, title: "Update CRM", tool: "HubSpot", description: "Creates a new record with the customer details." },
      { step: 4, title: "Notify Team", tool: "Slack", description: "Sends a notification to the operations channel." },
    ];
  }

  private smartFallbackAgent(idea: string): AgentConfig {
    console.log("Using Smart Fallback (Agent)");
    return {
      name: "Nexus-7",
      role: "Specialist",
      instructions: ["Analyze input", "Execute task", `Focus on: ${idea}`],
      capabilities: ["Data Analysis", "Natural Language Processing"],
    };
  }
}

// --- EXPORTS ---
let instance: GeminiService | null = null;

export const getGeminiService = () => {
  if (!instance) instance = new GeminiService();
  return instance;
};

export const generateWorkflow = async (task: string) => {
  return getGeminiService().generateWorkflow(task);
};

export const generateAgentConfig = async (idea: string) => {
  return getGeminiService().generateAgentConfig(idea);
};