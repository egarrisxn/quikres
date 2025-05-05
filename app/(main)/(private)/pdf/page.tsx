import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getResume, storeResume } from "@/lib/actions";
import { scrapePdf } from "@/lib/scrapePdf";
import { deleteS3File } from "@/lib/deleteFile";
import LoadingFallback from "@/components/loading-fallback";

export async function ProcessPdf({ userId }: { userId: string }) {
  const resume = await getResume(userId);

  if (!resume || !resume.file || !resume.file.url) redirect("/upload");

  if (!resume.fileContent) {
    const fileContent = await scrapePdf({
      bucket: resume.file.bucket,
      key: resume.file.key,
    });

    const isContentBad = false;

    if (isContentBad) {
      await deleteS3File({
        bucket: resume.file.bucket,
        key: resume.file.key,
      });

      await storeResume(userId, {
        ...resume,
        file: undefined,
        fileContent: null,
        resumeData: null,
      });

      redirect("/upload");
    }

    await storeResume(userId, {
      ...resume,
      fileContent: fileContent,
      resumeData: null,
    });
  }

  redirect("/preview");
  return <></>;
}

export default async function Pdf() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <>
      <Suspense
        fallback={
          <LoadingFallback message='Reading your resume carefully...' />
        }
      >
        <ProcessPdf userId={userId} />
      </Suspense>
    </>
  );
}
