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
