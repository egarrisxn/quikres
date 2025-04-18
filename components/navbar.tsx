import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { NavLinks } from "./nav-links";

export function Navbar() {
  return (
    <header className='mt-auto w-full border-b px-6 shadow'>
      <nav className='mx-auto flex h-18 w-full max-w-5xl items-center justify-between 2xl:max-w-6xl'>
        <div>
          <Link
            href='/'
            className='text-foreground/90 text-shadow-secondary-foreground font-base flex items-center gap-0.5 text-xl tracking-tight'
          >
            <Image src='/icons/icon.svg' alt='Logo' width={40} height={40} />
            QuikRes
          </Link>
        </div>
        <div className='flex flex-row items-center gap-2'>
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
