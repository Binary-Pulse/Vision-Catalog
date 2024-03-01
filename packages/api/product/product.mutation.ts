import { AddProductVitalInfoParamsType, Id } from "@repo/db";
import { addMetadataToVectorDB, updateMetadataToVectorDB } from "./metadata";

type prodVitalInfoWithoutProdNameType = Omit<
  AddProductVitalInfoParamsType,
  "productName"
>;
interface AddNewProductProps {
  productName: string;
  productVitalInfo?: prodVitalInfoWithoutProdNameType;
  pricePerUnit: number;
  primaryImageUrl: string;
  currency: "INR" | "USD";
  userId: Id;
  brandName: string;
  categoryName: string;
}
/**
 * Add new product to db and adds metadata to text vector db and image search db
 * returs objectId in response
 */
export async function AddNewProduct({
  productName,
  productVitalInfo,
  pricePerUnit,
  primaryImageUrl,
  currency,
  userId,
  brandName,
  categoryName,
}: AddNewProductProps) {
  try {
    const product = await db?.product.create({
      data: {
        ...productVitalInfo,
        productName,
        brand: { connect: { name: brandName } },
        category: { connect: { name: categoryName } },
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
    const existingProduct = await db?.product.findFirstOrThrow({
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
      data: { ...updatedProductVitalInfo, updatedAt: Date() },
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
    const product = await db?.product.findFirstOrThrow({
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
  categoryName: string;
}

export async function UpdateProductCategory({
  productId,
  categoryName,
}: UpdateProductCategoryProps) {
  try {
    const existingProduct = await db?.product.findFirstOrThrow({
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
      productId,
      vectorImageObjId: existingProduct.vectorImageObjId,
      vectorTextObjId: existingProduct.vectorImageObjId,
    });

    await db?.product.update({
      where: { id: productId },
      data: { category: { connect: { name: categoryName } } },
    });

    return { msg: "Category Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}

interface UpdateProductBrandProps {
  productId: Id;
  brandName: string;
}

export async function UpdateProductBrand({
  productId,
  brandName,
}: UpdateProductBrandProps) {
  try {
    const existingProduct = await db?.product.findFirstOrThrow({
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
      productId,
      vectorImageObjId: existingProduct.vectorImageObjId,
      vectorTextObjId: existingProduct.vectorImageObjId,
    });

    await db?.product.update({
      where: { id: productId },
      data: {
        brand: { connect: { name: brandName } },
      },
    });

    return { msg: "Brand Updated Successfully" };
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
