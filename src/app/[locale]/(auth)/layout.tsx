import { Footer, Navbar } from "@/shared/components";
import { CookieKey } from "@/shared/enums/storage.enum";
import { setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  const token = (await cookies()).get(CookieKey.REFRESH_TOKEN);

  setRequestLocale(locale);

  if (token) {
    redirect("/vaults");
  }

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
