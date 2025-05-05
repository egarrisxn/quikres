"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileCheck2, Sparkles, Upload, X } from "lucide-react";
import { useUserActions } from "@/hooks/use-user-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/ui/dropzone";
import { Spinner } from "@/components/spinner";
import LoadingFallback from "@/components/loading-fallback";

type FileState =
  | { status: "empty" }
  | { status: "saved"; file: { name: string; url: string; size: number } };

export default function UploadClient() {
  const router = useRouter();

  const { resumeQuery, uploadResumeMutation } = useUserActions();
  const [fileState, setFileState] = useState<FileState>({ status: "empty" });

  const resume = resumeQuery.data?.resume;

  // Update fileState whenever resume changes
  useEffect(() => {
    if (resume?.file?.url && resume.file.name && resume.file.size) {
      setFileState({
        status: "saved",
        file: {
          name: resume.file.name,
          url: resume.file.url,
          size: resume.file.size,
        },
      });
    }
  }, [resume]);

  const handleUploadFile = async (file: File) => {
    uploadResumeMutation.mutate(file);
  };

  const handleReset = () => {
    setFileState({ status: "empty" });
  };

  if (resumeQuery.isLoading) {
    return <LoadingFallback message='Loading...' />;
  }

  const isUpdating = resumeQuery.isPending || uploadResumeMutation.isPending;

  return (
    <section className='grid min-h-[80dvh] w-full place-items-center'>
      <div className='max-w-lg space-y-6 py-8 text-center lg:pt-0 lg:pb-16 xl:pb-24 2xl:pb-56'>
        <h1 className='font-base px-4 text-base sm:px-6 lg:px-8 2xl:px-10'>
          Upload a PDF of your resume to generate your personal site. You may
          modify your site before publishing it.
        </h1>
        <div className='relative mx-2.5'>
          {fileState.status !== "empty" && (
            <button
              onClick={handleReset}
              className='absolute top-2 right-2 z-10 p-1'
              disabled={isUpdating}
            >
              <X className='text-secondary-foreground/60 hover:text-destructive/60 size-4' />
            </button>
          )}

          <Dropzone
            accept={{ "application/pdf": [".pdf"] }}
            maxFiles={1}
            icon={
              fileState.status !== "empty" ? (
                <FileCheck2 className='text-secondary-foreground/80 size-6' />
              ) : (
                <Upload className='text-secondary-foreground/80 size-6' />
              )
            }
            title={
              <span className='text-center text-base font-bold'>
                {fileState.status !== "empty"
                  ? fileState.file.name
                  : "Upload Resume"}
              </span>
            }
            description={
              <span className='text-secondary-foreground/60 text-center text-xs font-light'>
                {fileState.status !== "empty"
                  ? `${(fileState.file.size / 1024 / 1024).toFixed(2)} MB`
                  : "Must be in PDF format"}
              </span>
            }
            isUploading={uploadResumeMutation.isPending}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles[0]) handleUploadFile(acceptedFiles[0]);
            }}
            onDropRejected={() => toast.error("Only PDF files are supported")}
          />
        </div>

        <div className='relative'>
          <Button
            size='default'
            className='h-10 px-4 py-2.5 2xl:h-11 2xl:px-6 2xl:py-3 2xl:text-xl'
            disabled={fileState.status === "empty" || isUpdating}
            onClick={() => router.push("/pdf")}
          >
            {isUpdating ? (
              <>
                <Spinner className='mr-1' />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className='mr-0.5' />
                Generate Now!
              </>
            )}
          </Button>
          {fileState.status === "empty" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className='absolute inset-0' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload your PDF to begin</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </section>
  );
}
