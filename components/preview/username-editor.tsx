"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useUserActions } from "@/hooks/use-user-actions";
import { useIsMobile } from "@/hooks/use-mobile";
import { MAX_USERNAME_LENGTH } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";

function UsernameContent({
  initialUsername,
  onClose,
}: {
  initialUsername: string;
  onClose: () => void;
  prefix?: string;
}) {
  const [newUsername, setNewUsername] = useState<string>(initialUsername);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { updateUsernameMutation, checkUsernameMutation } = useUserActions();

  const isInitialUsername = newUsername === initialUsername;

  useEffect(() => {
    setNewUsername(initialUsername);
  }, [initialUsername]);

  useEffect(() => {
    if (!isInitialUsername && newUsername) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        checkUsernameMutation.mutateAsync(newUsername);
      }, 500);
    }
  }, [newUsername, isInitialUsername, checkUsernameMutation]);

  const isValid =
    /^[a-zA-Z0-9-]+$/.test(newUsername) &&
    newUsername.length > 0 &&
    newUsername !== initialUsername &&
    ((isInitialUsername || checkUsernameMutation.data?.available) ?? false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/[^a-zA-Z0-9-]/g, "")
      .slice(0, MAX_USERNAME_LENGTH);
    setNewUsername(value);
  };

  const handleSave = async () => {
    try {
      await updateUsernameMutation.mutateAsync(newUsername);
      toast.success("Username updated successfully");
      onClose();
    } catch (error) {
      console.error("Username update failed:", error);
      toast.error("Failed to update username");
    }
  };

  return (
    <div className='flex flex-col gap-4 py-4'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='current-username'>Current Username</Label>
        <div className='border-input rounded-base w-full overflow-hidden border-[0.5px] bg-white'>
          <input
            id='current-username'
            type='text'
            value={initialUsername}
            disabled
            className='w-full cursor-not-allowed border-none bg-transparent p-3 text-sm text-neutral-500 outline-hidden focus:ring-0'
          />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='new-username'>New Username</Label>
        <div className='border-input rounded-base w-full overflow-hidden border-[0.5px] bg-white'>
          <div className='flex items-center'>
            <input
              id='new-username'
              type='text'
              value={newUsername}
              onChange={handleUsernameChange}
              maxLength={MAX_USERNAME_LENGTH}
              placeholder='Enter new username'
              className='w-full border-none bg-transparent p-3 text-sm outline-hidden focus:ring-0'
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  isValid &&
                  !checkUsernameMutation.isPending
                ) {
                  handleSave();
                }
              }}
            />
            <div className='pr-3'>
              {isInitialUsername ? (
                <></>
              ) : checkUsernameMutation.isPending ? (
                <div className='border-t-primary border-input size-4 animate-spin rounded-full border-2' />
              ) : isValid ? (
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M20 6L9 17L4 12'
                    stroke='#009505'
                    strokeWidth='1.3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              ) : (
                <X className='size-5 text-[#950000]' />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-2'>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          disabled={!isValid || updateUsernameMutation.isPending}
        >
          {updateUsernameMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default function UsernameEditor({
  initialUsername,
  isOpen,
  onClose,
  prefix = "quikres.vercep.app/",
}: {
  initialUsername: string;
  isOpen: boolean;
  onClose: () => void;
  prefix?: string;
}) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-[425px]'>
          <VisuallyHidden asChild>
            <DialogTitle id='edit-username-title'>Edit Username</DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <DialogDescription id='edit-username-description'>
              This is where you can edit your username.
            </DialogDescription>
          </VisuallyHidden>
          <UsernameContent
            initialUsername={initialUsername}
            onClose={onClose}
            prefix={prefix}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <VisuallyHidden asChild>
          <DrawerTitle id='edit-username-title'>Edit Username</DrawerTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DrawerDescription id='edit-username-description'>
            This is where you can edit your username.
          </DrawerDescription>
        </VisuallyHidden>
        <UsernameContent
          initialUsername={initialUsername}
          onClose={onClose}
          prefix={prefix}
        />
      </DrawerContent>
    </Drawer>
  );
}
