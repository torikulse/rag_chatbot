"use client";
import React, { useContext } from "react";
import {
  BsLayoutSidebarInsetReverse,
  BsPlusSquareDotted,
  BsSearch,
} from "react-icons/bs";
import SidebarItem from "./SidebarItem";
import AppContext from "@/context/AppContext";
export default function Sidebar() {
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
    <div
      className={`absolute top-0 left-0 z-10 h-screen w-[248px] overflow-y-scroll bg-slate-50 p-2 md:relative md:w-full ${
        isSidebarOpen ? "hidden" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={handleIsSidebarOpen}
          className="cursor-pointer rounded-lg p-2 text-slate-700 hover:bg-slate-200 hover:text-slate-800"
        >
          <BsLayoutSidebarInsetReverse size={22} />
        </button>
        <div className="flex">
          <button className="cursor-pointer rounded-lg p-2 hover:bg-slate-200">
            <BsSearch size={22} />
          </button>
          <button className="cursor-pointer rounded-lg p-2 hover:bg-slate-200">
            <BsPlusSquareDotted size={22} />
          </button>
        </div>
      </div>
      <div className="mt-10">
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
      </div>
    </div>
  );
}
