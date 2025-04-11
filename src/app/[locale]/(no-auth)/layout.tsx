import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import React, { ReactNode } from "react";

export default function NoAuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="w-full flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
