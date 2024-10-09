import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "music prompt is required",
  }),
  duration: z.preprocess((a) => {
    const parsed = parseInt(a as string, 10);
    return isNaN(parsed) ? undefined : parsed;
  }, z.number().int().min(1)),
});
