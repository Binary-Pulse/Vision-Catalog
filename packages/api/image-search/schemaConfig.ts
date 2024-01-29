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

// dont use objects
const metadata = {
  productName: "Andhra Avakkai Pickle",
  price: 200,
  brand: "SRI GANESHRAM'S 777 BRAND",
  // etc
};

export type metadataType = typeof metadata;

export type MetadataFields = keyof typeof metadata;

export const metadataKeys = Object.keys(metadata) as MetadataFields[];

export type MetadataKeysArray = typeof metadataKeys;
