import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workout logger",
  description: "A workout logger app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between">
          <div className="flex flex-col h-full w-full">

            <Toaster />

            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
