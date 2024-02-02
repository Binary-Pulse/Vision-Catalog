import { client } from ".";
import { ProductMetadataType } from "./schemaConfig";

interface ImageMetaDataRetrieverProps {
  className: string;
  image: string;
}
export async function ImageMetaDataRetriever({
  className,
  image,
}: ImageMetaDataRetrieverProps) {
  try {
    const res = await client.graphql
      .get()
      .withClassName(className)
      .withFields("metadata")
      .withNearImage({ image })
      .withLimit(1)
      .do();
    const response = res.data.Get[className][0] as string;
    const metadata = JSON.parse(response) as ProductMetadataType;
    return metadata;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
