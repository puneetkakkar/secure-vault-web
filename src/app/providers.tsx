"use client";

import { Link, HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import { Navbar } from "@/components/navbar";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider attribute={"class"} defaultTheme={"dark"}>
        <div className="relative flex flex-col h-screen">
          <Navbar />
          <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
            {children}
          </main>
          <footer className="w-full flex items-center justify-center py-3">
            <Link
              isExternal
              className="flex items-center gap-1 text-current"
              href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
              title="nextui.org homepage"
            >
              <span className="text-default-600">Copyright &copy;</span>
              <p className="text-primary">Puneet Kakkar</p>
            </Link>
          </footer>
        </div>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
