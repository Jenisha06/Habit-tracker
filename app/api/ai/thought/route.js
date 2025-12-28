import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET() {
  try {
    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      messages: [{ text: "Give a positive daily thought in one sentence." }],
    });

    console.log("Full Gemini response:", JSON.stringify(result, null, 2));

    // Try to extract text from any candidate/content format
    const text =
      result.response?.candidates?.[0]?.content?.map(c => c.text).join(" ") ||
      "No response";

    return NextResponse.json({ thought: text });
  } catch (err) {
    console.error("Gemini API call failed:", err);
    return NextResponse.json(
      { error: "Failed to generate thought", details: err.message },
      { status: 500 }
    );
  }
}
