import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3, defaultBucket } from "./s3";

export async function deleteS3File({
  key,
  bucket = defaultBucket,
}: {
  key: string;
  bucket?: string;
}) {
  if (!bucket) {
    throw new Error(
      "Bucket name not provided and S3_BUCKET_NAME is not defined"
    );
  }

  console.log(`Deleting file ${key} from S3 bucket ${bucket}`);

  try {
    const command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
    await s3.send(command);
    console.log(`File ${key} deleted from S3.`);
    return { success: true };
  } catch (err) {
    console.error("Error deleting file from S3:", err);
    return { success: false, error: "Error deleting file from S3" };
  }
}
