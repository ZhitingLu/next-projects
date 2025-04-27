"use client";

import React, { useEffect } from "react";

export default function error({ error, reset }) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
    <div className="text-center mt-10 p-6 rounded-lg shadow-md">
      <h5 className="text-xl font-semibold mb-4">
        Something went wrong. Please try again later.
      </h5>
      <button
        className="bg-amber-500 text-white px-4 py-2 rounded-lg text-md font-medium hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
    </div>
  );
}
