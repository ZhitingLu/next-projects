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
          <MdLightMode
            className="w-6 h-6 cursor-pointer  text-xl hover:text-amber-500"
            onClick={() => setTheme("light")}
          />
        ) : (
          <MdDarkMode
            className="w-6 h-6 cursor-pointer text-xl hover:text-amber-500"
            onClick={() => setTheme("dark")}
          />
        ))}
    </div>
  );
}
