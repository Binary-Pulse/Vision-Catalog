import * as z from "zod";
import { CompleteVariantProduct, relatedVariantProductSchema } from "./index";

export const variantSchema = z.object({
  id: z.string(),
  size: z.string(),
  color: z.string(),
});

export interface CompleteVariant extends z.infer<typeof variantSchema> {
  VariantProduct: CompleteVariantProduct[];
}

/**
 * relatedVariantSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedVariantSchema: z.ZodSchema<CompleteVariant> = z.lazy(() =>
  variantSchema.extend({
    VariantProduct: relatedVariantProductSchema.array(),
  }),
);
