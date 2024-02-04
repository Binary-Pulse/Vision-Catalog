import { AddProductVitalInfoParamsType, Id } from "@repo/db";

interface AddNewProductOrVariantProps {
  productVitalInfo: AddProductVitalInfoParamsType;
  userId: Id;
  brandId: Id;
  categoryId: Id;
  addVariantByParentId?: Id;
}
export async function AddNewProductOrVariant({
  productVitalInfo,
  userId,
  brandId,
  categoryId,
  addVariantByParentId,
}: AddNewProductOrVariantProps) {
  try {
    await db?.product.create({
      data: {
        ...productVitalInfo,
        brand: { connect: { id: brandId } },
        category: { connect: { id: categoryId } },
        user: { connect: { id: userId } },
        variant: addVariantByParentId
          ? { connect: { id: addVariantByParentId } }
          : undefined,
      },
    });
    return { msg: "New Product Added Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
