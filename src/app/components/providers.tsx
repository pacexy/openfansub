'use client'

import { ThemeProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import * as React from 'react'

interface ProvidersProps {
  children: React.ReactNode
  theme?: ThemeProviderProps
}

export function Providers({ children, theme }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...theme}
    >
      {children}
    </ThemeProvider>
  )
}
