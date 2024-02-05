import { AddProductVitalInfoParamsType, Id } from "@repo/db";
import { addMetadataToVectorDB } from "./metadata";

export async function UseParentProductToAddVariant(id: Id) {
  try {
    const product = await db?.product.findFirstOrThrow({
      where: { id },
      include: {
        brand: true,
        category: true,
        images: true,
        moreDetails: { include: { dimensions: true } },
        price: true,
      },
    });
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    const {
      brand,
      category,
      images,
      moreDetails,
      price,
      userId,
      brandId,
      variantId,
      categoryId,
      ...rest
    } = product;
    const productInfo: AddProductVitalInfoParamsType = rest;
    const variantProduct = await db?.product.create({
      data: {
        ...productInfo,
        brand: { connect: { id: brand?.id } },
        category: { connect: { id: category?.id } },
        user: { connect: { id: userId } },
        price: {
          create: {
            ppu: price?.ppu,
            currency: price?.currency as "USD" | "INR",
          },
        },
        moreDetails: {
          create: {
            ...moreDetails,
            dimensions: { create: { ...moreDetails?.dimensions } },
          },
        },
        variant: { connect: { id } },
      },
      include: {
        brand: { select: { name: true } },
        category: { select: { name: true } },
        images: { select: { primaryImageUrl: true } },
        price: { select: { currency: true, ppu: true } },
      },
    });
    if (!variantProduct) {
      throw new Error("VARIANT_PRODUCT_NOT_CREATED");
    }
    const vResponse = await addMetadataToVectorDB(variantProduct?.id);
    await db?.product.update({
      where: { id: variantProduct?.id },
      data: {
        vectorTextObjId: vResponse.textObject.objectId,
        vectorImageObjId: vResponse.imageObject.objectId,
      },
    });
    const response = {
      msg: "New Variant Added Successfully From Parent Product.",
      productId: variantProduct?.id,
      vectorTextObjectId: vResponse.textObject.objectId,
      vectorImageObjectId: vResponse.imageObject.objectId,
    };
    return response;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
