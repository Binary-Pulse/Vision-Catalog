import {
  AddMoreDetailsParamsType,
  Id,
  PackageDimensionParamsType,
  ProductDimensionParamsType,
} from "@repo/db";

interface AddMoreDetailsToProductProps {
  productVitalInfo: AddMoreDetailsParamsType;
  productId: Id;
  packageDimension?: PackageDimensionParamsType;
  productDimension?: ProductDimensionParamsType;
}
export async function AddMoreDetailsToProduct({
  productVitalInfo,
  productId,
  packageDimension,
  productDimension,
}: AddMoreDetailsToProductProps) {
  try {
    await db?.moreDetails.create({
      data: {
        ...productVitalInfo,
        product: { connect: { id: productId } },
        packageDimensions: { create: { ...packageDimension } },
        productDimensions: { create: { ...productDimension } },
      },
    });
    return { msg: "More Details Added Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
