"use client";

import { useState } from "react";
import { Clipboard, Check } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure this utility is correctly imported

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Extract the language from the className (e.g., language-js)
  const language = className ? className.replace(/language-/, "") : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children as string);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 flex items-center justify-center p-1 rounded-md bg-black/10 hover:bg-black/20 transition-colors"
        aria-label="Copy code"
      >
        {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
      </button>
      <pre className={cn("overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg", className)}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
