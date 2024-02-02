import { z } from "zod";
import {
  moreDetailsZodSchema,
  packageDimensionZodSchema,
  productDimensionZodSchema,
  productZodSchema,
} from "../../prisma/zod";

export const productIdZodSchema = productZodSchema.pick({
  id: true,
});

export type ProductIdType = z.infer<typeof productIdZodSchema>["id"];
export const productDetailsParams = productZodSchema.omit({
  brandId: true,
  id: true,
  userId: true,
});
export type AddProductVitalInfoParamsType = z.infer<
  typeof productDetailsParams
>;
export const addMoreDetailsParams = moreDetailsZodSchema.omit({ id: true });
export type AddMoreDetailsParamsType = z.infer<typeof addMoreDetailsParams>;

export const packageDimensionParams = packageDimensionZodSchema.omit({
  id: true,
  packageId: true,
});
export type PackageDimensionParamsType = z.infer<typeof packageDimensionParams>;

export const productDimesionParams = productDimensionZodSchema.omit({
  id: true,
  packageId: true,
});
export type ProductDimensionParamsType = z.infer<typeof productDimesionParams>;
