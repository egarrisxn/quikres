import type React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <section className='flex min-h-[calc(100vh-200px)] flex-1 flex-col'>
        {children}
      </section>
      <Footer />
    </>
  );
}
