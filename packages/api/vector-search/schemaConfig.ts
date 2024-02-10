import { SEARCH_BY_IMAGE_CLASS, SEARCH_BY_TEXT_CLASS } from "@repo/utils";
import { z } from "zod";

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

export const ProductSearchVectorSchema = z.object({
  productId: z.string(),
  productName: z.string().nullable(),
  description: z.string().nullable().optional(),
  primaryImageUrl: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
  upc: z.string().nullable().optional(),
  ean: z.string().nullable().optional(),
  isbn: z.string().nullable().optional(),
  searchTerms: z.array(z.string()).nullable().optional(),
  category: z.string().nullable().optional(),
  pricePerUnit: z.number(),
  currency: z.enum(["USD", "INR"]),
});

export type ProductSearchVectorType = z.infer<typeof ProductSearchVectorSchema>;
