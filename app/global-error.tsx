"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError() {
  return (
    <html>
      <body>
        <section className='mx-auto flex max-h-screen min-h-[85vh] w-full flex-col items-center justify-center px-2'>
          <h1 className='text-6xl font-black'>OOPS!</h1>
          <p className='text-foreground/80 mt-1 mb-6 text-3xl font-semibold'>
            Page Error.
          </p>
          <Button asChild>
            <Link href='/'>Go Back</Link>
          </Button>
        </section>
      </body>
    </html>
  );
}
