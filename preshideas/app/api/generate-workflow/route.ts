import { NextRequest, NextResponse } from "next/server";
// 👇 CHANGE: Import the function directly, not the class instance getter
import { generateWorkflow } from "@/services/geminiService";

export async function POST(req: NextRequest) {
  try {
    const { task } = await req.json();

    if (!task) {
      return NextResponse.json(
        { error: "Task description is required" },
        { status: 400 }
      );
    }

    // 👇 CHANGE: Call the imported function directly
    const workflow = await generateWorkflow(task);

    return NextResponse.json({ workflow });
  } catch (err: any) {
    console.error("[API Error] generate-workflow:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
