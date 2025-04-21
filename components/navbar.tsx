import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { NavLinks } from "./nav-links";

export function Navbar() {
  return (
    <header className='border-foreground/10 xs:px-2 w-full border-b px-1 sm:px-4'>
      <nav className='mx-auto flex h-18 w-full max-w-5xl items-center justify-between xl:px-8 2xl:max-w-6xl 2xl:px-12'>
        <div className='xs:pl-2 flex items-center pl-0.5'>
          <Link
            href='/'
            className='font-base text-secondary-foreground/90 rounded-base border-border ring-secondary-foreground text-shadow-secondary-foreground/80 hover:text-secondary-foreground bg-secondary-foreground/5 xs:border-2 xs:ring-2 border-1 px-1 pt-0 pb-1.5 text-xl leading-5 ring-1 transition-all duration-200 ease-in-out text-shadow-sm'
          >
            <span className='xs:hidden inline-flex'>Q|R</span>
            <span className='xs:inline-flex hidden'>Quik|Res</span>
          </Link>
        </div>
        <div className='xs:gap-2 flex flex-1 flex-row items-center justify-end gap-1.5'>
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
  );
}
