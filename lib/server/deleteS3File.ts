import AWS from "aws-sdk";

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

export async function deleteS3File({
  key,
  bucket = defaultBucket,
}: {
  bucket?: string;
  key: string;
}) {
  if (!bucket) {
    throw new Error(
      "Bucket name not provided and S3_BUCKET_NAME is not defined"
    );
  }

  console.log(`Deleting file ${key} from S3 bucket ${bucket}`);

  try {
    await s3.deleteObject({ Bucket: bucket, Key: key }).promise();
    console.log(`File ${key} deleted from S3.`);
    return { success: true };
  } catch (err) {
    console.error("Error deleting file from S3:", err);
    return { success: false, error: "Error deleting file from S3" };
  }
}

// import AWS from 'aws-sdk'

// AWS.config.update({
//   region: process.env.S3_UPLOAD_REGION!!,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!!,
//   },
// })

// export const deleteS3File = async ({
//   bucket,
//   key,
// }: {
//   bucket: string
//   key: string
// }) => {
//   const s3 = new AWS.S3()
//   const bucketName = process.env.S3_BUCKET_NAME

//   const params = { Bucket: bucket, Key: key }

//   console.log(`Deleting file ${key} from S3.`)

//   await s3.deleteObject(params).promise()

//   console.log(`File ${key} deleted from S3.`)

//   return { success: true }
// }
