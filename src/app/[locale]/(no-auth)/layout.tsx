import { Footer, Navbar } from "@/shared/components";
import { ReactNode } from "react";

export default function NoAuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="w-full flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
