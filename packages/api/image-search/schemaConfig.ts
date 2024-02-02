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
        name: "metadata",
        dataType: ["text"],
      },
    ],
  };
  return schemaConfig;
}

export const sampleProductListForm = {}; // the type of this will be exact type of form

export type ProductMetadataType = {
  productId?: string;
  productName?: string;
  description?: string;
  brand?: string;
  sku?: string;
  upc?: string;
  ean?: string;
  isbn?: string;
  asin?: string;
  searchTerms?: string[];
};

export type metadataType = ProductMetadataType;
