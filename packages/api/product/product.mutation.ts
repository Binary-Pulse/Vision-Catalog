import { AddProductVitalInfoParamsType, Id } from "@repo/db";
import {
  ProductSearchVectorSchema,
  addNewProductMetadata,
} from "../vector-search";
import {
  SEARCH_BY_IMAGE_CLASS,
  SEARCH_BY_TEXT_CLASS,
  imageURLToBase64,
} from "@repo/utils";

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
    const productId = product?.id;
    const metadata: ProductSearchVectorSchema = {
      productId: productId,

      productName: productVitalInfo.productName,
      description: productVitalInfo.description,
      ean: productVitalInfo.EAN,
      isbn: productVitalInfo.ISBN,
      sku: productVitalInfo.SKU,
      searchTerms: productVitalInfo.searchTerms,
      upc: productVitalInfo.UPC,

      brand: product?.brand?.name,
      category: product?.category?.name,

      primaryImageUrl,
      currency,
      pricePerUnit,
    };
    const imageBase64 = await imageURLToBase64(primaryImageUrl);
    const vectorProductMetadataResponse = await addNewProductMetadata({
      imageBase64,
      imageClassName: SEARCH_BY_IMAGE_CLASS,
      textClassName: SEARCH_BY_TEXT_CLASS,
      metadata,
    });
    await db?.product.update({
      where: { id: productId },
      data: {
        vectorTextObjId: vectorProductMetadataResponse.textObject.objectId,
        vectorImageObjId: vectorProductMetadataResponse.imageObject.objectId,
      },
    });
    const response = {
      msg: "New Product Added Successfully.",
      productId: productId,
      vectorTextObjectId: vectorProductMetadataResponse.textObject.objectId,
      vectorImageObjectId: vectorProductMetadataResponse.imageObject.objectId,
    };
    return { response };
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
    });

    if (!existingProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    const a = await db?.product.update({
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
