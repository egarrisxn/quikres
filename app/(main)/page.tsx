import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeCarousel from "@/components/resume-carousel";

export default function Home() {
  return (
    <div className='grid min-h-[80dvh] w-full place-items-center'>
      <div className='mx-auto flex max-w-5xl flex-col items-center justify-center gap-y-16 py-8 lg:flex-row lg:gap-x-2 lg:gap-y-0 lg:py-16 2xl:gap-x-12'>
        <div className='w-full px-4'>
          <div className='mx-auto flex w-full flex-col items-center gap-y-1 px-2 pt-8 text-center lg:items-start lg:pt-0 lg:pl-8 lg:text-start 2xl:pl-2'>
            <span className='bg-secondary text-secondary-foreground rounded-base font-base inline-block px-2 py-1 text-xs tracking-tighter lg:px-2.5 lg:py-1.5'>
              No Ads. No Paywalls. 100% Free.
            </span>
            <h1 className='text-foreground my-2 max-w-md px-4 text-3xl font-extrabold tracking-tighter text-pretty sm:text-4xl lg:px-0 lg:text-5xl xl:my-3 xl:max-w-lg 2xl:max-w-2xl'>
              Resume 2 Website in Under 1 Minute!
            </h1>
            <p className='text-muted-foreground mb-4 max-w-sm px-8 text-sm tracking-tight lg:px-0 lg:text-base xl:mb-6 2xl:max-w-md'>
              Turn your old and boring resume into a fun and modern website
              faster than ever before with Quik|Res!
            </p>
            <Button
              asChild
              size='default'
              className='h-10 px-4 py-2.5 2xl:h-11 2xl:px-6 2xl:py-3 2xl:text-xl'
            >
              <Link href='/upload'>
                <Sparkles className='mr-0.5' />
                Start Creating!
              </Link>
            </Button>
          </div>
        </div>
        <div className='w-full px-4'>
          <div className='mx-auto flex w-full flex-col items-center px-2 lg:pr-8 2xl:pr-2'>
            <ResumeCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
