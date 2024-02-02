import { Id } from "@repo/db";
import { AddVariantsParamsType } from "@repo/db/schema/product";

interface AddVariantsToProductProps {
  productId: Id;
  variantsData: AddVariantsParamsType;
}
export async function AddVariantsToProduct({
  productId,
  variantsData,
}: AddVariantsToProductProps) {
  try {
    await db?.variant.create({
      data: { ...variantsData, product: { connect: { id: productId } } },
    });
    return { msg: "Product Variants Added Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
