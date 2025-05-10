"use client";
import AppContext from "@/context/AppContext";
import React, { useContext } from "react";
import {
  BsLayoutSidebarInset,
  BsPerson,
  BsPlusSquareDotted,
} from "react-icons/bs";

export default function Navbar() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  const { isSidebarOpen, setIsSidebarOpen } = context;

  const handleIsSidebarOpen = () => {
    setIsSidebarOpen((prev: boolean) => {
      return !prev;
    });
  };

  return (
    <div className="z-50 flex items-center p-2">
      {isSidebarOpen && (
        <div className="flex">
          <button
            onClick={handleIsSidebarOpen}
            className="cursor-pointer rounded-lg p-2 text-slate-700 hover:bg-slate-200 hover:text-slate-800"
          >
            <BsLayoutSidebarInset size={22} />
          </button>
          <button className="cursor-pointer rounded-lg p-2 hover:bg-slate-200">
            <BsPlusSquareDotted size={22} />
          </button>
        </div>
      )}
      <button className="ml-auto cursor-pointer rounded-lg p-2 hover:bg-slate-200">
        <BsPerson size={22} />
      </button>
    </div>
  );
}
