export function genSchema(className: string) {
  const schemaConfig = {
    class: className,
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
        dataType: ["text"],
        name: "productName",
      },
      {
        dataType: ["text"],
        name: "brand",
      },
      {
        dataType: ["number"],
        name: "price",
      },
    ],
  };
  return schemaConfig;
}
