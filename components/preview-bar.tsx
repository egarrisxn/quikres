"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LinkIcon, Pencil } from "lucide-react";
import { cn, getUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UsernameEditorView from "./username-editor";

export type PublishStatuses = "draft" | "live";

export default function PreviewBar({
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
      // Toggle the status
      const newStatus = status === "draft" ? "live" : "draft";
      await onStatusChange(newStatus);
    }
  };

  return (
    <>
      <div className='flex w-full flex-col items-center justify-between gap-4 py-3 sm:flex-row sm:gap-1'>
        <div className='flex w-full flex-col items-center gap-4 sm:flex-row sm:gap-1'>
          <div className='mr-1 flex items-center gap-1'>
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
            <p className='text-sm'>{prefix}</p>
          </div>
          <div className='rounded-base border-input text-foreground dark:text-background flex w-full flex-row items-center overflow-hidden bg-white md:w-80'>
            <span className='w-fit flex-1 truncate border-none bg-transparent px-3 py-2 text-sm outline-hidden focus:ring-0'>
              {initialUsername}
            </span>
            <Button
              size='icon'
              variant='outline'
              className='rounded-none border-none'
              onClick={() => setIsEditorOpen(true)}
            >
              <Pencil className='size-3' />
            </Button>
          </div>
        </div>

        <div className='flex items-center gap-4'>
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
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-primary"
              }`}
            >
              {isChangingStatus ? (
                <>
                  <span className='mr-2 size-3 animate-spin rounded-full border-2 border-white border-t-transparent'></span>
                </>
              ) : (
                <span className='text-sm'>
                  {status === "draft" ? "Publish" : "Unpublish"}
                </span>
              )}
            </Button>
            {status === "live" && (
              <Button size='sm'>
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

      <UsernameEditorView
        initialUsername={initialUsername}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        prefix={prefix}
      />
    </>
  );
}
