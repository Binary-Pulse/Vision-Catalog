import { z } from "zod";
import { productZodSchema } from "../../prisma/zod";

export const productIdZodSchema = productZodSchema.pick({
  id: true,
});

export type ProductIdType = z.infer<typeof productIdZodSchema>["id"];
export const productDetailsParams = productZodSchema.omit({
  brandId: true,
  id: true,
  userId: true,
  variantIds: true,
});
export type AddProductVitalInfoParamsType = z.infer<
  typeof productDetailsParams
>;
