import type React from 'react'

import { DarkThemeProvider } from '@/providers/dark-theme-provider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <DarkThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </DarkThemeProvider>
  )
}
