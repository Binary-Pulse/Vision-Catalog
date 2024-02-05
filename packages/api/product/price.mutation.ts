import { AddPriceParamsType, Id } from "@repo/db";

interface AddPriceToProductProps {
  productId: Id;
  priceData: AddPriceParamsType;
}
export async function AddPriceToProduct({
  productId,
  priceData,
}: AddPriceToProductProps) {
  try {
    await db?.price.create({
      data: { ...priceData, product: { connect: { id: productId } } },
    });
    return { msg: "Price Added Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

export async function UpdatePriceToProduct({
  productId,
  priceData,
}: AddPriceToProductProps) {
  try {
    const existingPrice = await db?.price.findUnique({
      where: { productId: productId },
    });

    if (!existingPrice) {
      throw new Error("PRODUCT_PRICE_NOT_FOUND");
    }

    await db?.price.update({
      where: { productId: productId },
      data: { ...priceData },
    });

    return { msg: "Price Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
