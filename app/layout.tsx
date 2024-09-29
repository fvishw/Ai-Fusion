import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Fusion",
  description: "AI-Fusion is an innovative platform that integrates AI-driven image and code generation, music video creation, and conversational AI, all powered by advanced APIs to enhance creativity and productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/"><html lang="en">
      <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
    
  );
}
