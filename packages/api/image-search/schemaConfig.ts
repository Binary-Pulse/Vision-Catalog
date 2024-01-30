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

export type ProductMetadataType = {
  id: string;
  productName: string;
  description?: string;
  price: number;
  image?: string;
  inventory: number;
  colour?: string;
  size?: string;
  brand?: string;
  category?: string;
  weight?: number;
  dimensions?: string;
  sku?: string;
  upc?: string;
  ean?: string;
  isbn?: string;
  asin?: string;
  bulletPoints?: string[];
  productGroup?: string;
  searchTerms?: string[];
  condition?: string;
  itemType?: string;
  packageDimensions?: string;
  packageWeight?: number;
  shippingWeight?: number;
  willShipInternationally?: boolean;
  expeditedShipping?: boolean;
  fulfillmentByAmazon?: boolean;
};

const metadataArray: (keyof ProductMetadataType)[] = [
  "asin",
  "brand",
  "bulletPoints",
  "category",
  "colour",
  "condition",
  "description",
  "dimensions",
  "ean",
  "expeditedShipping",
  "fulfillmentByAmazon",
  "id",
  "image",
  "inventory",
  "isbn",
  "itemType",
  "packageDimensions",
  "packageWeight",
  "price",
  "productGroup",
  "productName",
  "searchTerms",
  "shippingWeight",
  "size",
  "sku",
  "upc",
  "weight",
  "willShipInternationally",
] as const;

export type metadataType = ProductMetadataType;

export type MetadataKeysArray = typeof metadataArray;
