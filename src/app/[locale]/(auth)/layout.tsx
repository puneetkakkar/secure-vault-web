import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import React from "react";
import { setRequestLocale } from "next-intl/server";

export default async function AuthLayout({
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
      <Footer />
    </div>
  );
}
