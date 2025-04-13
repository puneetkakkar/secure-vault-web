import { Navbar } from "@/components/navbar";
import { setRequestLocale } from "next-intl/server";
import React from "react";

export default async function VaultLayout({
  children,
  params,
}: {
  children?: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar showAuthButtons={false} />
      <main className="container mx-auto max-w-7xl flex-grow">{children}</main>
    </div>
  );
}
