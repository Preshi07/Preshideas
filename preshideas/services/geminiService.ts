import { GoogleGenAI, Type } from "@google/genai";
import { WorkflowStep, AgentConfig } from "../types";

// Constants
const MODEL_NAME = "gemini-2.5-flash" as const;
const SIMULATION_DELAY = 2000;
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Custom error types
class GeminiServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = "GeminiServiceError";
  }
}

// Validation helpers
const validateApiKey = (key: string | undefined): string => {
  if (!key || key.trim().length === 0) {
    throw new GeminiServiceError(
      "API key is missing or empty",
      "MISSING_API_KEY"
    );
  }
  return key;
};

const validateInput = (input: string, fieldName: string): void => {
  if (!input || input.trim().length === 0) {
    throw new GeminiServiceError(
      `${fieldName} cannot be empty`,
      "INVALID_INPUT"
    );
  }
  if (input.length > 5000) {
    throw new GeminiServiceError(
      `${fieldName} exceeds maximum length of 5000 characters`,
      "INPUT_TOO_LONG"
    );
  }
};

// Fallback data generators
const generateFallbackWorkflow = (task: string): WorkflowStep[] => [
  {
    step: 1,
    title: "Trigger Event",
    tool: "Webhook",
    description: "Detects new input via API webhook.",
  },
  {
    step: 2,
    title: "Data Processing",
    tool: "Python Script",
    description: "Normalizes data structure for analysis.",
  },
  {
    step: 3,
    title: "AI Analysis",
    tool: "Gemini 1.5 Flash",
    description: "Analyzes content sentiment and key entities.",
  },
  {
    step: 4,
    title: "Action Execution",
    tool: "Slack API",
    description: "Notifies the team with a summary report.",
  },
];

const generateFallbackAgentConfig = (idea: string): AgentConfig => ({
  name: "AutoBot Alpha",
  role: "Customer Success Assistant",
  instructions: [
    "Always be polite and professional.",
    "Verify user identity first.",
    "Escalate complex issues to human agents.",
  ],
  capabilities: [
    "Natural Language Processing",
    "Database Querying",
    "Email Dispatch",
  ],
});

// Service class
class GeminiService {
  private ai: GoogleGenAI | null = null;
  private readonly useFallback: boolean;

  constructor(apiKey?: string) {
    this.useFallback = !apiKey;
    
    if (apiKey) {
      try {
        this.ai = new GoogleGenAI({ apiKey: validateApiKey(apiKey) });
      } catch (error) {
        console.warn("Failed to initialize Gemini AI, using fallback mode:", error);
        this.useFallback = true;
      }
    }
  }

  private async simulateDelay(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, SIMULATION_DELAY));
  }

  private parseJsonResponse<T>(text: string, operationType: string): T {
    try {
      return JSON.parse(text) as T;
    } catch (error) {
      throw new GeminiServiceError(
        `Failed to parse ${operationType} response`,
        "PARSE_ERROR",
        error
      );
    }
  }

  private async makeRequestWithTimeout<T>(
    requestFn: () => Promise<T>,
    timeout: number = REQUEST_TIMEOUT
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new GeminiServiceError("Request timeout", "TIMEOUT")),
        timeout
      )
    );

    return Promise.race([requestFn(), timeoutPromise]);
  }

  async generateWorkflow(task: string): Promise<WorkflowStep[]> {
    validateInput(task, "Task");

    if (this.useFallback || !this.ai) {
      console.info("Using fallback workflow generation");
      await this.simulateDelay();
      return generateFallbackWorkflow(task);
    }

    try {
      const response = await this.makeRequestWithTimeout(async () => {
        return await this.ai!.models.generateContent({
          model: MODEL_NAME,
          contents: `Design a 4-step automation workflow for this task: "${task}". 
          Each step should have a clear title, appropriate tool, and detailed description.
          Ensure the workflow is logical and follows best practices.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  tool: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["step", "title", "tool", "description"],
              },
            },
          },
        });
      });

      const text = response.text;
      if (!text) {
        throw new GeminiServiceError(
          "Empty response from AI",
          "EMPTY_RESPONSE"
        );
      }

      const workflow = this.parseJsonResponse<WorkflowStep[]>(text, "workflow");
      
      // Validate workflow structure
      if (!Array.isArray(workflow) || workflow.length === 0) {
        throw new GeminiServiceError(
          "Invalid workflow structure",
          "INVALID_WORKFLOW"
        );
      }

      return workflow;
    } catch (error) {
      if (error instanceof GeminiServiceError) {
        throw error;
      }
      
      console.error("Gemini Workflow Error:", error);
      throw new GeminiServiceError(
        "Failed to generate workflow",
        "GENERATION_ERROR",
        error
      );
    }
  }

  async generateAgentConfig(idea: string): Promise<AgentConfig> {
    validateInput(idea, "Idea");

    if (this.useFallback || !this.ai) {
      console.info("Using fallback agent config generation");
      await this.simulateDelay();
      return generateFallbackAgentConfig(idea);
    }

    try {
      const response = await this.makeRequestWithTimeout(async () => {
        return await this.ai!.models.generateContent({
          model: MODEL_NAME,
          contents: `Create a detailed configuration for an AI agent based on this idea: "${idea}".
          Include a meaningful name, specific role, clear instructions, and relevant capabilities.
          Ensure the configuration is practical and actionable.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                role: { type: Type.STRING },
                instructions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                capabilities: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ["name", "role", "instructions", "capabilities"],
            },
          },
        });
      });

      const text = response.text;
      if (!text) {
        throw new GeminiServiceError(
          "Empty response from AI",
          "EMPTY_RESPONSE"
        );
      }

      const config = this.parseJsonResponse<AgentConfig>(text, "agent config");
      
      // Validate config structure
      if (!config.name || !config.role || !Array.isArray(config.instructions)) {
        throw new GeminiServiceError(
          "Invalid agent config structure",
          "INVALID_CONFIG"
        );
      }

      return config;
    } catch (error) {
      if (error instanceof GeminiServiceError) {
        throw error;
      }
      
      console.error("Gemini Agent Error:", error);
      throw new GeminiServiceError(
        "Failed to generate agent config",
        "GENERATION_ERROR",
        error
      );
    }
  }

  // Utility method to check if service is using fallback mode
  isUsingFallback(): boolean {
    return this.useFallback;
  }
}

// Singleton instance
let geminiServiceInstance: GeminiService | null = null;

export const initializeGeminiService = (apiKey?: string): GeminiService => {
  if (!geminiServiceInstance) {
    geminiServiceInstance = new GeminiService(apiKey || process.env.API_KEY);
  }
  return geminiServiceInstance;
};

export const getGeminiService = (): GeminiService => {
  if (!geminiServiceInstance) {
    geminiServiceInstance = initializeGeminiService();
  }
  return geminiServiceInstance;
};

// Backward compatibility exports
export const generateWorkflow = async (task: string): Promise<WorkflowStep[]> => {
  const service = getGeminiService();
  return service.generateWorkflow(task);
};

export const generateAgentConfig = async (idea: string): Promise<AgentConfig> => {
  const service = getGeminiService();
  return service.generateAgentConfig(idea);
};

// Export error class for consumers
export { GeminiServiceError };