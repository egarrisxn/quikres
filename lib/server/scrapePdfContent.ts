import AWS from "aws-sdk";
import { pdfToText } from "pdf-ts";

if (
  !process.env.S3_UPLOAD_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY
) {
  throw new Error("Missing required AWS environment variables");
}

AWS.config.update({
  region: process.env.S3_UPLOAD_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3 = new AWS.S3();
const defaultBucket = process.env.S3_BUCKET_NAME;

export async function scrapePdfContent({
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

  try {
    const data = await s3.getObject({ Bucket: bucket, Key: key }).promise();

    if (!data.Body) {
      throw new Error("No PDF body received from S3.");
    }

    const text = await pdfToText(new Uint8Array(data.Body as Buffer));
    return text;
  } catch (err) {
    console.error("Error parsing PDF from S3:", err);
    throw new Error("Invalid or inaccessible PDF file.");
  }
}
