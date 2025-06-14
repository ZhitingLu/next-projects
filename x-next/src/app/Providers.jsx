'use client';

// The Providers is client side
// but everything inside it is server side
// Next.js directory is smart :)
import { ThemeProvider } from 'next-themes';

import React from 'react';

export default function Providers({children}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme>
      <div>
        {children}
      </div>
    </ThemeProvider>
  )
}
