import { ProductSearchVectorSchema } from "./schemaConfig";
import { client } from ".";

interface AddProductMetadataByImageProps {
  imageBase64?: string;
  metadata: ProductSearchVectorSchema;
  className: string;
}
export async function addProductMetadataByImage({
  imageBase64,
  metadata,
  className,
}: AddProductMetadataByImageProps) {
  try {
    const mtd = JSON.stringify(metadata);
    const properties = {
      image: imageBase64,
      metadata: mtd,
    };
    const data = await client.data
      .creator()
      .withClassName(className)
      .withProperties(properties)
      .do();
    return {
      msg: "Image and Metadata JSON string added to the vector database successfuly",
      data,
    };
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "INTERNAL_SERVER_ERROR- Error adding property",
    );
  }
}
interface AddProductMetadataByTextProps {
  metadata: ProductSearchVectorSchema;
  className: string;
}
export async function addProductMetadataByText({
  metadata,
  className,
}: AddProductMetadataByTextProps) {
  try {
    const mtd = JSON.stringify(metadata);
    const properties = {
      metadata: mtd,
    };
    const data = await client.data
      .creator()
      .withClassName(className)
      .withProperties(properties)
      .do();
    return {
      msg: "Image and Metadata JSON string added to the vector database successfuly",
      data,
    };
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "INTERNAL_SERVER_ERROR- Error adding property",
    );
  }
}

// Update function for product metadata by image
export async function updateProductMetadataByImage(
  id: string,
  { imageBase64, metadata, className }: AddProductMetadataByImageProps,
) {
  try {
    const mtd = JSON.stringify(metadata);
    const properties = {
      image: imageBase64,
      metadata: mtd,
    };
    const data = await client.data
      .merger()
      .withId(id)
      .withClassName(className)
      .withProperties(properties)
      .do();
    return {
      msg: "Image and Metadata JSON string updated in the vector database successfully",
      data,
    };
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "INTERNAL_SERVER_ERROR- Error updating property",
    );
  }
}

// Update function for product metadata by text
export async function updateProductMetadataByText(
  id: string,
  { metadata, className }: AddProductMetadataByTextProps,
) {
  try {
    const mtd = JSON.stringify(metadata);
    const properties = {
      metadata: mtd,
    };
    const data = await client.data
      .merger()
      .withId(id)
      .withClassName(className)
      .withProperties(properties)
      .do();
    return {
      msg: "Metadata JSON string updated in the vector database successfully",
      data,
    };
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "INTERNAL_SERVER_ERROR- Error updating property",
    );
  }
}
