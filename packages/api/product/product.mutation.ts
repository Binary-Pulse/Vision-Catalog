import { AddProductVitalInfoParamsType, Id } from "@repo/db";

interface AddNewProductProps {
  productVitalInfo: AddProductVitalInfoParamsType;
  userId: Id;
  brandId: Id;
  categoryId: Id;
}
export async function AddNewProduct({
  productVitalInfo,
  userId,
  brandId,
  categoryId,
}: AddNewProductProps) {
  try {
    await db?.product.create({
      data: {
        ...productVitalInfo,
        brand: { connect: { id: brandId } },
        category: { connect: { id: categoryId } },
        user: { connect: { id: userId } },
      },
    });
    return { msg: "New Product Added Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

interface AddNewVariantProps {
  productVitalInfo: AddProductVitalInfoParamsType;
  userId: Id;
  brandId: Id;
  parentProductId: Id;
  categoryId: Id;
}
export async function AddNewVariant({
  productVitalInfo,
  parentProductId,
  brandId,
  userId,
  categoryId,
}: AddNewVariantProps) {
  try {
    await db?.product.create({
      data: {
        ...productVitalInfo,
        brand: { connect: { id: brandId } },
        user: { connect: { id: userId } },
        category: { connect: { id: categoryId } },
        variant: {
          connect: { id: parentProductId },
        },
      },
    });
    return { msg: "Variant Added to Existing Product Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
