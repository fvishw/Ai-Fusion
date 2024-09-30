"use client";

import React, { useState } from "react";
import { DownloadIcon, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";

import { aspectRatioOptions, formSchema } from "./constants";

export default function ImagePage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      go_fast: true,
      num_outputs: 1,
      aspect_ratio: "1:1",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const response = await axios.post("/api/image", values);
      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);
      console.log(images);

      form.reset();
    } catch (error: any) {
      // Handle error cases appropriately
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        discription="Turn your prompt into an Image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="A picture of a horse in Swiss alps"
                        className="pl-2 border-0 outline-none focus-visible:ring-0 focus-visible: ring-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="go_fast"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-3">
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          type="checkbox"
                          disabled={isLoading}
                          checked={field.value}
                          onChange={field.onChange}
                          className="mr-2"
                        />
                        <label htmlFor="go_fast">Go Fast</label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="num_outputs"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-3">
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isLoading}
                        min="1"
                        max="4"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="aspect_ratio"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select aspect ratio" />
                        </SelectTrigger>
                        <SelectContent>
                          {aspectRatioOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="col-span-12 flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  Generate
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="mt-4">
          {isLoading && <Loader />}
          {!isLoading && images.length === 0 && (
            <Empty label={"No Images generated"} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((src) => (
              <Card key={src} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt="Generated" src={src} fill objectFit="cover" />
                  {src}
                </div>
                <CardFooter className="p-2">
                  <Button
                    onClick={() => window.open(src)}
                    variant="outline"
                    className="w-full"
                  >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
