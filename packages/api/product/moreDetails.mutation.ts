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
