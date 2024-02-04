import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: ""
  }
});

async function getObjectURL(key: string) {
  const command = new GetObjectCommand({
    Bucket: "code-my-uploads",
    Key: key
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}

async function putObject(filename: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: "code-my-uploads",
    Key: `uploads/user-uploads/${filename}`,
    ContentType: contentType
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}
