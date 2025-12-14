import { NextRequest, NextResponse } from "next/server";
import { getGeminiService } from "@/services/geminiService";

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();
    if (!idea) return NextResponse.json({ error: "Idea required" }, { status: 400 });
    
    const gemini = getGeminiService();
    const config = await gemini.generateAgentConfig(idea);
    
    return NextResponse.json({ config });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}