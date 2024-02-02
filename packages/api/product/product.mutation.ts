import { AddProductVitalInfoParamsType, Id } from "@repo/db";

interface AddNewProductProps {
  productVitalInfo: AddProductVitalInfoParamsType;
  brandId: Id;
  userId: Id;
}
export async function AddNewProduct({
  productVitalInfo,
  brandId,
  userId,
}: AddNewProductProps) {
  try {
    await db?.product.create({
      data: {
        ...productVitalInfo,
        brand: {
          connect: {
            id: brandId,
          },
        },
        user: { connect: { id: userId } },
      },
    });
    return { msg: "New Product Added Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
