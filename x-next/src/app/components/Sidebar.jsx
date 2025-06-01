"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FiSearch } from "react-icons/fi";
import {
  IoNotificationsOutline,
  IoFlashOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { RiInboxLine, RiMoreFill } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

export default function Sidebar() {
  const { data: session } = useSession();
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col justify-between h-full p-3 items-center">
      {/* Top menu */}
      <div className="flex flex-col gap-2">
        <Link href="/">
          <FaXTwitter className="w-14 h-14 cursor-pointer p-3 hover:bg-gray-200 rounded-full transition-all duration-200" />
        </Link>

        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <HiHome className="w-7 h-7 cursor-pointer" />
          <span className="text-xl font-bold hidden xl:inline">Home</span>
        </Link>

        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <FiSearch className="w-7 h-7 cursor-pointer" />
          <span className="text-xl hidden xl:inline">Explore</span>
        </Link>
        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <IoNotificationsOutline className="w-7 h-7 cursor-pointer" />
          <span className="text-xl hidden xl:inline">Notifications</span>
        </Link>

        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <RiInboxLine className="w-7 h-7 cursor-pointer" />
          <span className="text-xl hidden xl:inline">Messages</span>
        </Link>

        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <FaRegBookmark className="w-6 h-6 cursor-pointer" />
          <span className="text-xl hidden xl:inline">Bookmarks</span>
        </Link>
        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <LuBriefcaseBusiness className="w-7 h-7 cursor-pointer" />
          <span className="text-xl hidden xl:inline">Jobs</span>
        </Link>

        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <BsPeople className="w-7 h-7 cursor-pointer" />
          <span className="text-xl hidden xl:inline">Communites</span>
        </Link>

        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <FaXTwitter className="w-7 h-7 cursor-pointer" />
          <span className="text-xl hidden xl:inline">Premium</span>
        </Link>

        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <IoFlashOutline className="w-7 h-7 cursor-pointer" />
          <span className="text-xl hidden xl:inline">Verified Orgs</span>
        </Link>

        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <IoPersonOutline className="w-7 h-7 cursor-pointer" />
          <span className="text-xl hidden xl:inline">Profile</span>
        </Link>

        <Link
          className="flex items-center p-3 hover:bg-gray-200 
        rounded-full transition-all duration-200 gap-6 w-fit"
          href="/"
        >
          <CgMoreO className="w-6 h-6 cursor-pointer" />
          <span className="text-xl hidden xl:inline">More</span>
        </Link>

        <button
          className="bg-slate-900 text-white rounded-full
      hover:brightness-95 transition-all duration-200 w-58 h-12
      cursor-pointer shadow-md font-semibold hidden xl:inline"
        >
          Post
        </button>
      </div>

      {session ? (
        <div className="relative">
          <div
            className="flex justify-between items-center text-gray-800 text-sm cursor-pointer px-2 py-3 hover:bg-gray-200 rounded-full transition-all duration-200"
            onClick={() => setShowLogout((prev) => !prev)}
          >
            <div className="flex items-center">
              <img
                src={session.user.image}
                alt=""
                className="w-10 h-10 rounded-full cursor-pointer hover:brightness-95 transition-all duration-200 mx-3 xl:mr-2"
              />
              <div className="hidden xl:inline">
                <h4 className="font-bold">{session.user.name}</h4>
                <p className="text-gray-500 text-sm">
                  @{session.user.username}
                </p>
              </div>
            </div>
            <RiMoreFill className="w-6 h-6 xl:ml-8 hidden xl:inline" />
          </div>

          {showLogout && (
            <div
              ref={dropdownRef}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg w-72 py-2 z-50 font-bold"
            >
              {/* Arrow */}

              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800 cursor-pointer">
                Add an existing account
              </button>
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800 cursor-pointer"
              >
                Log out @{session.user.username}
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-58 h-12 cursor-pointer shadow-md hidden xl:inline font-semibold"
        >
          Sign in
        </button>
      )}
    </div>
  );
}
