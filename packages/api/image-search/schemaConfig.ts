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

export const sampleProductMetadata = {
  id: "123456",
  productName: "Sample Product",
  description: "This is a sample product description.",
  price: 29.99,
  images: ["image1.jpg", "image2.jpg"],
  inventory: 100,
  colour: "Blue",
  size: "Medium",
  brand: "SampleBrand",
  category: "Electronics",
  weight: 1.5,
  dimensions: "10x5x2 inches",
  sku: "SKU123",
  upc: "012345678912",
  ean: "9876543210987",
  isbn: "978-0-1234-5678-9",
  asin: "B07ABCDEF",
  bulletPoints: ["High-quality material", "Advanced technology", "Easy to use"],
  productGroup: "Electronics",
  searchTerms: ["Sample", "Product", "Electronics"],
  condition: "New",
  itemType: "Single",
  packageDimensions: "12x8x4 inches",
  packageWeight: 2.0,
  shippingWeight: 2.2,
  willShipInternationally: true,
  expeditedShipping: false,
  fulfillmentByAmazon: true,
};

export type ProductMetadataType = {
  id?: string;
  productName?: string;
  description?: string;
  price?: number;
  images?: string[];
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
  "images",
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
