"use client";

import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiInboxLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { IoFlashOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";

export default function Sidebar() {
  const { data: session } = useSession();
  console.log("Session data:", session);
  return (
    <div className="flex flex-col gap-2 p-3">
      <Link href="/">
        <FaXTwitter
          className="w-14 h-14 cursor-pointer 
        p-3 hover:bg-gray-100 rounded-full transition-all
        duration-200"
        />
      </Link>

      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <HiHome className="w-7 h-7 cursor-pointer" />
        <span className="text-xl font-bold hidden xl:inline">Home</span>
      </Link>

      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <FiSearch className="w-7 h-7 cursor-pointer" />
        <span className="text-xl hidden xl:inline">Explore</span>
      </Link>
      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <IoNotificationsOutline className="w-7 h-7 cursor-pointer" />
        <span className="text-xl hidden xl:inline">Notifications</span>
      </Link>

      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <RiInboxLine className="w-7 h-7 cursor-pointer" />
        <span className="text-xl hidden xl:inline">Messages</span>
      </Link>

      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <FaRegBookmark className="w-7 h-7 cursor-pointer" />
        <span className="text-xl hidden xl:inline">Bookmarks</span>
    </Link>
      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <LuBriefcaseBusiness className="w-7 h-7 cursor-pointer" />
        <span className="text-xl hidden xl:inline">Jobs</span>
      </Link>

      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <BsPeople className="w-7 h-7 cursor-pointer" />
        <span className="text-xl hidden xl:inline">Communites</span>
      </Link>

      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <FaXTwitter className="w-7 h-7 cursor-pointer" />
        <span className="text-xl hidden xl:inline">Premium</span>
      </Link>

      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <IoFlashOutline className="w-7 h-7 cursor-pointer" />
        <span className="text-xl hidden xl:inline">Verified Orgs</span>
      </Link>

      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <IoPersonOutline className="w-7 h-7 cursor-pointer" />
        <span className="text-xl hidden xl:inline">Profile</span>
      </Link>

      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-6 w-fit"
        href="/"
      >
        <CgMoreO className="w-6 h-6 cursor-pointer" />
        <span className="text-xl hidden xl:inline">More</span>
      </Link>

      <button className="bg-slate-900 text-white rounded-full
      hover:brightness-95 transition-all duration-200 w-48 h-12
      cursor-pointer shadow-md font-semibold">Post</button>

      {session ? (
        <button
          onClick={() => signOut()}
          className="bg-blue-400 text-white rounded-full 
hover:brightness-95 transition-all duration-200 w-48 h-9
 cursor-pointer shadow-md hidden xl:inline font-semibold"
        >
          Sign out
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-blue-400 text-white rounded-full 
    hover:brightness-95 transition-all duration-200 w-48 h-9
        cursor-pointer shadow-md hidden xl:inline font-semibold"
        >
          Sign in
        </button>
      )}
    </div>
  );
}
