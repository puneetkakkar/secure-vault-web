"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  nonce: string | undefined;
}

export function ClientProviders({ children, nonce }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider
        attribute={"class"}
        defaultTheme={"dark"}
        nonce={nonce ?? undefined}
      >
        <ToastProvider />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
