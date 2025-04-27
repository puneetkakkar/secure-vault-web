import { AuthenticatedAppLayoutContainer } from "@/shared/components";
import { CookieKey } from "@/shared/enums";
import { setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "./loading";

export default async function AuthenticatedLayout({
  children,
  params,
}: {
  children?: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const token = (await cookies()).get(CookieKey.REFRESH_TOKEN);

  setRequestLocale(locale);

  if (!token || token.value === "") {
    redirect("/login");
  }

  return (
    <Suspense fallback={<Loading />}>
      <AuthenticatedAppLayoutContainer>
        {children}
      </AuthenticatedAppLayoutContainer>
    </Suspense>
  );
}
