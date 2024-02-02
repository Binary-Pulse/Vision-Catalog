import * as z from "zod";
import {
  CompleteVariantProduct,
  relatedVariantProductZodSchema,
} from "./index";

export const variantZodSchema = z.object({
  id: z.string(),
  size: z.string().nullish(),
  color: z.string().nullish(),
});

export interface CompleteVariant extends z.infer<typeof variantZodSchema> {
  variantProduct: CompleteVariantProduct[];
}

/**
 * relatedVariantZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedVariantZodSchema: z.ZodSchema<CompleteVariant> = z.lazy(
  () =>
    variantZodSchema.extend({
      variantProduct: relatedVariantProductZodSchema.array(),
    }),
);
