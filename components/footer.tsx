import { GitHubIcon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className='mt-auto w-full border-t-transparent py-6 sm:py-4'>
      <div className='mx-auto flex w-full flex-col items-center justify-between gap-3'>
        <div className='flex items-center gap-2.5'>
          <Button asChild size='icon' className='size-7'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://x.com/eg__xo'
            >
              <GitHubIcon className='size-5' />
              <span className='sr-only'>X</span>
            </a>
          </Button>
          <Button asChild size='icon' className='size-7'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/egarrisxn/quikres'
            >
              <XIcon className='size-5' />
              <span className='sr-only'>GitHub</span>
            </a>
          </Button>
        </div>
        <div className='flex items-center'>
          <Button asChild variant='link' size='link'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://egxo.dev'
            >
              egxo.dev
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
