import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ResumeStack } from "@/components/resume-stack";

export default function Home() {
  return (
    <>
      <div className='flex'>
        <Navbar />
      </div>
      <section className='flex flex-1'>
        {/* Main content */}

        <div className='container mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-8 lg:max-w-5xl lg:flex-row lg:justify-between lg:gap-2 xl:h-screen xl:max-h-screen'>
          <div className='mx-auto flex w-[55%] max-w-2xl flex-col items-center gap-4 px-4 pb-16 text-center lg:min-h-screen lg:items-start lg:pt-36 lg:pb-0 lg:text-start xl:min-h-[90vh] xl:px-0 2xl:pt-44'>
            <span className='bg-secondary text-secondary-foreground rounded-base mt-16 mb-2 inline-block px-2.5 py-1.5 text-xs sm:text-sm lg:mt-0'>
              No Ads. No Paywalls. 100% Free.
            </span>
            <h1 className='text-foreground mb-6 px-2 text-5xl font-bold text-pretty sm:text-6xl md:px-0'>
              Resume to Website in Under a Minute!
            </h1>
            <p className='text-muted-foreground mb-8 max-w-lg px-4 text-lg sm:text-xl md:px-0'>
              Turn your old and boring resume into a fun and modern website
              faster than ever before with QuikRes!
            </p>

            <Button
              asChild
              size='default'
              className='h-9 px-3 py-2 sm:h-10 sm:px-4'
            >
              <Link href='/upload'>
                Create Your Website
                <Sparkles className='ml-1' />
              </Link>
            </Button>
          </div>
          <div className='mx-auto flex min-h-[90vh] w-[45%] flex-col items-center px-4 pt-4 sm:min-h-screen lg:pt-12 xl:min-h-[90vh] xl:px-0 xl:pt-16 2xl:pt-20'>
            <ResumeStack />
          </div>
        </div>
      </section>
      <div className='flex'>
        <Footer />
      </div>
    </>
  );
}
