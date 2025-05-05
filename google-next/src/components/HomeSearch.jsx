import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";

export default function HomeSearch() {
  return (
    <>
      <form
        className="flex w-full mt-5 mx-auto
       max-w-[90%] border border-gray-200 px-5 py-3 
       rounded-full hover:shadow-md focus-within:shadow-md
       transition-shadow sm:max-w-xl lg:max-w-2xl"
      >
        <AiOutlineSearch className="text-xl text-gray-500 mr-3" />
        <input type="text" className="flex-grow focus:outline-none" />
        <BsFillMicFill className="text-lg" />
      </form>
      <div className="mt-8 flex flex-col space-y-2 
      sm:space-y-0 justify-center sm:flex-row sm:space-x-4">
        <button
          className="bg-[#f8f9fa] rounded-md text-sx text-gray-800
         hover:ring-gray-200 focus:outline-none active:ring-gray-300
         hover:shadow-md w-36 h-10 transition-shadow"
        >
          Google Search
        </button>

        <button
          className="bg-[#f8f9fa] rounded-md text-sx text-gray-800
         hover:ring-gray-200 focus:outline-none active:ring-gray-300
         hover:shadow-md w-36 h-10 transition-shadow"
        >
          I'm Developer
        </button>
      </div>
    </>
  );
}
