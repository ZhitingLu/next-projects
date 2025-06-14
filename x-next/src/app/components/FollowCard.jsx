"use client";

import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { useSession } from "next-auth/react";
import useModalStore from "../stores/modalStore";
import { toast } from "react-hot-toast";

export default function FollowCard({ name, username, avatar, verified }) {
  const { data: session } = useSession();
  const openModal = useModalStore();

  const handleFollowModal = () => {
    if (!session?.user) {
      openModal("auth"); // opens Zustand auth modal
    } else {
      toast("Feature not complete yet", {
        icon: "👋🏼",
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2">
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
          <p className="text-xs text-gray-500 dark:text-gray-300">@{username}</p>
        </div>
      </div>

      <button
        onClick={handleFollowModal}
        className="bg-slate-900 text-white dark:bg-gray-200 dark:text-black text-xs font-semibold rounded-xl
hover:brightness-95 transition-all duration-200 w-18 h-8
 cursor-pointer shadow-md hidden xl:inline "
      >
        Follow
      </button>
    </div>
  );
}
