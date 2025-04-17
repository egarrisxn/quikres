import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "./theme-selector";

export function Navbar() {
  return (
    <header className='mt-auto w-full border-b px-6 shadow'>
      <nav className='mx-auto flex h-18 w-full max-w-5xl items-center justify-between'>
        <div>
          <Link
            href='/'
            className='text-foreground/90 text-shadow-secondary-foreground font-base flex items-center gap-0.5 text-xl tracking-tight'
          >
            <Image src='/logo.svg' alt='Logo' width={40} height={40} />
            QuikRes
          </Link>
        </div>
        <div className='flex flex-row items-center gap-4'>
          {/* User is signed in */}
          <SignedIn>
            <div className='flex items-center'>
              <UserButton />
            </div>
          </SignedIn>
          {/* User is signed out */}
          <SignedOut>
            <div className='flex flex-row items-center gap-4'>
              <Link href='/about'>
                <Button variant='link' size='link'>
                  About
                </Button>
              </Link>
              <Link href='/contact'>
                <Button variant='link' size='link'>
                  Contact
                </Button>
              </Link>
              <Link href='/sign-in'>
                <Button size='sm'>Login</Button>
              </Link>
              <Link href='/sign-up'>
                <Button size='sm'>Sign Up</Button>
              </Link>
            </div>
          </SignedOut>
          <ThemeSelector />
        </div>
      </nav>
    </header>
  );
}
