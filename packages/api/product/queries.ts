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
    const res = await db?.user.findFirstOrThrow({
      where: { id: userId },
      select: {
        products: {
          select: {
            productName: true,
            price: { select: { ppu: true, currency: true } },
            images: { select: { primaryImageUrl: true } },
            numberOfItems: true,
            status: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
