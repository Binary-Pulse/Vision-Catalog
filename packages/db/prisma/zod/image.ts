import * as z from "zod";
import { CompleteProduct, relatedProductZodSchema } from "./index";

export const imageZodSchema = z.object({
  id: z.string(),
  url: z.string(),
});

export interface CompleteImage extends z.infer<typeof imageZodSchema> {
  product: CompleteProduct;
}

/**
 * relatedImageZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedImageZodSchema: z.ZodSchema<CompleteImage> = z.lazy(() =>
  imageZodSchema.extend({
    product: relatedProductZodSchema,
  }),
);
