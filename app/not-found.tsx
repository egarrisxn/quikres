import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className='mx-auto flex max-h-screen min-h-[85vh] w-full flex-col items-center justify-center px-2'>
      <h1 className='text-8xl font-black'>404</h1>
      <p className='text-foreground/80 mt-1 mb-6 text-2xl font-semibold'>
        Page Not Found.
      </p>
      <Button asChild>
        <Link href='/'>Go Back</Link>
      </Button>
    </section>
  );
}
