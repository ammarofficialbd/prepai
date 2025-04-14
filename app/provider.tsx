// app/providers.tsx
"use client"
import {ThemeProviderProps} from "next-themes"
import {HeroUIProvider} from '@heroui/react'
import { ThemeProvider as NextThemeProvider } from "next-themes"

interface ProvidersProps{
    children: React.ReactNode,
    themeProps?: ThemeProviderProps;
}
export function Providers({children, themeProps} : ProvidersProps) {
  return (
    <HeroUIProvider>
        <NextThemeProvider {...themeProps}>
            {children}
        </NextThemeProvider>
    </HeroUIProvider>
  )
}