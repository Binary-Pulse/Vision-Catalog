import { z } from "zod";
import {
  dimensionZodSchema,
  moreDetailsZodSchema,
  productZodSchema,
} from "../../prisma/zod";

export const productDetailsParams = productZodSchema.omit({
  id: true,
  userId: true,
  variantId: true,
  brandId: true,
  vectorTextObjId: true,
  vectorImageObjId: true,
  categoryId: true,
});
export type AddProductVitalInfoParamsType = z.infer<
  typeof productDetailsParams
>;
export const addMoreDetailsParams = moreDetailsZodSchema.omit({
  id: true,
  productId: true,
});
export type AddMoreDetailsParamsType = z.infer<typeof addMoreDetailsParams>;

export const dimensionsParam = dimensionZodSchema.omit({
  id: true,
  moreDetailsId: true,
});
export type DimensionsParamType = z.infer<typeof dimensionsParam>;
