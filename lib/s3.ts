import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.S3_UPLOAD_REGION!;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;

if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error("Missing required AWS environment variables");
}

export const s3 = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

export const defaultBucket = process.env.S3_BUCKET_NAME;
