import { Id } from "@repo/db";
import {
  SEARCH_BY_IMAGE_CLASS,
  SEARCH_BY_TEXT_CLASS,
  imageURLToBase64,
} from "@repo/utils";
import {
  ProductSearchVectorSchema,
  addNewProductMetadata,
} from "../vector-search";

export async function addMetadataToVectorDB(productId: Id) {
  const product = await db?.product.findFirstOrThrow({
    where: { id: productId },
    include: {
      brand: { select: { name: true } },
      category: { select: { name: true } },
      images: { select: { primaryImageUrl: true } },
      price: { select: { currency: true, ppu: true } },
    },
  });
  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }
  const primaryImageUrl = product?.images?.primaryImageUrl;
  const currency = product?.price?.currency as "INR" | "USD";
  const pricePerUnit = product?.price?.ppu as number;
  const metadata: ProductSearchVectorSchema = {
    productId: productId,

    productName: product.productName,
    description: product.description,
    ean: product.EAN,
    isbn: product.ISBN,
    sku: product.SKU,
    searchTerms: product.searchTerms,
    upc: product.UPC,

    brand: product?.brand?.name,
    category: product?.category?.name,

    primaryImageUrl,
    currency,
    pricePerUnit,
  };
  const imageBase64 = await imageURLToBase64(
    product.images?.primaryImageUrl as string,
  );
  const vectorProductMetadataResponse = await addNewProductMetadata({
    imageBase64,
    imageClassName: SEARCH_BY_IMAGE_CLASS,
    textClassName: SEARCH_BY_TEXT_CLASS,
    metadata,
  });
  return vectorProductMetadataResponse;
}
