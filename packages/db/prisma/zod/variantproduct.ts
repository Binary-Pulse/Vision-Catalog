import * as z from "zod";
import {
  CompleteVariant,
  relatedVariantZodSchema,
  CompleteProduct,
  relatedProductZodSchema,
} from "./index";

export const variantProductZodSchema = z.object({
  variantId: z.string(),
  productId: z.string(),
});

export interface CompleteVariantProduct
  extends z.infer<typeof variantProductZodSchema> {
  variant: CompleteVariant;
  product: CompleteProduct;
}

/**
 * relatedVariantProductZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedVariantProductZodSchema: z.ZodSchema<CompleteVariantProduct> =
  z.lazy(() =>
    variantProductZodSchema.extend({
      variant: relatedVariantZodSchema,
      product: relatedProductZodSchema,
    }),
  );
