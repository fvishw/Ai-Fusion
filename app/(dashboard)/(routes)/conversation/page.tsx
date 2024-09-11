"use client";

import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GeminiMessage {
  role: string;
  parts: {
    text: string;
  };
}
const ConversationPage = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<GeminiMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     const userMessage: GeminiMessage = {
  //       role: "user",
  //       parts: { text: values.prompt },
  //     };

  //     const newMessages = [...messages, userMessage];

  //     const response = await axios.post("/api/conversation", {
  //       messages: newMessages,
  //     });
  //     setMessages((current) => [...current, userMessage, response.data]);

  //     form.reset();
  //   } catch (error: any) {
  //     console.log(error);
  //   } finally {
  //     router.refresh();
  //   }
  // };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: GeminiMessage = {
        role: "user",
        parts: { text: values.prompt },
      };

      // Add user message to messages array
      const newMessages = [...messages, userMessage];

      // Send the new messages array to the API
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      // Ensure the response is in the correct format
      const aiMessage: GeminiMessage = {
        role: "ai",
        parts: { text: response.data.parts.text }, // Assuming response.data has parts.text
      };

      // Update the messages state
      setMessages((current) => [...current, userMessage, aiMessage]);

      // Reset the form after submission
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh(); // Optionally refresh the page if necessary
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        discription="Our most advanced conversational model"
        icon={MessageCircle}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                        placeholder="How do I calculate the radius of a circle"
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
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div key={index}>
                <p>
                  {message.role === "user" ? "You" : "AI"}: {message.parts.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
