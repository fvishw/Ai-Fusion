import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const apiKey = `${process.env.GoogleGenerativeAI_api}`;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!`${process.env.GoogleGenerativeAI_api}`) {
      return new NextResponse("Gemini API Key is not configured", {
        status: 500,
      });
    }
    // console.log("Messages:", messages[0]);
    if (!messages[messages.length - 1].parts.text) {
      return new NextResponse("Message is required", { status: 400 });
    }
    // console.log("Messages:", messages);
    const userMessage = `You are code generator. You must answer only in markdown snippets. use code comments for explanation and also explain what you have written ${messages[messages.length - 1].parts.text}`;
    // console.log("User message:", userMessage);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userMessage); // Last user message
    const text = await result.response.text(); // Ensure text() is awaited

    return NextResponse.json({ role: "ai", parts: { text } });
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
