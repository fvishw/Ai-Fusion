"use client";

import * as z from "zod";
import { Heading } from "@/components/heading";
import { Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Empty } from "@/components/empty";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VideoPage = () => {
  const router = useRouter();

  const [video, setVideo] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      duration: 1,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo("");
      // Send the new messages array to the API
      const response = await axios.post("/api/video", values);
      console.log(response.data.video);
      // Ensure the response is in the correct format
      setVideo(response.data.video);

      // Reset the form after submission
      form.reset();
    } catch (error: any) {
      //Pro model require
      console.log(error);
    } finally {
      router.refresh(); // Optionally refresh the page if necessary
    }
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        discription="Turn your prompt into video"
        icon={Video}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8 ">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full  p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="elephant running on clouds"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {video.length === 0 && !isLoading && (
            <Empty label="No video Generated." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {video && (
              <video
                controls
                className="w-full aspect-video rounded-lg border bg-black my-8"
              >
                <source src={video} />
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
