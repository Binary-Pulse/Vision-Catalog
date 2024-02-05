import { ProductSearchVectorSchema } from "./schemaConfig";
import { client } from ".";

interface AddProductMetadataByImageProps {
  imageBase64: string;
  metadata: ProductSearchVectorSchema;
  imageClassName: string;
}
export async function addProductMetadataByImage({
  imageBase64,
  metadata,
  imageClassName,
}: AddProductMetadataByImageProps) {
  try {
    const mtd = JSON.stringify(metadata);
    const properties = {
      image: imageBase64,
      metadata: mtd,
    };
    const data = await client.data
      .creator()
      .withClassName(imageClassName)
      .withProperties(properties)
      .do();
    return {
      status: "Success",
      objectId: data.id,
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
  textClassName: string;
}
export async function addProductMetadataByText({
  metadata,
  textClassName,
}: AddProductMetadataByTextProps) {
  try {
    const mtd = JSON.stringify(metadata);
    const properties = {
      metadata: mtd,
    };
    const data = await client.data
      .creator()
      .withClassName(textClassName)
      .withProperties(properties)
      .do();
    return {
      status: "Success",
      objectId: data.id,
    };
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "INTERNAL_SERVER_ERROR- Error adding property",
    );
  }
}
interface AddNewProductMetadataProps {
  imageClassName: string;
  textClassName: string;
  imageBase64: string;
  metadata: ProductSearchVectorSchema;
}
export async function addNewProductMetadata({
  imageBase64,
  imageClassName,
  textClassName,
  metadata,
}: AddNewProductMetadataProps) {
  const imageObject = await addProductMetadataByImage({
    imageClassName,
    imageBase64,
    metadata,
  });
  const textObject = await addProductMetadataByText({
    metadata,
    textClassName,
  });
  return { imageObject, textObject };
}
// Update function for product metadata by image
export async function updateProductMetadataByImage({
  id,
  imageBase64,
  metadata,
  imageClassName,
}: AddProductMetadataByImageProps & { id: string }) {
  try {
    const mtd = JSON.stringify(metadata);
    const properties = {
      image: imageBase64,
      metadata: mtd,
    };
    const data = await client.data
      .merger()
      .withId(id)
      .withClassName(imageClassName)
      .withProperties(properties)
      .do();
    return {
      status: "Success",
    };
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "INTERNAL_SERVER_ERROR- Error updating property",
    );
  }
}

// Update function for product metadata by text
export async function updateProductMetadataByText({
  id,
  metadata,
  textClassName,
}: AddProductMetadataByTextProps & { id: string }) {
  try {
    const mtd = JSON.stringify(metadata);
    const properties = {
      metadata: mtd,
    };
    await client.data
      .merger()
      .withId(id)
      .withClassName(textClassName)
      .withProperties(properties)
      .do();
    return {
      status: "Success",
    };
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "INTERNAL_SERVER_ERROR- Error updating property",
    );
  }
}
interface UpdateProductMetadataProps {
  imageClassName: string;
  textClassName: string;
  vectorTextObjId: string;
  vectorImageObjId: string;
  metadata: ProductSearchVectorSchema;
  imageBase64: string;
}
export async function updateProductMetadata({
  imageClassName,
  textClassName,
  vectorTextObjId,
  vectorImageObjId,
  metadata,
  imageBase64,
}: UpdateProductMetadataProps) {
  try {
    await updateProductMetadataByImage({
      imageClassName,
      id: vectorImageObjId,
      metadata,
      imageBase64,
    });
    await updateProductMetadataByText({
      textClassName,
      id: vectorTextObjId,
      metadata,
    });
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "INTERNAL_SERVER_ERROR - error updating product Metadata",
    );
  }
}
