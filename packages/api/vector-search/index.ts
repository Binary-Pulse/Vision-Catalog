import weaviate from "weaviate-ts-client";

export const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

export * from "./schemaConfig";
export * from "./queries";
export * from "./productMetadata.mutation";
