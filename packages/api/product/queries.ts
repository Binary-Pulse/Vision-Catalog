import { Id } from "@repo/db";

export async function GetProductDataForAutoFill(productId: Id) {
  try {
    const res = await db?.product.findFirst({
      where: { id: productId },
      include: {
        brand: true,
        images: true,
        price: true,
        category: true,
        moreDetails: true,
      },
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
export async function GetUserProductList(userId: Id) {
  try {
    const res = await db?.user.findFirst({
      where: { id: userId },
      select: {
        products: {
          select: {
            productName: true,
            price: { select: { ppuCount: true } },
            images: { take: 1 },
            numberOfItems: true,
            EAN: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

export async function GetCompleteProductDataById(id: Id) {
  try {
    const res = await db?.product.findFirst({
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
    return res;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
