import * as z from "zod";
import { CompleteProduct, relatedProductSchema } from "./index";

export const brandSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export interface CompleteBrand extends z.infer<typeof brandSchema> {
  products: CompleteProduct[];
}

/**
 * relatedBrandSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedBrandSchema: z.ZodSchema<CompleteBrand> = z.lazy(() =>
  brandSchema.extend({
    products: relatedProductSchema.array(),
  }),
);
