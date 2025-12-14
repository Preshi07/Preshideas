"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeneratedPostContent } from "../types";

// Initialize with the new SDK
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
// Use the stable JSON-capable model
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" }
});

export const generateBlogPost = async (topic: string): Promise<GeneratedPostContent> => {
  const prompt = `
    Write a modern, engaging blog post about: "${topic}". 
    The tone should be professional yet accessible. 
    
    Return a RAW JSON object with this exact structure:
    {
      "title": "Catchy Title",
      "summary": "Short summary",
      "content": "Main content in Markdown format",
      "tags": ["tag1", "tag2"]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean up markdown wrappers if present
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleaned) as GeneratedPostContent;
  } catch (error) {
    console.error("Blog Generation Error:", error);
    throw new Error("Failed to generate content");
  }
};

export const generateBlogImage = async (prompt: string): Promise<string> => {
  // NOTE: The standard free Gemini API is text-only (it cannot generate images).
  // We use a high-quality placeholder service seeded with the prompt 
  // so the image remains consistent for the same topic.
  const seed = encodeURIComponent(prompt.trim().replace(/\s+/g, '-').toLowerCase());
  return `https://picsum.photos/seed/${seed}/800/400`;
};