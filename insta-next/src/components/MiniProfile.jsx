"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div
      className="w-full flex items-center justify-between 
    mt-14 ml-10 scroll-ml-10"
    >
      <img
        className="w-16 h-16 rounded-full border p-[2px] cursor-pointer"
        src={session?.user?.image || "/instagram_icon.png"}
        alt="user profile image"
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400 whitespace-nowrap">Welcome to Instagram</h3>
      </div>
      {session ? (
        <button
          onClick={signOut}
          className="text-blue-400 text-sm font-semibold hover:text-blue-600 cursor-pointer"
        >
          Sign out
        </button>
      ) : (
        <button
          onClick={signIn}
          className="text-blue-400 text-sm font-semibold hover:text-blue-600 cursor-pointer"
        >
          Sign in
        </button>
      )}
    </div>
  );
}
