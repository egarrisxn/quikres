import { GetObjectCommand } from "@aws-sdk/client-s3";
import { pdfToText } from "pdf-ts";
import { s3, defaultBucket } from "./s3";

export async function scrapePdf({
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

  const command = new GetObjectCommand({ Bucket: bucket, Key: key });

  try {
    const data = await s3.send(command);

    if (!data.Body) {
      throw new Error("No PDF body received from S3.");
    }

    const chunks: Buffer[] = [];
    for await (const chunk of data.Body as any) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    const text = await pdfToText(new Uint8Array(buffer));
    return text;
  } catch (err) {
    console.error("Error parsing PDF from S3:", err);
    throw new Error("Invalid or inaccessible PDF file.");
  }
}
