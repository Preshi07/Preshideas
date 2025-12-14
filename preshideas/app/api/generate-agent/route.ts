import { NextRequest, NextResponse } from "next/server";
import { getGeminiService } from "@/services/geminiService";

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json(
        { error: "Agent description is required" },
        { status: 400 }
      );
    }

    const gemini = getGeminiService();
    const config = await gemini.generateAgentConfig(idea);

    return NextResponse.json({ config });
  } catch (err: any) {
    console.error("[API Error] generate-agent:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}