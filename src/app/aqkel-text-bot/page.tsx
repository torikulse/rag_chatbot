"use client";
import DisplayAiAnswer from "@/Component/DisplayAiAnswer";
import DisplayUerPrompt from "@/Component/DisplayUerPrompt";
import React, { useEffect, useRef, useState } from "react";
import {
  BsArrowUpCircleFill,
  BsPlusCircle,
  BsStopCircleFill,
} from "react-icons/bs";
import { ImSpinner6 } from "react-icons/im";
import type { ChatMessage } from "./types/types";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isGettingRes, setIsgettingRes] = useState(false);
  const [isEmptyChat, setIsEmptyChat] = useState(true);
  const [allChat, setAllChat] = useState<ChatMessage[]>([]);
  const [data, setData] = useState<any>({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isSending) {
      async function fetchData() {
        const response = await fetch("http://localhost:3000/api", {
          method: "POST",
          body: JSON.stringify({ q: question }),
        });
        const data = await response.json();
        setData(data);
      }
      fetchData();

      const timeout = setTimeout(() => {
        setIsEmptyChat(false);
        setIsgettingRes(true);
        setIsSending(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isSending]);

  useEffect(() => {
    if (isGettingRes) {
      setQuestion("");
      setAllChat((prev) => [
        ...prev,
        { userPrompt: question, aiAnswer: data?.choices[0].message.content },
      ]);

      const timeout = setTimeout(() => {
        setIsgettingRes(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isGettingRes]);

  return (
    <div
      className={`w-full flex flex-col ${
        isEmptyChat ? "justify-center" : "justify-between"
      }`}
    >
      <div
        className={`gap-4 md:gap-6 lg:gap-8 text-gray-900 flex flex-col -mb-8 pb-10 overflow-y-scroll scroll-hidden ${
          isEmptyChat ? "hidden" : ""
        }`}
      >
        {allChat.map((item, index) => {
          return (
            <>
              <DisplayUerPrompt key={index} content={item.userPrompt} />
              <DisplayAiAnswer key={index + 90} content={item.aiAnswer} />
            </>
          );
        })}
      </div>
      <h1
        className={`text-center text-[clamp(1.5rem,3vw,2rem)] mb-10 font-medium text-slate-800 ${
          isEmptyChat ? "" : "hidden"
        }`}
      >
        How can I help you today?
      </h1>
      <div>
        <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-md">
          <input
            type="text"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                setIsSending(true);
              }
            }}
            placeholder="Ask anything"
            className="block w-full text-xl outline-0"
          />
          <div className="mt-4 flex items-center justify-between">
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
                onClick={() => {
                  setIsSending(true);
                }}
                className={`cursor-pointer ${
                  question ? "text-slate-900" : "text-slate-300"
                }`}
              >
                <BsArrowUpCircleFill size={28} />
              </button>
            )}
          </div>
        </div>
        <div
          className={`py-2 text-center text-gray-700 text-sm ${
            isEmptyChat ? "hidden" : ""
          }`}
        >
          Aqkel can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}
