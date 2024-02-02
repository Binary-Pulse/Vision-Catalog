import * as z from "zod";
import { CompleteMoreDetails, relatedMoreDetailsSchema } from "./index";

export const productDimensionSchema = z.object({
  id: z.string(),
  productId: z.string(),
  length: z.number(),
  width: z.number(),
  height: z.number(),
  parameter: z.string(),
});

export interface CompleteProductDimension
  extends z.infer<typeof productDimensionSchema> {
  product: CompleteMoreDetails;
}

/**
 * relatedProductDimensionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductDimensionSchema: z.ZodSchema<CompleteProductDimension> =
  z.lazy(() =>
    productDimensionSchema.extend({
      product: relatedMoreDetailsSchema,
    }),
  );
