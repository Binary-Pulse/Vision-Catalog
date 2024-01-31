import { URLOrB64ToB64 } from "@repo/utils";
import { client } from ".";
import { MetadataKeysArray, metadataType } from "./schemaConfig";

interface ImageMetaDataRetrieverProps {
  className: string;
  imageBase64?: string;
  imageURL?: string;
  fields: MetadataKeysArray;
}
export async function ImageMetaDataRetriever({
  className,
  imageBase64,
  imageURL,
  fields,
}: ImageMetaDataRetrieverProps) {
  const fieldString = fields.join(" ");
  const image = await URLOrB64ToB64({ imageBase64, imageURL });
  try {
    const res = await client.graphql
      .get()
      .withClassName(className)
      .withFields(fieldString)
      .withNearImage({ image })
      .withLimit(1)
      .do();
    const response = res.data.Get[className][0] as metadataType;
    return response;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
