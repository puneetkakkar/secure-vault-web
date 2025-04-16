import { ClientProviders } from "@/app/[locale]/client-providers";
import { siteConfig } from "@/core/config";
import { routing } from "@/core/i18n";
import "@/styles/globals.css";
import clsx from "clsx";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import React from "react";

export const dynamic = "force-dynamic";

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export function generateMetadata(): Metadata {
  return {
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
      icon: "/favicon.ico",
    },
    // assets: ["http://localhost:3000/assets"],
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Using internationalization in Client Components
  const messages = await getMessages();

  return (
    <html lang={locale} nonce={nonce} suppressHydrationWarning>
      <head></head>
      <body
        className={clsx("min-h-screen bg-background font-sans antialiased")}
      >
        <Script nonce={nonce} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders nonce={nonce}>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
