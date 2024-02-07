import * as z from "zod";
import { CompleteProduct, relatedProductZodSchema } from "./index";

export const categoryZodSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  name: z.string(),
});

export interface CompleteCategory extends z.infer<typeof categoryZodSchema> {
  product: CompleteProduct[];
}

/**
 * relatedCategoryZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedCategoryZodSchema: z.ZodSchema<CompleteCategory> = z.lazy(
  () =>
    categoryZodSchema.extend({
      product: relatedProductZodSchema.array(),
    }),
);
