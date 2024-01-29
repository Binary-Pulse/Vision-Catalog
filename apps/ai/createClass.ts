import { WeaviateClient } from "weaviate-ts-client";
import { genSchema } from "./schemaConfig";
interface classCreatorProps {
  client: WeaviateClient;
  className: string;
}
export async function classCreator({ client, className }: classCreatorProps) {
  try {
    const schema = genSchema(className);

    await client.schema.classCreator().withClass(schema).do();
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
