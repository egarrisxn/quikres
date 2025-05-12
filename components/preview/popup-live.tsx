import { useMemo } from "react";
import { toast } from "sonner";
import { Copy, Radio, SquareArrowOutUpRight, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerDescription,
} from "@/components/ui/drawer";

export function PopupLive({
  isOpen,
  onClose,
  websiteUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  websiteUrl: string;
}) {
  const isMobile = useIsMobile();

  const mainContent = useMemo(() => {
    return (
      <div className='rounded-base relative bg-white shadow'>
        <div className='flex h-full flex-col items-center justify-center gap-5 p-6'>
          <Radio className='h-[41px] w-[52px]' />

          <h3 className='font-base mb-1 font-sans text-2xl'>
            Your website is now live!
          </h3>

          <div className='flex w-full flex-col gap-4 md:gap-2'>
            <div className='rounded-base border-border bg-secondary text-foreground min-h-10 grow border p-2 px-3 text-sm'>
              {websiteUrl}
            </div>
            <div className='grid grid-cols-2 gap-4 md:gap-2'>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(websiteUrl);
                  toast.success("Copied link to your website");
                }}
                className='hover:bg-hover rounded-base flex flex-row items-center justify-center gap-2 p-2 text-white'
                title='Copy URL'
              >
                <Copy className='size-5' />
                <span className='text-white'>Copy URL</span>
              </button>
              <a
                href={websiteUrl}
                target='_blank'
                rel='noreferrer'
                className='hover:bg-hover rounded-base flex flex-row items-center justify-center gap-2 p-2 text-white'
              >
                <SquareArrowOutUpRight className='size-5' />
                <span className='text-white'>Visit Site</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }, [websiteUrl]);

  if (!isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className='h-[280px] gap-0 border-none p-0 sm:max-w-md md:w-[500px]'>
          <DialogTitle className='sr-only' id='site-live-title'>
            Site Live
          </DialogTitle>
          <DialogDescription className='sr-only' id='site-live-desc'>
            Your website is now live.
          </DialogDescription>

          <button
            onClick={onClose}
            className='text-foreground/80 hover:text-foreground absolute top-4 right-4'
          >
            <X className='size-4' />
          </button>
          {mainContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerTitle className='sr-only' id='site-live-title'>
          Site Live
        </DrawerTitle>
        <DrawerDescription className='sr-only' id='site-live-desc'>
          Your website is now live.
        </DrawerDescription>
        {mainContent}
      </DrawerContent>
    </Drawer>
  );
}
