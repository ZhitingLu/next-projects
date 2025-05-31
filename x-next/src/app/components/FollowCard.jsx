import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

export default function FollowCard({ name, username, avatar, verified }) {
  return (
    <div className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded">
      <div className="flex items-center justify-between">
        <Image
          src={avatar}
          alt={name}
          height={40}
          width={40}
          className="rounded-full"
        />
        <div className="flex flex-col ml-2">
          <h3 className="text-sm font-semibold hover:underline">
            <span className="inline-flex items-center gap-1">
              {name}
              {verified && (
                <MdVerified className="text-[var(--twitter-blue)] w-4 h-4" />
              )}
            </span>
          </h3>
          <p className="text-xs text-gray-500">@{username}</p>
        </div>
      </div>

      <button
        className="bg-slate-900 text-white text-xs font-semibold rounded-full 
hover:brightness-95 transition-all duration-200 w-18 h-8
 cursor-pointer shadow-md hidden xl:inline "
      >
        Follow
      </button>
    </div>
  );
}
