"use client";
import DisplayAiAnswer from "@/Component/DisplayAiAnswer";
import DisplayUerPrompt from "@/Component/DisplayUerPrompt";
import Navbar from "@/Component/Navbar";
import Sidebar from "@/Component/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import {
  BsArrowUpCircleFill,
  BsPlusCircle,
  BsStopCircleFill,
} from "react-icons/bs";
import { ImSpinner6 } from "react-icons/im";

type ApiResponse = {
  choices: {
    message: {
      content: string;
    };
  };
};

type ChatMessage = {
  userPrompt: string;
  aiAnswer: string | null;
};

export default function Home() {
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isGettingRes, setIsgettingRes] = useState(false);
  const [isEmptyChat, setIsEmptyChat] = useState(false);
  const [allChat, setAllChat] = useState<ChatMessage[]>([]);
  const [data, setData] = useState<ApiResponse | null>(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: JSON.stringify({ q: question }),
      });
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, [isSending]);
  console.log(data?.choices[0].message.content);

  // 1. When sending starts, trigger a delay to simulate a response
  useEffect(() => {
    if (isSending) {
      const timeout = setTimeout(() => {
        setIsgettingRes(true);
        setIsSending(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isSending]);

  // 2. When "getting response" is active, simulate an AI reply
  useEffect(() => {
    if (isGettingRes) {
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
    <div className="flex">
      <div className="max-w-[248px]">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
        <div className="flex justify-center">
          <div className="px-4 fixed top-[54px] flex h-[calc(100vh-54px)] w-full max-w-3xl justify-center">
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
                {
                  /* <div className="self-end bg-gray-200 px-3 py-1 rounded max-w-11/12">
                  Lorem ipsum dolor sit
                </div> */

                  allChat.map((item, index) => {
                    return (
                      <>
                        <DisplayUerPrompt
                          key={index}
                          content={item.userPrompt}
                        />
                        <DisplayAiAnswer key={index} content={item.aiAnswer} />
                      </>
                    );
                  })

                  /* <div className="self-start">
                  consectetur enim quasi recusandae error voluptatum omnis
                  doloremque aut officiis sapiente aspernatur. Consectetur,
                  exercitationem. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit
                </div> */
                }
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
          </div>
        </div>
      </div>
    </div>
  );
}
