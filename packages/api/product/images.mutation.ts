import { AddImagesParamsType, Id } from "@repo/db";

interface AddImagesToProductProps {
  productId: Id;
  imagesData: AddImagesParamsType;
}
export async function AddImagesToProduct({
  productId,
  imagesData,
}: AddImagesToProductProps) {
  try {
    await db?.image.create({
      data: { ...imagesData, product: { connect: { id: productId } } },
    });
    return { msg: "Images Added Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

export async function UpdateImagesForProduct({
  productId,
  imagesData,
}: AddImagesToProductProps) {
  try {
    const existingProduct = await db?.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    await db?.image.update({
      where: { productId: productId },
      data: imagesData,
    });

    return { msg: "Images Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
