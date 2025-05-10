import type { Metadata } from "next";
import "./globals.css";
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
