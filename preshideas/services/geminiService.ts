import { GoogleGenAI, Type } from "@google/genai";
import { WorkflowStep, AgentConfig } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

const modelName = "gemini-2.5-flash";

export const generateWorkflow = async (
  task: string
): Promise<WorkflowStep[]> => {
  if (!apiKey) {
    // Fallback simulation if no key is present to prevent app crash in preview
    await new Promise((r) => setTimeout(r, 2000));
    return [
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
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Design a 4-step automation workflow for this task: "${task}".`,
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
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as WorkflowStep[];
  } catch (error) {
    console.error("Gemini Workflow Error:", error);
    throw error;
  }
};

export const generateAgentConfig = async (
  idea: string
): Promise<AgentConfig> => {
  if (!apiKey) {
    // Fallback simulation
    await new Promise((r) => setTimeout(r, 2000));
    return {
      name: "AutoBot Alpha",
      role: "Customer Success Assistant",
      instructions: [
        "Always be polite.",
        "Verify user identity first.",
        "Escalate complex issues.",
      ],
      capabilities: [
        "Natural Language Processing",
        "Database Querying",
        "Email Dispatch",
      ],
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Create a configuration for an AI agent based on this idea: "${idea}".`,
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
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as AgentConfig;
  } catch (error) {
    console.error("Gemini Agent Error:", error);
    throw error;
  }
};
