import type { Metadata } from "next";
import Navbar from "@/Component/Navbar";
import Sidebar from "@/Component/Sidebar";
import "../globals.css";
export const metadata: Metadata = {
  title: "Aqkel Text bot",
  description: "Personal Aqkel Text bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <div className="max-w-[248px]">
          <Sidebar />
        </div>
        <div className="w-full">
          <Navbar />
          <div className="flex justify-center">
            <div className="px-4 fixed top-[54px] flex h-[calc(100vh-54px)] w-full max-w-3xl justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
