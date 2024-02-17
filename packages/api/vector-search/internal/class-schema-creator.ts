import { client } from "..";
import { imageSchemaConfig, textSchemaConfig } from "../schemaConfig";

export async function imageSearchClassCreator() {
  try {
    const data = await client.schema
      .classCreator()
      .withClass(imageSchemaConfig)
      .do();
    return { msg: "Image Class created successfuly", data };
  } catch (error) {
    throw new Error(
      (error as Error).message ?? "INTERNAL_SERVER_ERROR- Error creating Class",
    );
  }
}

export async function textSearchClassCreator() {
  try {
    const data = await client.schema
      .classCreator()
      .withClass(textSchemaConfig)
      .do();
    return { msg: "Text Class created successfuly", data };
  } catch (error) {
    console.log(error);
    throw new Error(
      (error as Error).message ?? "INTERNAL_SERVER_ERROR- Error creating Class",
    );
  }
}
