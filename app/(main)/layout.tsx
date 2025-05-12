import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import NavLinks from "@/components/global/nav-links";
import { GitHubIcon } from "@/components/icons";

import type React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid min-h-[100dvh] w-full grid-rows-[auto_1fr_auto]'>
      <header className='border-foreground/10 w-full border-b px-2 sm:px-4'>
        <nav className='mx-auto flex h-18 w-full max-w-5xl items-center justify-between xl:px-8 2xl:max-w-6xl 2xl:px-12'>
          <div className='xs:pl-2 flex items-center justify-start px-1 pb-1.5'>
            <Link
              href='/'
              className='text-background text-shadow-foreground dark:text-foreground text-xl font-black tracking-tight text-shadow-lg dark:text-shadow-none'
            >
              <span className='xs:hidden'>Q|R</span>
              <span className='xs:block hidden'>Quik|Res</span>
            </Link>
          </div>
          <div className='xs:gap-2 flex flex-1 flex-row items-center justify-end gap-1'>
            <SignedIn>
              <NavLinks />
              <UserButton />
            </SignedIn>
            <SignedOut>
              <NavLinks />
            </SignedOut>
          </div>
        </nav>
      </header>
      <section>{children}</section>
      <footer className='mt-auto w-full py-6 sm:py-3'>
        <div className='mx-auto flex w-full flex-col items-center justify-center gap-2.5'>
          <Button asChild size='icon' className='size-6.5'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://x.com/eg__xo'
            >
              <GitHubIcon className='size-4' />
              <span className='sr-only'>X</span>
            </a>
          </Button>

          <Button asChild variant='link' size='link'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://quikres.vercel.app'
            >
              Quik|Res
            </a>
          </Button>
        </div>
      </footer>
    </div>
  );
}
