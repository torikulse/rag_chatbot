"use client";
import Navbar from "@/Component/Navbar";
import Sidebar from "@/Component/Sidebar";
import React, { useRef, useState } from "react";
import {
  BsArrowUpCircleFill,
  BsPlusCircle,
  BsStopCircleFill,
} from "react-icons/bs";
import { ImSpinner6 } from "react-icons/im";

export default function Home() {
  // all useState
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isGettingRes, setIsgettingRes] = useState(false);

  // all useRef
  const fileInputRef = useRef(null);

  return (
    <div className="flex">
      <div className="max-w-[248px]">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
        <div className="mx-auto flex h-[calc(100vh-54px)] w-full max-w-3xl items-center justify-center">
          <div className="w-full">
            <h1 className="text-center text-[clamp(1.5rem,3vw,2rem)] font-bold text-slate-800">
              How can I help you today?
            </h1>
            <div className="mx-4 mt-15 rounded-3xl border border-slate-200 p-4 shadow-md">
              <input
                type="text"
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                placeholder="Ask anything"
                className="block w-full text-xl outline-0"
              />
              <div className="relative mt-4 flex items-center justify-between">
                <input type="file" ref={fileInputRef} className="hidden" />
                <button className="cursor-pointer text-slate-500 hover:text-slate-600">
                  <BsPlusCircle size={28} />
                </button>

                <div className="absolute top-0 left-8 text-slate-500"></div>
                {isSending ? (
                  <button className="rounded-full bg-slate-800 p-1 text-slate-50">
                    <ImSpinner6 size={22} className="animate-spin" />
                  </button>
                ) : isGettingRes ? (
                  <button className="cursor-pointer text-slate-900">
                    <BsStopCircleFill size={28} />
                  </button>
                ) : (
                  <button
                    disabled={!question}
                    className={`cursor-pointer ${question ? "text-slate-900" : "text-slate-300"}`}
                  >
                    <BsArrowUpCircleFill size={28} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
