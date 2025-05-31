"use client";

import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();
  console.log("Session data:", session);
  return (
    <div className="flex flex-col gap-4 p-3">
      <Link href="/">
        <FaXTwitter
          className="w-16 h-16 cursor-pointer 
        p-3 hover:bg-gray-100 rounded-full transition-all
        duration-200"
        />
      </Link>

      <Link
        className="flex items-center p-3 hover:bg-gray-100 
        rounded-full transition-all duration-200 gap-2 w-fit"
        href="/"
      >
        <HiHome className="w-8 h-8 cursor-pointer" />
        <span className="font-bold hidden xl:inline">Home</span>
      </Link>

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
