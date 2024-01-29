import weaviate from "weaviate-ts-client";

export const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});
const schemaConfig = {
  class: "IndianProducts",
  vectorizer: "img2vec-neural",
  vectorIndexType: "hnsw",
  moduleConfig: {
    "img2vec-neural": {
      imageFields: ["image"],
    },
  },
  properties: [
    {
      name: "image",
      dataType: ["blob"],
    },
    {
      name: "text",
      dataType: ["string"],
    },
  ],
};
(async () => {
  await client.schema.classCreator().withClass(schemaConfig).do();
})();
