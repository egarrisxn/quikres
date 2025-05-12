"use client";

import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { FileUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

interface DropzoneProps extends Omit<DropzoneOptions, "disabled"> {
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  isUploading?: boolean;
}

export function Dropzone({
  className,
  disabled = false,
  icon,
  title,
  description,
  isUploading = false,
  ...props
}: DropzoneProps) {
  const [files, setFiles] = React.useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: disabled || isUploading,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    ...props,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "rounded-base border-primary relative flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed p-16 text-center transition-colors",
        isDragActive && "border-primary bg-secondary/5",
        (disabled || isUploading) && "cursor-not-allowed opacity-60",
        className
      )}
    >
      <input {...getInputProps()} />

      {isDragActive && (
        <div className='bg-secondary/80 absolute inset-0 z-10 flex items-center justify-center'>
          <div className='animate-bounce p-4'>
            <FileUp className='text-primary size-16' />
          </div>
        </div>
      )}

      {isUploading && (
        <div className='bg-secondary/80 absolute inset-0 z-10 flex items-center justify-center'>
          <Spinner className='size-12' />
        </div>
      )}

      {files.length > 0 ? (
        <div className='flex flex-col items-center gap-2'>
          <div className='rounded-base bg-secondary/80 p-3'>{icon}</div>
          <div className='font-base mt-2 text-lg'>{files[0].name}</div>
          <p className='text-secondary-foreground/80 text-sm'>
            {(files[0].size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      ) : (
        <>
          <div className='rounded-base bg-secondary/80 p-3'>{icon}</div>
          <h2 className='font-base mt-2 text-lg'>{title}</h2>
          <p className='text-secondary-foreground/80 text-sm'>{description}</p>
        </>
      )}
    </div>
  );
}
