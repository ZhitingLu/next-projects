"use client";

import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomeSearch() {
  const [input, setInput] = useState("");
  const [randomWordLoading, setRandomWordLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search/web?searchTerm=${input}`);
  };
  const randomSearch = async (e) => {
    setRandomWordLoading(true);
    const response = await fetch("https://random-word-api.herokuapp.com/word")
      .then((res) => res.json())
      .then((data) => data[0]);
    if (!response) return;
    router.push(`/search/web?searchTerm=${response}`);
    setRandomWordLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full mt-5 mx-auto
       max-w-[90%] border border-gray-200 px-5 py-3 
       rounded-full hover:shadow-md focus-within:shadow-md
       transition-shadow sm:max-w-xl lg:max-w-2xl"
      >
        <AiOutlineSearch className="text-xl text-gray-500 mr-3" />
        <input
          type="text"
          className="flex-grow focus:outline-none"
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-2">
        <Image
          src="https://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png"
          alt="Mic"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Google_Lens_Icon.svg/192px-Google_Lens_Icon.svg.png?20230514215757"
          alt="Google Lens"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        </div>
      </form>
      <div
        className="mt-8 flex flex-col space-y-2 
      sm:space-y-0 justify-center sm:flex-row sm:space-x-4"
      >
        <button
          className="bg-[#f8f9fa] rounded-md text-sm text-gray-800
         hover:ring-gray-200 focus:outline-none active:ring-gray-300
         hover:shadow-md w-36 h-10 transition-shadow cursor-pointer"
          onClick={handleSubmit}
        >
          Google Search
        </button>

        <button
          disabled={randomWordLoading}
          className="bg-[#f8f9fa] rounded-md text-sm text-gray-800
         hover:ring-gray-200 focus:outline-none active:ring-gray-300
         hover:shadow-md w-36 h-10 transition-shadow cursor-pointer
         disabled:opacity-80"
          onClick={randomSearch}
        >
          {randomWordLoading ? "Loading ..." : "I'm Feeling Lucky"}
        </button>
      </div>
    </>
  );
}
