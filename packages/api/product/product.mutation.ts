import { AddProductVitalInfoParamsType, Id } from "@repo/db";
import { addMetadataToVectorDB, updateMetadataToVectorDB } from "./metadata";

interface AddNewProductProps {
  productVitalInfo: AddProductVitalInfoParamsType;
  pricePerUnit: number;
  primaryImageUrl: string;
  currency: "INR" | "USD";
  userId: Id;
  brandId: Id;
  categoryId: Id;
}
/**
 * Add new product to db and adds metadata to text vector db and image search db
 * returs objectId in response
 */
export async function AddNewProduct({
  productVitalInfo,
  pricePerUnit,
  primaryImageUrl,
  currency,
  userId,
  brandId,
  categoryId,
}: AddNewProductProps) {
  try {
    //
    const product = await db?.product.create({
      data: {
        ...productVitalInfo,
        brand: { connect: { id: brandId } },
        category: { connect: { id: categoryId } },
        user: { connect: { id: userId } },
        price: { create: { ppu: pricePerUnit, currency: currency } },
        images: { create: { primaryImageUrl } },
        moreDetails: { create: { dimensions: { create: {} } } }, // create the table update and update it later
      },
      include: {
        brand: { select: { name: true } },
        category: { select: { name: true } },
      },
    });
    if (!product) {
      throw new Error("PRODUCT_NOT_CREATED");
    }
    const vResponse = await addMetadataToVectorDB(product.id);
    await db?.product.update({
      where: { id: product.id },
      data: {
        vectorTextObjId: vResponse.textObject.objectId,
        vectorImageObjId: vResponse.imageObject.objectId,
      },
    });
    const response = {
      msg: "New Product Added Successfully.",
      productId: product.id,
      vectorTextObjectId: vResponse.textObject.objectId,
      vectorImageObjectId: vResponse.imageObject.objectId,
    };
    return response;
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

interface UpdateProductVitalInfoProps {
  productId: Id;
  updatedProductVitalInfo: AddProductVitalInfoParamsType;
}
export async function UpdateProductVitalInfo({
  productId,
  updatedProductVitalInfo,
}: UpdateProductVitalInfoProps) {
  try {
    const existingProduct = await db?.product.findUnique({
      where: { id: productId },
      select: { vectorImageObjId: true, vectorTextObjId: true },
    });

    if (!existingProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    if (!existingProduct.vectorImageObjId || !existingProduct.vectorTextObjId) {
      throw new Error("VECTOR_OBJECT_IDS_NOT_FOUND");
    }
    await updateMetadataToVectorDB({
      vectorImageObjId: existingProduct.vectorImageObjId,
      productId,
      vectorTextObjId: existingProduct.vectorTextObjId,
    });
    await db?.product.update({
      where: { id: productId },
      data: { ...updatedProductVitalInfo },
      include: {
        images: { select: { primaryImageUrl: true } },
        brand: { select: { name: true } },
        price: { select: { ppu: true, currency: true } },
      },
    });

    return { msg: "Product Vital Information Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

export async function DeleteProductAndReferences(productId: Id) {
  try {
    const product = await db?.product.findUnique({
      where: { id: productId },
      include: { variants: true },
    });
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
    if (product?.variants) {
      for (const variant of product?.variants) {
        await db?.product.delete({ where: { id: variant.id } });
      }
    }
    return { msg: "Product and References Deleted Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

interface UpdateProductCategoryProps {
  productId: Id;
  categoryId: Id;
}

export async function UpdateProductCategory({
  productId,
  categoryId,
}: UpdateProductCategoryProps) {
  try {
    const existingProduct = await db?.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    await db?.product.update({
      where: { id: productId },
      data: { category: { connect: { id: categoryId } } },
    });

    return { msg: "Category Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

interface UpdateProductBrandProps {
  productId: Id;
  brandId: Id;
}

export async function UpdateProductBrand({
  productId,
  brandId,
}: UpdateProductBrandProps) {
  try {
    const existingProduct = await db?.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    await db?.product.update({
      where: { id: productId },
      data: {
        brand: { connect: { id: brandId } },
      },
    });

    return { msg: "Brand Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
