import Replicate from "replicate";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    // console.log(body);
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    // console.log(prompt);
    const freeTraial = await checkApiLimit();
    if (!freeTraial) {
      return new NextResponse("Free trial expired", { status: 403 });
    }

    // Use the run method directly to interact with the model
    const output = await replicate.run(
      "cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755",
      {
        input: {
          prompt,
          num_frames: 50,
        },
      }
    );

    // Optionally, validate that each item in the array is a string URL
    console.log(output);
    await increaseApiLimit();

    return NextResponse.json({ video: output });
  } catch (error) {
    console.log("[VIDEO_GENERATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
