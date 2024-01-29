import { WeaviateClient } from "weaviate-ts-client";
import { metadataType } from ".";

interface AddPropertiesProps {
  client: WeaviateClient;
  image: string;
  metadata: metadataType;
  className: string;
}
export async function addProperties({
  client,
  className,
  image,
  metadata,
}: AddPropertiesProps) {
  try {
    const properties = {
      image: image,
      productName: metadata.productName,
      price: metadata.price,
      brand: metadata.brand,
    } as metadataType;
    const res = await client.data
      .creator()
      .withClassName(className)
      .withProperties(properties)
      .do();
    // console.log(res.properties);
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "INTERNAL_SERVER_ERROR- Error adding property",
    );
  }
}
