import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { setRequestLocale } from "next-intl/server";
import React, { Suspense } from "react";
import Loading from "./loading";

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
      <Suspense fallback={<Loading />}>
        <main className="container mx-auto max-w-7xl flex-grow">
          {children}
        </main>
      </Suspense>
      <Footer />
    </div>
  );
}
