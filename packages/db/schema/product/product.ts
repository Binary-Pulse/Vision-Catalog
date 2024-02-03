import { z } from "zod";
import {
  dimensionZodSchema,
  moreDetailsZodSchema,
  productZodSchema,
} from "../../prisma/zod";

export const productIdZodSchema = productZodSchema.pick({
  id: true,
});

export type ProductIdType = z.infer<typeof productIdZodSchema>["id"];
export const productDetailsParams = productZodSchema.omit({
  id: true,
  userId: true,
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
