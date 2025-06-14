'use client';

// The Providers is client side
// but everything inside it is server side
// Next.js directory is smart :)
import { ThemeProvider } from 'next-themes';

import React from 'react';

export default function Providers({children}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className='text-gray-700 dark:text-gray-200 bg-white dark:bg-black select-none transition-colors duration-300'>
        {children}
      </div>
    </ThemeProvider>
  )
}
