import { NextRequest, NextResponse } from "next/server";
import { getGeminiService } from "@/services/geminiService";

export async function POST(req: NextRequest) {
  try {
    const { task } = await req.json();

    if (!task) {
      return NextResponse.json(
        { error: "Task description is required" },
        { status: 400 }
      );
    }

    const gemini = getGeminiService();
    const workflow = await gemini.generateWorkflow(task);

    return NextResponse.json({ workflow });
  } catch (err: any) {
    console.error("[API Error] generate-workflow:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}