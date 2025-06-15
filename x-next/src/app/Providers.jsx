"use client";

// The Providers is client side
// but everything inside it is server side
// Next.js directory is smart :)
import { ThemeProvider } from "next-themes";

import React, { useEffect, useState } from "react";

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  // This effect ensures that the theme is only set after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);


  

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Only render children after the component has mounted */}

      {mounted ? (
        <div className="text-gray-700 dark:text-gray-200 bg-white dark:bg-black select-none transition-colors duration-300">
          {children}
        </div>
      ) : (
        <div className="invisible">
          {children}
        </div>
      )}
    </ThemeProvider>
  );
}
