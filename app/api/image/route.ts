import Replicate from "replicate";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stringify } from "querystring";

// Initialize Replicate with the API token
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    // console.log(body);
    const { prompt, go_fast, num_outputs, aspect_ratio } = body;

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
        go_fast, // Ensure these parameters are valid for your model
        num_outputs,
        aspect_ratio,
        output_format: "jpg",
      },
    });

    if (!Array.isArray(output)) {
      console.error("Unexpected output format from Replicate:", output);
      return new NextResponse("Unexpected output format", { status: 500 });
    }

    // Optionally, validate that each item in the array is a string URL
    console.log(NextResponse.json({ images: output }));

    return NextResponse.json({ images: output });
  } catch (error) {
    console.log("[IMAGE_GENERATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
