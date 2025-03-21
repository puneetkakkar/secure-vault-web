import "@/styles/globals.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title></title>
      </head>
      <body
        className={clsx("min-h-screen bg-background font-sans antialiased")}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
