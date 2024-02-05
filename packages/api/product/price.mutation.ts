import { AddPriceParamsType, Id } from "@repo/db";

interface ProductPriceInfoProps {
  productId: Id;
  priceData: AddPriceParamsType;
}
// export async function AddPriceToProduct({
//   productId,
//   priceData,
// }: ProductPriceInfoProps) {
//   try {
//     await db?.price.create({
//       data: { ...priceData, product: { connect: { id: productId } } },
//     });
//     return { msg: "Price Added Successfully" };
//   } catch (error) {
//     throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
//   }
// }

export async function UpdateProductPriceInfo({
  productId,
  priceData,
}: ProductPriceInfoProps) {
  try {
    await db?.price.findFirstOrThrow({
      where: { productId: productId },
    });

    await db?.price.update({
      where: { productId: productId },
      data: { ...priceData },
    });

    return { msg: "Price Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
