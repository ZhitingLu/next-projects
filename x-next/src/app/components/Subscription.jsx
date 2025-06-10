"use client";

import React from "react";
import { useSession } from "next-auth/react";
import useModalStore from "../stores/modalStore";
import { toast } from "react-hot-toast";

export default function Subscription() {
  const { data: session } = useSession();
  const { openModal } = useModalStore();

  const handleSubscribtion = () => {
    if (!session?.user) {
      openModal("auth"); // opens Zustand auth modal
    } else {
      toast("Coming soon!", {
        icon: "🥁",
        position: "top-right",
      });
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-3">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Subscribe to Premium</h2>
        <p className="text-gray-800 text-sm">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <button
          onClick={handleSubscribtion}
          className="bg-[var(--twitter-blue)] text-white rounded-full 
hover:brightness-95 transition-all duration-200 w-28 h-9
 cursor-pointer shadow-md hidden xl:inline font-semibold"
        >
          Subscrib
        </button>
      </div>
    </div>
  );
}
