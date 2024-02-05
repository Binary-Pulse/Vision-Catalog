import { ProductSearchVectorType, client } from ".";

interface ImageVectorMetadataRetrieverProps {
  className: string;
  image: string;
}
export async function ImageVectorMetadataRetriever({
  className,
  image,
}: ImageVectorMetadataRetrieverProps) {
  try {
    const res = await client.graphql
      .get()
      .withClassName(className)
      .withFields("metadata")
      .withNearImage({ image })
      // .withLimit(1)
      .do();
    const responseArray = res.data.Get[className] as string[];
    const metadataArray: ProductSearchVectorType[] = responseArray.map(
      (response) => JSON.parse(response),
    );
    return metadataArray;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
interface TextVectorMetadataRetrieverProps {
  className: string;
  text: string;
}
export async function TextVectorMetadataRetriever({
  className,
  text,
}: TextVectorMetadataRetrieverProps) {
  try {
    const res = await client.graphql
      .get()
      .withClassName(className)
      .withFields("metadata")
      .withNearText({ concepts: [text] })
      // .withLimit(1)
      .do();
    const responseArray = res.data.Get[className] as string[];
    const metadataArray: ProductSearchVectorType[] = responseArray.map(
      (response) => JSON.parse(response),
    );
    return metadataArray;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
