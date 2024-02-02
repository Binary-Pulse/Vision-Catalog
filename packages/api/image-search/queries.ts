import { ProductSearchVectorSchema, client } from ".";

interface ImageProductVectorRetrieverProps {
  className: string;
  image: string;
}
export async function ImageProductVectorRetriever({
  className,
  image,
}: ImageProductVectorRetrieverProps) {
  try {
    const res = await client.graphql
      .get()
      .withClassName(className)
      .withFields("metadata")
      .withNearImage({ image })
      // .withLimit(1)
      .do();
    const responseArray = res.data.Get[className] as string[];
    const metadataArray: ProductSearchVectorSchema[] = responseArray.map(
      (response) => JSON.parse(response),
    );
    return metadataArray;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
