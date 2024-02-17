import { readFileSync } from "fs";
import { z } from "zod";

export function imageBufferToBase64(img: Buffer) {
  const imgBufferString = Buffer.from(img).toString("base64");
  return imgBufferString;
}

export async function imageURLToBase64(imgUrl: string) {
  const urlSchema = z.string().url();
  try {
    const url = urlSchema.parse(imgUrl);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = response.headers.get("content-type");
    const imageBase64 = `data:${mimeType};base64,${buffer.toString("base64")}`;
    return imageBase64;
  } catch (error) {
    console.error(`Error converting image URL to base64: ${error}`);
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

export function getImageBufferByPath(path: string) {
  try {
    const imgBuffer = readFileSync(path);
    return imgBuffer;
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "ERROR CONVERTING IMAGE TO BUFFER, please check path",
    );
  }
}

export function imagePathToBase64(path: string) {
  const buffer = getImageBufferByPath(path);
  const base64 = imageBufferToBase64(buffer);
  return base64;
}

interface URLOrB64ToB64Props {
  imageURL?: string;
  imageBase64?: string;
}
export async function URLOrB64ToB64({
  imageURL,
  imageBase64,
}: URLOrB64ToB64Props) {
  if (imageBase64) {
    return imageBase64;
  } else if (imageURL) {
    return await imageURLToBase64(imageURL);
  } else {
    throw new Error("Please provide either imageBase64 string or imageURL");
  }
}
