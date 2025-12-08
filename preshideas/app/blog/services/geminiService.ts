"use server";

import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedPostContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBlogPost = async (topic: string): Promise<GeneratedPostContent> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Write a modern, engaging blog post about: ${topic}. 
    The tone should be professional yet accessible. 
    Include a catchy title, a short summary, the main content in Markdown format (use headings, bullet points, etc.), and related tags.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          content: { type: Type.STRING },
          tags: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["title", "summary", "content", "tags"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as GeneratedPostContent;
  }
  throw new Error("Failed to generate content");
};

export const generateBlogImage = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `A high-quality, modern, minimalist blog cover image representing: ${prompt}. 
          Abstract, clean, artistic, 16:9 aspect ratio. No text on image.`,
        },
      ],
    },
    config: {
        // Nano banana models don't support responseMimeType or Schema for images in the same way as text
    }
  });

  // Iterate to find image part
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  // Fallback to placeholder if generation fails or returns no image
  return `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 1000)}`;
};
