import { AddPriceParamsType, Id } from "@repo/db";
import { updateMetadataToVectorDB } from "./metadata";

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
    const priceTable = await db?.price.findFirstOrThrow({
      where: { productId: productId },
      select: {
        product: { select: { vectorImageObjId: true, vectorTextObjId: true } },
      },
    });
    if (!priceTable) {
      throw new Error("PRICE_TABLE_DOES_NOT_EXIST");
    }
    if (
      !priceTable.product.vectorImageObjId ||
      !priceTable.product.vectorTextObjId
    ) {
      throw new Error("VECTOR_OBJECT_IDS_NOT_FOUND - PRODUCT_NOT_UPDATED");
    }
    await db?.price.update({
      where: { productId: productId },
      data: { ...priceData },
    });
    await updateMetadataToVectorDB({
      productId,
      vectorImageObjId: priceTable.product.vectorImageObjId,
      vectorTextObjId: priceTable.product.vectorTextObjId,
    });

    return { msg: "Price Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
