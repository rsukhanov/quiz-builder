import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/lib/components/header";


export const metadata: Metadata = {
  title: "Quiz Builder",
  description: "Technical Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          {children}
        </main>
      </body>
    </html>
  );
}