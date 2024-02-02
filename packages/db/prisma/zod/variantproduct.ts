import * as z from "zod";
import {
  CompleteVariant,
  relatedVariantSchema,
  CompleteProduct,
  relatedProductSchema,
} from "./index";

export const variantProductSchema = z.object({
  variantId: z.string(),
  productId: z.string(),
});

export interface CompleteVariantProduct
  extends z.infer<typeof variantProductSchema> {
  variant: CompleteVariant;
  product: CompleteProduct;
}

/**
 * relatedVariantProductSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedVariantProductSchema: z.ZodSchema<CompleteVariantProduct> =
  z.lazy(() =>
    variantProductSchema.extend({
      variant: relatedVariantSchema,
      product: relatedProductSchema,
    }),
  );
