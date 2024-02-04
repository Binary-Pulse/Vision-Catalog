import { Id } from "@repo/db";

export async function GetProductDetailsForList(id: Id) {
  try {
    const prouctDetailsForListing = await db?.product.findFirst({
      where: { id },
      include: {
        brand: true,
        images: { take: 1 },
        price: true,
        category: true,
      },
    });
    return prouctDetailsForListing;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

export async function GetCompleteProductDataById(id: Id) {
  try {
    const completeProductInfo = await db?.product.findFirst({
      where: { id },
      include: {
        brand: true,
        images: true,
        price: true,
        moreDetails: true,
        category: true,
        variant: true,
      },
    });
    return completeProductInfo;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
