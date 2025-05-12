import Link from "next/link";
import React from "react";
import { TbGridDots } from "react-icons/tb";

export default function HomeHeader() {
  return (
    <header className="flex justify-between px-7 py-3">
      <div className="flex space-x-5 items-center text-sm">
        <Link href={"https://about.google.com"} className="hover:underline">
          About
        </Link>
        <Link href={"https://store.google.com"} className="hover:underline">
          Store
        </Link>
        </div>
      <div className="flex space-x-4 items-center text-xs">
        <Link href={"https://mail.google.com"} className="hover:underline">
          Gmail
        </Link>

        <Link href={"https://image.google.com"} className="hover:underline">
          Images
        </Link>

        <TbGridDots
          className="bg-transparent hover:bg-gray-200 
        rounded-full text-4xl p-2"
        />

        <button
          className="bg-blue-500 text-white px-6 py-2 font-medium rounded-md hover:brightness-105 hover:shadow-md
        transition-shadow "
        >
          Sign in
        </button>
      </div>
    </header>
  );
}
