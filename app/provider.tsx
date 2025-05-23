// app/providers.tsx
"use client"
import {ThemeProviderProps} from "next-themes"
import {HeroUIProvider} from '@heroui/react'
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Toaster } from "react-hot-toast";

interface ProvidersProps{
    children: React.ReactNode,
    themeProps?: ThemeProviderProps;
}
export function Providers({children, themeProps} : ProvidersProps) {
  const router = useRouter();
  return (
    <HeroUIProvider navigate={router.push}>
        <NextThemeProvider {...themeProps}>
          <SessionProvider> 
         
          {children}
          <Toaster />
          </SessionProvider>
        </NextThemeProvider>
    </HeroUIProvider>
  )
}