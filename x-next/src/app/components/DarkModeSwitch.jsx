"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function DarkModeSwitch() {
  // Using the useTheme hook to access theme-related properties
  const { theme, setTheme, systemTheme } = useTheme();
  // Determine the current theme
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div>
      {mounted &&
        (currentTheme === "dark" ? (
          <div
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
    text-gray-800 hover:text-amber-500
    dark:text-gray-200 dark:hover:text-text-amber-500
    hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => setTheme("light")}
          >
            <MdLightMode className="w-6 h-6  text-xl " />
            <span className="text-xl hidden xl:inline">Switch</span>
          </div>
        ) : (
          <div
            className="flex items-center p-3 rounded-full transition-all duration-200 gap-6 w-fit
  text-gray-800 hover:text-amber-500
  dark:text-gray-200 dark:hover:text-text-amber-500
  hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            <MdDarkMode className="w-6 h-6 text-xl" />
            <span className="text-xl hidden xl:inline">Switch</span>
          </div>
        ))}
    </div>
  );
}
