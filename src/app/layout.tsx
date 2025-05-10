import type { Metadata } from "next";
import "./globals.css";
import AppContextProvider from "@/context/AppContextProvider";
export const metadata: Metadata = {
  title: "RAG Chatbot",
  description: "Personal RAG chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
