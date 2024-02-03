import * as z from "zod";
import { CompleteProduct, relatedProductZodSchema } from "./index";

export const brandZodSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export interface CompleteBrand extends z.infer<typeof brandZodSchema> {
  products: CompleteProduct[];
}

/**
 * relatedBrandZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedBrandZodSchema: z.ZodSchema<CompleteBrand> = z.lazy(() =>
  brandZodSchema.extend({
    products: relatedProductZodSchema.array(),
  }),
);
