import "server-only";

import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { WorkflowStep, AgentConfig } from "../types";

// --- CONSTANTS ---
const GEMINI_CANDIDATES = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-001",
  "gemini-1.0-pro",
];

// OpenAI
const OPENAI_MODEL = "gpt-4o";

// Groq (OpenAI-compatible)
const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

// Use a list so you don't break when Groq deprecates a model
const GROQ_CANDIDATES = [
  "llama-3.1-8b-instant",
  "mixtral-8x7b-32768",
  "llama3-70b-8192",
] as const;

export class AIServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AIServiceError";
  }
}

class AIService {
  private genAI: GoogleGenerativeAI | null = null;
  private openai: OpenAI | null = null;
  private groq: OpenAI | null = null;

  // Choose one explicitly. Set to "groq" to use Groq only.
  private preferredProvider: "openai" | "gemini" | "groq" = "groq";

  constructor() {
    // 1) OpenAI
    const openAIKey = process.env.OPENAI_API_KEY;
    if (openAIKey) {
      this.openai = new OpenAI({ apiKey: openAIKey });
    }

    // 2) Gemini (your env var is API_KEY)
    const geminiKey = process.env.API_KEY;
    if (geminiKey) {
      this.genAI = new GoogleGenerativeAI(geminiKey);
    }

    // 3) Groq
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      this.groq = new OpenAI({
        apiKey: groqKey,
        baseURL: GROQ_BASE_URL,
      });
    }

    // Helpful server log (remove after confirming)
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "[AIService] GROQ_API_KEY present?",
        Boolean(process.env.GROQ_API_KEY)
      );
      console.log("[AIService] preferredProvider:", this.preferredProvider);
    }
  }

  // --- HELPER: STRIP MARKDOWN + PARSE JSON ---
  private cleanAndParseJSON<T>(text: string): T {
    try {
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON Parse Error. Raw text:", text);
      throw new AIServiceError("Failed to parse AI response as JSON");
    }
  }

  // --- OPENAI ---
  private async generateWithOpenAI(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {
    if (!this.openai) throw new AIServiceError("OpenAI client not initialized");

    const completion = await this.openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    return completion.choices[0]?.message?.content || "";
  }

  // --- GEMINI ---
  private async generateWithGemini(prompt: string): Promise<string> {
    if (!this.genAI) throw new AIServiceError("Gemini client not initialized");

    let lastError: any = null;
    for (const modelName of GEMINI_CANDIDATES) {
      try {
        const model = this.genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (error: any) {
        if (
          error?.message?.includes("404") ||
          error?.message?.includes("not found")
        ) {
          lastError = error;
          continue;
        }
        throw error;
      }
    }

    throw lastError || new AIServiceError("All Gemini models failed");
  }

  // --- GROQ (OpenAI-compatible) ---
  private async generateWithGroq(
    systemPrompt: string,
    userPrompt: string
  ): Promise<string> {
    if (!this.groq) throw new AIServiceError("Groq client not initialized");

    let lastErr: any = null;

    for (const model of GROQ_CANDIDATES) {
      try {
        const completion = await this.groq.chat.completions.create({
          model,
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content:
                systemPrompt +
                "\nReturn ONLY raw JSON. Do not wrap in markdown. Do not add commentary.",
            },
            { role: "user", content: userPrompt },
          ],
        });

        return completion.choices[0]?.message?.content || "";
      } catch (e: any) {
        // If a model got deprecated or isn't available, try the next.
        if (e?.code === "model_decommissioned" || e?.status === 404) {
          lastErr = e;
          continue;
        }
        throw e;
      }
    }

    throw lastErr || new AIServiceError("All Groq models failed");
  }

  // --- MAIN: GENERATE WORKFLOW (NO FALLBACK; USE preferredProvider ONLY) ---
  async generateWorkflow(task: string): Promise<WorkflowStep[]> {
    const systemPrompt =
      "Act as an Automation Architect. Design a 4-step workflow. Return ONLY a raw JSON array.";
    const userPrompt = `Task: "${task}".
Guidelines: Use REAL tools (Stripe, Slack, etc).
JSON Structure: [{"step": 1, "title": "...", "tool": "...", "description": "..."}]`;

    let jsonText = "";

    if (this.preferredProvider === "groq") {
      jsonText = await this.generateWithGroq(systemPrompt, userPrompt);
      return this.cleanAndParseJSON<WorkflowStep[]>(jsonText);
    }

    if (this.preferredProvider === "openai") {
      jsonText = await this.generateWithOpenAI(systemPrompt, userPrompt);
      return this.cleanAndParseJSON<WorkflowStep[]>(jsonText);
    }

    // gemini
    jsonText = await this.generateWithGemini(`${systemPrompt}\n${userPrompt}`);
    return this.cleanAndParseJSON<WorkflowStep[]>(jsonText);
  }

  // --- MAIN: GENERATE AGENT CONFIG (NO FALLBACK; USE preferredProvider ONLY) ---
  async generateAgentConfig(idea: string): Promise<AgentConfig> {
    const systemPrompt =
      "Create an AI Agent config. Return ONLY a raw JSON object.";
    const userPrompt = `Idea: "${idea}".
JSON Structure: {"name": "...", "role": "...", "instructions": [], "capabilities": []}`;

    let jsonText = "";

    if (this.preferredProvider === "groq") {
      jsonText = await this.generateWithGroq(systemPrompt, userPrompt);
      return this.cleanAndParseJSON<AgentConfig>(jsonText);
    }

    if (this.preferredProvider === "openai") {
      jsonText = await this.generateWithOpenAI(systemPrompt, userPrompt);
      return this.cleanAndParseJSON<AgentConfig>(jsonText);
    }

    // gemini
    jsonText = await this.generateWithGemini(`${systemPrompt}\n${userPrompt}`);
    return this.cleanAndParseJSON<AgentConfig>(jsonText);
  }
}

// --- EXPORTS ---
let instance: AIService | null = null;

export const getAIService = () => {
  if (!instance) instance = new AIService();
  return instance;
};

// Alias to preserve your existing imports
export const getGeminiService = getAIService;

export const generateWorkflow = async (task: string) =>
  getAIService().generateWorkflow(task);
export const generateAgentConfig = async (idea: string) =>
  getAIService().generateAgentConfig(idea);
