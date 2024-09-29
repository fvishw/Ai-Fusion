import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Image Prompt is required",
  }),
  ammount: z.number().int().min(1),
  resolution: z.string().min(1)
});
export const ammountOptions = [{
    label: "1 photo",
    value: 1
    }, {
    label: "2 photos",
    value: 2
    }, {
    label: "3 photos",
    value: 3
    }, {
    label: "4 photos",
    value: 4
    }, {
    label: "5 photos",
    value: 5
    }, {
    label: "6 photos",
    value: 6
    }, {
    label: "7 photos",
    value: 7
    }, {
    label: "8 photos",
    value: 8
    }, {
    label: "9 photos",
    value: 9
    }, {
    label: "1 photos0",
    value: 10
    }];
export const resolutionOptions = [{
    label: "256x256",
    value: "256x256"
    }, {
    label: "512x512",
    value: "512x512"
    }, {
    label: "1024x1024",
    value: "1024x1024"
    }, {
    label: "1280x720",
    value: "1280x720"
    }, {
    label: "1920x1080",
    value: "1920x1080"
    }, {
    label: "3840x2160",
    value: "3840x2160"
}];
