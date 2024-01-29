import { genSchema, metadataType } from "./schemaConfig";
import { client } from ".";

interface classCreatorProps {
  className: string;
}
export async function classCreator({ className }: classCreatorProps) {
  try {
    const schema = genSchema(className);
    // todo save the className in db using prisma
    const data = await client.schema.classCreator().withClass(schema).do();
    return { msg: "Class created successfuly", data };
  } catch (error) {
    throw new Error(
      (error as Error).message ?? "INTERNAL_SERVER_ERROR- Error creating Class",
    );
  }
}

interface AddPropertiesProps {
  image: string;
  metadata: metadataType;
  className: string;
}
export async function addProperties({
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
    const data = await client.data
      .creator()
      .withClassName(className)
      .withProperties(properties)
      .do();
    return {
      msg: "Image and Metadata added to the vector database successfuly",
      data,
    };
  } catch (error) {
    throw new Error(
      (error as Error).message ??
        "INTERNAL_SERVER_ERROR- Error adding property",
    );
  }
}
