import {
  addBrandParams,
  addCategoryParams,
  addImagesParams,
  addMoreDetailsParams,
  addPriceParamsSchema,
  dimensionsParam,
  id,
  productDetailsParams,
} from "@repo/db";
import { z } from "zod";

export const addProductZI = z.object({
  brandName: z.string(),
  categoryName: z.string(),
  productName: z.string(),
  productVitalInfo: productDetailsParams.omit({ productName: true }).optional(),
  currency: z.union([z.literal("INR"), z.literal("USD")]),
  pricePerUnit: z.number(),
  primaryImageUrl: z.string().url(),
});
export const addVariantWithParentZI = z.object({
  parentProductId: id,
});
export const updateProductZI = z.object({
  productId: id,
  productVitalInfo: productDetailsParams,
});

export const updateProductPriceZI = z.object({
  productId: id,
  priceData: addPriceParamsSchema,
});

export const updateProductMoreDetailsZI = z.object({
  productId: id,
  moreDetails: addMoreDetailsParams,
  dimensions: dimensionsParam,
});

export const updateProductImagesZI = z.object({
  productId: id,
  imagesData: addImagesParams,
});

export const addCategoryZI = z.object({
  categoryData: addCategoryParams,
});

export const addBrandZI = z.object({
  brandData: addBrandParams,
});
