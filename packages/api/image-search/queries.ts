import { client } from ".";
import { MetadataKeysArray, metadataType } from "./schemaConfig";
interface ImageMetaDataRetrieverProps {
  className: string;
  image: string;
  fields: MetadataKeysArray;
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
    const response = res.data.Get[className][0] as metadataType;
    return response;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
