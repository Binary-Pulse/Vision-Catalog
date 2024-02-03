import * as z from "zod";
import { CURRENCY } from "@prisma/client";
import { CompleteProduct, relatedProductZodSchema } from "./index";

export const priceZodSchema = z.object({
  id: z.string(),
  productId: z.string(),
  regularPrice: z.number().nullish(),
  discountedPrice: z.number().nullish(),
  discountPercentage: z.number().nullish(),
  currency: z.nativeEnum(CURRENCY),
  tax: z.number().nullish(),
  shippingCost: z.number().nullish(),
  handlingFee: z.number().nullish(),
  ppuCount: z.number().nullish(),
});

export interface CompletePrice extends z.infer<typeof priceZodSchema> {
  product: CompleteProduct;
}

/**
 * relatedPriceZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPriceZodSchema: z.ZodSchema<CompletePrice> = z.lazy(() =>
  priceZodSchema.extend({
    product: relatedProductZodSchema,
  }),
);
