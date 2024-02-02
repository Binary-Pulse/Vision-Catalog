import { genSchema, metadataType } from "./schemaConfig";
import { client } from ".";
import { URLOrB64ToB64 } from "@repo/utils";

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
  imageURL?: string;
  imageBase64?: string;
  metadata: metadataType;
  className: string;
}
export async function addProperties({
  className,
  imageURL,
  imageBase64,
  metadata,
}: AddPropertiesProps) {
  const image = await URLOrB64ToB64({ imageBase64, imageURL });
  try {
    const mtd = JSON.stringify(metadata);
    const properties = {
      image: image,
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
