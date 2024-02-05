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

export async function UseParentProductToAddVariant(addVariantByParentId: Id) {
  try {
    const parentProduct = await db?.product.findFirstOrThrow({
      where: { id: addVariantByParentId },
      include: {
        brand: true,
        category: true,
        images: true,
        moreDetails: { include: { dimensions: true } },
        price: true,
      },
    });
    if (parentProduct) {
      const {
        brand,
        category,
        images,
        moreDetails,
        price,
        id,
        userId,
        brandId,
        variantId,
        categoryId,
        ...rest
      } = parentProduct;
      const productInfo: AddProductVitalInfoParamsType = rest;
      const product = await db?.product.create({
        data: {
          ...(rest as AddProductVitalInfoParamsType),
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
        },
        include: {
          brand: { select: { name: true } },
          category: { select: { name: true } },
          images: { select: { primaryImageUrl: true } },
          price: { select: { currency: true, ppu: true } },
        },
      });
      const productId = product?.id;
      const primaryImageUrl = product?.images?.primaryImageUrl;
      const currency = product?.price?.currency as "INR" | "USD";
      const pricePerUnit = product?.price?.ppu as number;
      const metadata: ProductSearchVectorSchema = {
        productId: productId,

        productName: rest.productName,
        description: rest.description,
        ean: rest.EAN,
        isbn: rest.ISBN,
        sku: rest.SKU,
        searchTerms: rest.searchTerms,
        upc: rest.UPC,

        brand: product?.brand?.name,
        category: product?.category?.name,

        primaryImageUrl,
        currency,
        pricePerUnit,
      };
      const imageBase64 = await imageURLToBase64(
        images?.primaryImageUrl as string,
      );
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
        msg: "New Variant Added Successfully From Parent Product.",
        productId: productId,
        vectorTextObjectId: vectorProductMetadataResponse.textObject.objectId,
        vectorImageObjectId: vectorProductMetadataResponse.imageObject.objectId,
      };
      return response;
    }
    throw new Error("PARENT_PRODUCT_NOT_FOUND");
  } catch (error) {
    throw new Error((error as Error).message ?? "INTERNAL_SERVER_ERROR");
  }
}
