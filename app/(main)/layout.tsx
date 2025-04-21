import type React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid min-h-[100dvh] w-full grid-rows-[auto_1fr_auto]'>
      <Navbar />
      <section>{children}</section>
      <Footer />
    </div>
  );
}
