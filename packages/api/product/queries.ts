import { ProductIdType, productIdZodSchema } from "@repo/db/schema/product";

export async function GetProductDetailsForList(id: ProductIdType) {
  try {
    productIdZodSchema.parse(id);
    const prouctDetailsForListing = await db?.product.findFirst({
      where: { id },
      include: { brand: true, images: { take: 1 }, price: true },
    });
    return prouctDetailsForListing;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

export async function GetCompleteProductDataById(id: ProductIdType) {
  try {
    productIdZodSchema.parse(id);
    const completeProductInfo = await db?.product.findFirst({
      where: { id },
      include: {
        brand: true,
        images: true,
        price: true,
        moreDetails: true,
        user: true,
        variants: true,
      },
    });
    return completeProductInfo;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
