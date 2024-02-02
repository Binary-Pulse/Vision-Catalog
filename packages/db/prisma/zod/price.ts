import * as z from "zod";
import { CURRENCY } from "@prisma/client";
import { CompleteProduct, relatedProductSchema } from "./index";

export const priceSchema = z.object({
  id: z.string(),
  productId: z.string(),
  regularPrice: z.number(),
  discountedPrice: z.number().nullish(),
  discountPercentage: z.number().nullish(),
  currency: z.nativeEnum(CURRENCY),
  tax: z.number().nullish(),
  shippingCost: z.number().nullish(),
  handlingFee: z.number().nullish(),
  ppuCount: z.number().nullish(),
});

export interface CompletePrice extends z.infer<typeof priceSchema> {
  product: CompleteProduct;
}

/**
 * relatedPriceSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPriceSchema: z.ZodSchema<CompletePrice> = z.lazy(() =>
  priceSchema.extend({
    product: relatedProductSchema,
  }),
);
