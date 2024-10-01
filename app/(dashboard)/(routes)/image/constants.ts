import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required",
  }),
  go_fast: z.boolean().default(true),
  num_outputs: z.preprocess((a) => {
    const parsed = parseInt(a as string, 10);
    return isNaN(parsed) ? undefined : parsed;
  }, z.number().int().min(1).max(4)),
  aspect_ratio: z
    .enum([
      "1:1",
      "16:9",
      "21:9",
      "3:2",
      "2:3",
      "4:5",
      "5:4",
      "3:4",
      "4:3",
      "9:16",
      "9:21",
    ])
    .default("1:1"),
});

// Example options for enum fields if needed
export const aspectRatioOptions = [
  { label: "1:1", value: "1:1" },
  { label: "16:9", value: "16:9" },
  { label: "21:9", value: "21:9" },
  { label: "3:2", value: "3:2" },
  { label: "2:3", value: "2:3" },
  { label: "4:5", value: "4:5" },
  { label: "5:4", value: "5:4" },
  { label: "3:4", value: "3:4" },
  { label: "4:3", value: "4:3" },
  { label: "9:16", value: "9:16" },
  { label: "9:21", value: "9:21" },
];
