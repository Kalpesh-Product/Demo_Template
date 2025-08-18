import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { config } from "dotenv";

config();

const s3Client = new S3Client({
  region: process.env.PROJECT_AWS_REGION,
  credentials: {
    accessKeyId: process.env.PROJECT_AWS_ACCESS_KEY,
    secretAccessKey: process.env.PROJECT_AWS_SECRET_KEY,
  },
});

export async function uploadFileToS3(route, file) {
  try {
    const uploadParams = {
      Bucket: process.env.PROJECT_S3_BUCKET_NAME,
      Key: route,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
    const fileUrl = `https://${process.env.PROJECT_S3_BUCKET_NAME}.s3.${process.env.PROJECT_AWS_REGION}.amazonaws.com/${route}`;
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteFileFromS3ByUrl(fileUrl) {
  const urlObj = new URL(fileUrl);
  const key = decodeURIComponent(urlObj.pathname.slice(1));

  // Step 2: Prepare and send the delete command
  const deleteParams = {
    Bucket: process.env.PROJECT_S3_BUCKET_NAME,
    Key: key,
  };

  const command = new DeleteObjectCommand(deleteParams);
  await s3Client.send(command);

  return { success: true, message: "File deleted successfully" };
}
