"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import {
  IoFlashOutline,
  IoNotificationsOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { RiInboxLine, RiMoreFill } from "react-icons/ri";
import useModalStore from "../stores/modalStore";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Sidebar() {
  const { data: session } = useSession();
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);
  const { openModal } = useModalStore();

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

  const handlePostModal = () => {
    if (!session?.user) {
      openModal("auth"); // opens Zustand auth modal
    } else {
      openModal("post"); // opens Zustand post modal
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full p-3 items-center">
        {/* Top menu */}
        <div className="flex flex-col gap-2">
          <Link href="/">
            <FaXTwitter
              className="w-14 h-14 cursor-pointer p-3 rounded-full transition-all duration-200 
            text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            />
          </Link>

          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <HiHome className="w-7 h-7 cursor-pointer" />
            <span className="text-xl font-bold hidden xl:inline">Home</span>
          </Link>

          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <FiSearch className="w-7 h-7 cursor-pointer" />
            <span className="text-xl hidden xl:inline">Explore</span>
          </Link>
          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <IoNotificationsOutline className="w-7 h-7 cursor-pointer" />
            <span className="text-xl hidden xl:inline">Notifications</span>
          </Link>

          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <RiInboxLine className="w-7 h-7 cursor-pointer" />
            <span className="text-xl hidden xl:inline">Messages</span>
          </Link>

          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <FaRegBookmark className="w-6 h-6 cursor-pointer" />
            <span className="text-xl hidden xl:inline">Bookmarks</span>
          </Link>
          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <LuBriefcaseBusiness className="w-7 h-7 cursor-pointer" />
            <span className="text-xl hidden xl:inline">Jobs</span>
          </Link>

          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <BsPeople className="w-7 h-7 cursor-pointer" />
            <span className="text-xl hidden xl:inline">Communites</span>
          </Link>

          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <FaXTwitter className="w-7 h-7 cursor-pointer" />
            <span className="text-xl hidden xl:inline">Premium</span>
          </Link>

          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <IoFlashOutline className="w-7 h-7 cursor-pointer" />
            <span className="text-xl hidden xl:inline">Verified Orgs</span>
          </Link>

          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <IoPersonOutline className="w-7 h-7 cursor-pointer" />
            <span className="text-xl hidden xl:inline">Profile</span>
          </Link>

          <Link
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-black
    dark:text-gray-200 dark:hover:text-white
    hover:bg-gray-200 dark:hover:bg-gray-700"
            href="/"
          >
            <CgMoreO className="w-6 h-6 cursor-pointer" />
            <span className="text-xl hidden xl:inline">More</span>
          </Link>

          <div className="flex items-center p-3 gap-6">
            <DarkModeSwitch />
          </div>

          <button
            onClick={handlePostModal}
            className="bg-slate-900 text-white rounded-full
      hover:brightness-95 transition-all duration-200 w-full h-12
      cursor-pointer shadow-md font-semibold hidden xl:inline dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Post
          </button>

          {/* Modals rendered once and controlled globally */}
        </div>

        {session ? (
          <div className="relative">
            <div
              className="flex justify-between items-center text-gray-800 dark:border dark:border-gray-700 dark:text-gray-300 text-sm cursor-pointer px-2 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
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
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    @{session.user.username}
                  </p>
                </div>
              </div>
              <RiMoreFill className="w-6 h-6 xl:ml-8 hidden xl:inline" />
            </div>

            {showLogout && (
              <div
                ref={dropdownRef}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 border bg-white dark:bg-black border-gray-200 dark:border-gray-700 rounded-xl shadow-lg w-72 z-60 font-bold rounded-t-md rounded-b-md"
              >
                {/* Arrow */}

                <button className="block w-full text-left px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-300 cursor-pointer">
                  Add an existing account
                </button>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-300 cursor-pointer"
                >
                  Log out @{session.user.username}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-[75%]">
            <button
              onClick={() => signIn()}
              className="bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-full h-12 cursor-pointer shadow-md hidden xl:inline font-semibold"
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </>
  );
}
