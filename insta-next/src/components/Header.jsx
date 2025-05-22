"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Header() {
  return (
    <div className="shadow-sm border-b-gray sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="hidden lg:inline-flex">
          <Image src="/instagram-1.svg" width={96} height={96} alt="logo" />
        </Link>

        <Link href="/" className="lg:hidden">
          <Image src="/Instagram_icon.png" width={40} height={40} alt="logo" />
        </Link>
        {/* search input */}
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-200 
          rounded text-sm w-full py-2 px-4 max-w-[210px]"
        />
        {/* menu items */}
        <button
          onClick={() => signIn()}
          className="text-sm font-semibold text-blue-500"
        >Log In</button>
      </div>
    </div>
  );
}
