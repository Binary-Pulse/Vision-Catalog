import { AddMoreDetailsParamsType, DimensionsParamType, Id } from "@repo/db";

interface AddMoreDetailsToProductProps {
  moreDetails: AddMoreDetailsParamsType;
  productId: Id;
  dimensions?: DimensionsParamType;
}
export async function AddMoreDetailsToProduct({
  moreDetails,
  productId,
  dimensions,
}: AddMoreDetailsToProductProps) {
  try {
    await db?.moreDetails.create({
      data: {
        ...moreDetails,
        product: { connect: { id: productId } },
        dimensions: { create: { ...dimensions } },
      },
    });
    return { msg: "More Details Added Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

interface UpdateMoreDetailsToProductProps {
  moreDetails: AddMoreDetailsParamsType;
  productId: Id;
  updatedDimensions?: DimensionsParamType;
}

export async function UpdateMoreDetailsToProduct({
  moreDetails,
  productId,
  updatedDimensions,
}: UpdateMoreDetailsToProductProps) {
  try {
    const existingMoreDetails = await db?.moreDetails.findUnique({
      where: { productId: productId },
    });

    if (!existingMoreDetails) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    await db?.moreDetails.update({
      where: { productId: productId },
      data: {
        ...moreDetails,
        dimensions: { update: { ...updatedDimensions } },
      },
    });

    return { msg: "More Details Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
