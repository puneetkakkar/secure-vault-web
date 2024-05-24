import "@/styles/globals.css";
import { Link } from "@nextui-org/react";
import clsx from "clsx";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "../config/site";
import { Providers } from "./providers";

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
      <head />
      <body
        className={clsx("min-h-screen bg-background font-sans antialiased")}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "dark",
            children: children,
          }}
        >
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
        </Providers>
      </body>
    </html>
  );
}
