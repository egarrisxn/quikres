import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ResumeStack from "@/components/resume-stack";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className='mx-auto grid min-h-screen w-full place-items-center pt-20 sm:pt-24 lg:pt-0'>
        <div className='container mx-auto flex w-full flex-col items-center justify-center gap-20 border lg:max-w-5xl lg:flex-row lg:gap-0 lg:pt-16 xl:h-screen 2xl:max-w-6xl 2xl:gap-4 2xl:pt-40'>
          <div className='w-full px-4 lg:min-h-screen lg:w-1/2 lg:pt-24 xl:max-h-[90vh] xl:min-h-[90vh] xl:pr-0 xl:pl-8 2xl:h-[50vh] 2xl:pt-32'>
            <div className='mx-auto flex w-full flex-col items-center gap-2 px-2 text-center lg:items-start lg:pr-0 lg:pl-8 lg:text-start 2xl:gap-3 2xl:pl-0'>
              <span className='bg-secondary text-secondary-foreground rounded-base font-base inline-block px-2 py-1 text-xs tracking-tighter lg:px-2.5 lg:py-1.5'>
                No Ads. No Paywalls. 100% Free.
              </span>
              <h1 className='text-foreground mt-4 mb-3 max-w-md px-4 text-3xl font-extrabold tracking-tight text-pretty sm:max-w-lg sm:text-4xl lg:max-w-md lg:px-0 lg:text-5xl xl:max-w-lg 2xl:text-6xl'>
                Resume to Website in Under a Minute!
              </h1>
              <p className='text-muted-foreground mb-6 max-w-sm px-8 text-sm tracking-tight lg:px-0 lg:text-base 2xl:text-xl'>
                Turn your old and boring resume into a fun and modern website
                faster than ever before with QuikRes!
              </p>

              <Button
                asChild
                size='default'
                className='h-10 px-4 py-2.5 2xl:h-11 2xl:px-6 2xl:py-3 2xl:text-xl'
              >
                <Link href='/upload'>
                  <Sparkles className='mr-0.5' />
                  Create Website
                </Link>
              </Button>
            </div>
          </div>
          <div className='min-h-[90vh] w-full px-4 lg:min-h-screen lg:w-1/2 lg:pt-4 xl:max-h-[90vh] xl:min-h-[90vh] xl:pr-8 xl:pl-0 2xl:h-[50vh] 2xl:pt-8'>
            <div className='mx-auto flex w-full flex-col items-center px-2 lg:pr-8 lg:pl-0 2xl:items-start 2xl:py-4'>
              <ResumeStack />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
