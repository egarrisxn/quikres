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
    <div className='flex flex-1 flex-col items-center gap-6 px-4 py-12'>
      <div className='w-full max-w-[27.5rem] text-center'>
        <h1 className='pb-6'>
          Upload a PDF of your resume to generate your personal site. You may
          modify your site before publishing it.
        </h1>
        <div className='relative mx-2.5'>
          {fileState.status !== "empty" && (
            <button
              onClick={handleReset}
              className='hover:bg-hover absolute top-2 right-2 z-10 rounded-full p-1'
              disabled={isUpdating}
            >
              <X className='size-4 text-gray-500' />
            </button>
          )}

          <Dropzone
            accept={{ "application/pdf": [".pdf"] }}
            maxFiles={1}
            icon={
              fileState.status !== "empty" ? (
                <FileCheck2 className='size-6 text-gray-600' />
              ) : (
                <Upload className='size-6 text-gray-600' />
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
              <span className='text-center text-xs font-light text-gray-500'>
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
      </div>
      <div className=''>
        <div className='relative'>
          <Button
            className='h-auto px-4 py-3'
            disabled={fileState.status === "empty" || isUpdating}
            onClick={() => router.push("/pdf")}
          >
            {isUpdating ? (
              <>
                <Spinner className='mr-2 size-5' />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className='mr-2 size-5' />
                Generate Website
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
    </div>
  );
}
