"use client";

import { ThemeProvider } from "next-themes";

import React from "react";

export default function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
      <div className="min-h-screen select-none transition-color duration-300">{children}</div>
    </ThemeProvider>
  );
}
