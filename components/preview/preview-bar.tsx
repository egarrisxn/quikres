"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LinkIcon, Pencil } from "lucide-react";
import { cn, getUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UsernameEditor from "./username-editor";

export type PublishStatuses = "draft" | "live";

export function PreviewBar({
  initialUsername = "",
  prefix = "quikres.vercel.app/",
  status,
  onStatusChange,
  isChangingStatus,
}: {
  initialUsername: string;
  prefix?: string;
  status?: PublishStatuses;
  onStatusChange?: (newStatus: PublishStatuses) => Promise<void>;
  isChangingStatus?: boolean;
}) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleStatusChange = async () => {
    if (onStatusChange) {
      const newStatus = status === "draft" ? "live" : "draft";
      await onStatusChange(newStatus);
    }
  };

  return (
    <>
      <div className='mx-auto flex w-full flex-col items-center justify-between gap-4 py-3 sm:flex-row sm:gap-1'>
        <div className='xs:flex-row xs:gap-1 xs:w-full mx-auto flex flex-col items-center justify-center gap-3 sm:mx-0 sm:justify-start'>
          <div className='xs:gap-0.5 mr-1 flex items-center'>
            <button
              className={cn("size-4", status === "live" && "cursor-pointer")}
              onClick={() => {
                if (!initialUsername || status !== "live") return;
                const portofolioUrl = getUrl(initialUsername);
                navigator.clipboard.writeText(portofolioUrl);
                toast.success("Copied link to your website");
              }}
            >
              <LinkIcon className='text-primary size-3' />
            </button>
            <p className='xs:tracking-tight text-sm md:tracking-normal'>
              {prefix}
            </p>
          </div>
          <div className='rounded-base border-border shadow-base flex w-56 flex-row items-center overflow-hidden border-1 bg-white text-black md:w-72'>
            <span className='w-fit flex-1 truncate border-none bg-transparent px-3 py-1.5 text-sm tracking-tight outline-hidden focus:ring-0 md:tracking-normal'>
              {initialUsername}
            </span>
            <Button
              size='bigIcon'
              variant='outline'
              className='size-9 rounded-none border-none'
              onClick={() => setIsEditorOpen(true)}
            >
              <Pencil className='size-3' />
            </Button>
          </div>
        </div>
        <div className='mx-auto flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              {status === "live" ? (
                <button
                  onClick={() => window.open(getUrl(initialUsername), "_blank")}
                  className='flex items-center gap-1 transition-opacity hover:opacity-80'
                >
                  <div
                    className='relative size-1.5 rounded-full'
                    style={{
                      backgroundColor: "#4CAF50",
                    }}
                  >
                    <div className='absolute inset-0 animate-ping rounded-full bg-green-500 opacity-50' />
                  </div>
                  <p className='text-[.65rem] font-bold text-green-500 uppercase'>
                    {status}
                  </p>
                </button>
              ) : (
                <>
                  <div
                    className='size-1.5 rounded-full'
                    style={{
                      backgroundColor: "#FFEB3B",
                    }}
                  />
                  <p className='text-[.5rem] font-bold text-yellow-600 uppercase'>
                    {status}
                  </p>
                </>
              )}
            </div>
            <Button
              key={status}
              variant={"default"}
              disabled={isChangingStatus}
              onClick={handleStatusChange}
              size='sm'
              className={` ${
                status === "draft"
                  ? "bg-primary text-primary-foreground px-2"
                  : "bg-secondary text-primary px-2"
              }`}
            >
              {isChangingStatus ? (
                <>
                  <span className='mr-1 size-3 animate-spin rounded-full border-2 border-white border-t-transparent'></span>
                </>
              ) : (
                <span className='text-sm'>
                  {status === "draft" ? "Publish" : "Unpublish"}
                </span>
              )}
            </Button>
            {status === "live" && (
              <Button size='sm' className='px-2'>
                <a
                  href={`${getUrl(initialUsername)}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  Visit Site
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <UsernameEditor
        initialUsername={initialUsername}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        prefix={prefix}
      />
    </>
  );
}
