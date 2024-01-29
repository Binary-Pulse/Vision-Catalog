import { writeFileSync } from "fs";
import { client } from ".";
interface ImageMetaDataRetrieverProps {
  className: string;
  image: string;
  fields: string[];
}
export async function ImageMetaDataRetriever({
  className,
  image,
  fields,
}: ImageMetaDataRetrieverProps) {
  const fieldString = fields.join(" ");
  try {
    const res = await client.graphql
      .get()
      .withClassName(className)
      .withFields(fieldString)
      .withNearImage({ image })
      .withLimit(1)
      .do();
    const metadata = res.data.Get.Products[0];
    const m = Object.keys(metadata);
    return metadata;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
