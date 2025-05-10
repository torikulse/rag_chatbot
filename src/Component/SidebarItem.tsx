import React from "react";
import { BsThreeDots } from "react-icons/bs";

export default function SidebarItem() {
  return (
    <div className="group flex w-full cursor-pointer items-center justify-between p-2 hover:rounded-lg hover:bg-slate-200">
      <p className="text-slate-700 line-clamp-1 group-hover:text-slate-900">
        Collect contact details form website
      </p>
      <button className="hidden cursor-pointer text-slate-800 group-hover:block hover:text-slate-900">
        <BsThreeDots size={18} />
      </button>
    </div>
  );
}
