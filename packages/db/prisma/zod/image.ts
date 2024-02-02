import * as z from "zod";
import { CompleteProduct, relatedProductSchema } from "./index";

export const imageSchema = z.object({
  id: z.string(),
  productId: z.string(),
  url: z.string(),
});

export interface CompleteImage extends z.infer<typeof imageSchema> {
  product: CompleteProduct;
}

/**
 * relatedImageSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedImageSchema: z.ZodSchema<CompleteImage> = z.lazy(() =>
  imageSchema.extend({
    product: relatedProductSchema,
  }),
);
