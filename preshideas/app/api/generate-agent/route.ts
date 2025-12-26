import { NextRequest, NextResponse } from "next/server";
// 👇 CHANGE: Import the helper function directly
import { generateAgentConfig } from "@/services/geminiService";

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json(
        { error: "Agent description is required" },
        { status: 400 }
      );
    }

    // 👇 CHANGE: Use the helper function directly
    // This handles the class instantiation and provider logic internally
    const config = await generateAgentConfig(idea);

    return NextResponse.json({ config });
  } catch (err: any) {
    console.error("[API Error] generate-agent:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
