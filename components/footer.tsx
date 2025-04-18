import { GitHubIcon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className='mt-auto w-full border-t px-6 py-4'>
      <div className='mx-auto flex w-full max-w-5xl flex-col-reverse items-center justify-between gap-2 md:flex-row md:gap-0 2xl:max-w-6xl'>
        <div>
          <Button asChild variant='link' size='link'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://egxo.dev'
            >
              egxo.dev
            </a>
          </Button>
          <span className='text-xs'> | 2025</span>
        </div>
        <div className='flex items-center gap-2'>
          <Button asChild size='icon' className='size-8'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://x.com/eg__xo'
            >
              <GitHubIcon className='size-6' />
              <span className='sr-only'>X</span>
            </a>
          </Button>
          <Button asChild size='icon' className='size-8'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/egarrisxn/quikres'
            >
              <XIcon className='size-6' />
              <span className='sr-only'>GitHub</span>
            </a>
          </Button>
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </footer>
  );
}
