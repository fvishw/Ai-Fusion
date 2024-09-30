import Replicate from "replicate";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Initialize Replicate with the API token
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    // console.log(body);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // Use the run method directly to interact with the model
    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt,
        go_fast: true, // Ensure these parameters are valid for your model
        num_outputs: 1,
        aspect_ratio: "1:1",
      },
    });

    console.log(output);

    return NextResponse.json(output);
  } catch (error) {
    console.log("[IMAGE_GENERATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
