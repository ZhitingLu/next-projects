import React from "react";

export default function Subscription() {
  return (
    <div className="border border-gray-200 rounded-xl p-3 my-3">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Subscribe to Premium</h2>
        <p className="text-gray-600">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <button
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
