import Replicate from "replicate";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    // console.log(body);
    const { prompt, duration } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    // console.log(prompt, duration);
    const freeTraial = await checkApiLimit();
    if (!freeTraial) {
      return new NextResponse("Free trial expired", { status: 403 });
    }

    // Use the run method directly to interact with the model
    const output = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      {
        input: {
          prompt,
          duration,
          model_version: "stereo-large",
          output_format: "mp3",
          normalization_strategy: "peak",
        },
      }
    );

    // Optionally, validate that each item in the array is a string URL
    // console.log(output);
    await checkApiLimit();

    return NextResponse.json({ music: output });
  } catch (error) {
    console.log("[IMAGE_GENERATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
