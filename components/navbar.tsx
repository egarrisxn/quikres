import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { NavLinks } from "./nav-links";

export function Navbar() {
  return (
    <header className='border-foreground/10 w-full border-b px-2 sm:px-4'>
      <nav className='mx-auto flex h-18 w-full max-w-5xl items-center justify-between xl:px-8 2xl:max-w-6xl 2xl:px-12'>
        <div className='flex items-center'>
          <Link href='/' className='block sm:hidden'>
            <Image src='/icons/icon.svg' alt='Logo' width={32} height={32} />
          </Link>
          <Link href='/' className='hidden sm:block'>
            <p className='font-base text-secondary-foreground rounded-base border-border ring-foreground text-shadow-foreground hover:text-secondary-foreground/90 shadow-foreground border-2 px-1 pt-0 pb-1 text-xl shadow-sm ring transition-all duration-200 ease-in-out text-shadow-sm'>
              Quik|Res
            </p>
          </Link>
        </div>
        <div className='flex flex-1 flex-row items-center justify-end gap-2'>
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
