import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./SearchBox";
import { TbGridDots } from "react-icons/tb";
import SearchHeaderOptions from "./SearchHeaderOptions";

export default function SearchHeader() {
  return (
    <header className="sticky top-0 bg-white">
      <div className="flex w-full p-6 items-center justify-between">
        <Link href="/">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
            alt="logo image"
            width={120}
            height={40}
            priority
            style={{ width: "auto" }}
          />
        </Link>

        <div className=" flex-1 ">
        <Suspense fallback={<div>Searching...</div>}>
          <SearchBox />
          </Suspense>
        </div>

        <div className="hidden md:inline-flex space-x-2">
          <TbGridDots className="bg-transparent hover:bg-gray-200 p-2 text-4xl rounded-full cursor-pointer" />
        </div>

        <button
          className="bg-blue-500 text-white px-6 py-2 font-medium rounded-md hover:brightness-105 hover:shadow-md
        transition-shadow ml-2"
        >
          Sign in
        </button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <SearchHeaderOptions />
      </Suspense>
    </header>
  );
}
