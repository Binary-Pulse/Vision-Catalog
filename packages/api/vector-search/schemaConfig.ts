import { SEARCH_BY_IMAGE_CLASS, SEARCH_BY_TEXT_CLASS } from "@repo/utils";

export const imageSchemaConfig = {
  class: SEARCH_BY_IMAGE_CLASS,
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

export const textSchemaConfig = {
  class: SEARCH_BY_TEXT_CLASS,
  vectorizer: "text2vec-palm",
  vectorIndexType: "hnsw",
  moduleConfig: {
    "text2vec-palm": {},
  },
  properties: [
    {
      name: "metadata",
      dataType: ["text"],
    },
  ],
};

export const sampleProductListForm = {}; // the type of this will be exact type of form
export type ProductListFormSchema = typeof sampleProductListForm;
export type ProductSearchVectorSchema = {
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
