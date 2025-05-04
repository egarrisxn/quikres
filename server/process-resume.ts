import { getResume, storeResume } from "./actions";
import { scrapedResume } from "./scraped-resume";
import { deleteS3File } from "./delete-s3-file";

export async function processResume(userId: string) {
  const resume = await getResume(userId);

  if (!resume || !resume.file?.url) return "upload";

  if (!resume.fileContent) {
    const fileContent = await scrapedResume({
      bucket: resume.file.bucket,
      key: resume.file.key,
    });
    const isContentBad = false;

    if (isContentBad) {
      await deleteS3File({ bucket: resume.file.bucket, key: resume.file.key });
      await storeResume(userId, {
        ...resume,
        file: undefined,
        fileContent: null,
        resumeData: null,
      });

      return "upload";
    }

    await storeResume(userId, {
      ...resume,
      fileContent,
      resumeData: null,
    });
  }

  return "preview";
}
