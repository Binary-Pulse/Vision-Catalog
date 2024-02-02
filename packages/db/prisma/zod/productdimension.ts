import * as z from "zod";
import { CompleteMoreDetails, relatedMoreDetailsZodSchema } from "./index";

export const productDimensionZodSchema = z.object({
  id: z.string(),
  productId: z.string(),
  length: z.number().nullish(),
  width: z.number().nullish(),
  height: z.number().nullish(),
  parameter: z.string().nullish(),
});

export interface CompleteProductDimension
  extends z.infer<typeof productDimensionZodSchema> {
  product: CompleteMoreDetails;
}

/**
 * relatedProductDimensionZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductDimensionZodSchema: z.ZodSchema<CompleteProductDimension> =
  z.lazy(() =>
    productDimensionZodSchema.extend({
      product: relatedMoreDetailsZodSchema,
    }),
  );
