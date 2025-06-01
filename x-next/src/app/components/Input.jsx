"use client";

import { useSession } from "next-auth/react";
import { HiOutlineEmojiHappy, HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineGifBox } from "react-icons/md";
import { TbCalendarClock } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";

export default function Input() {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <div className="flex border-b border-gray-100 p-3 space-x-3 w-full">
      <img
        src={session.user.image}
        alt=""
        className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95 transition-all duration-200 "
      />
      <div className="w-full divide-y divide-gray-100 ">
        <textarea
          placeholder="What's happening?"
          row="3"
          className="w-full border-b border-gray-100 outline-none tracking-wide min-h-[50px] text-gray-700 placeholder:text-gray-600 placeholder:text-xl"
        ></textarea>
        <div className="flex items-center justify-between pt-1.5">
          <div className="flex">
            <HiOutlinePhotograph className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
            <MdOutlineGifBox className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
            <HiOutlineEmojiHappy className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
            <TbCalendarClock className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
            <IoLocationOutline className="h-9 w-9 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
          </div>
          <button
            disabled
            className="bg-slate-900 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
