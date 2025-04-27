import { Footer, Navbar } from "@/shared/components";
import { CookieKey } from "@/shared/enums/storage.enum";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = (await cookies()).get(CookieKey.REFRESH_TOKEN);

  if (token && token.value !== "") {
    redirect("/vaults");
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className="w-full flex-grow">{children}</main>
        <Footer />
      </div>
    </Suspense>
  );
}
