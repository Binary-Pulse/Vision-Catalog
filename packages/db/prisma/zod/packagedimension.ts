import * as z from "zod";
import { CompleteMoreDetails, relatedMoreDetailsZodSchema } from "./index";

export const packageDimensionZodSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  length: z.number(),
  width: z.number(),
  height: z.number(),
  parameter: z.string(),
});

export interface CompletePackageDimension
  extends z.infer<typeof packageDimensionZodSchema> {
  product: CompleteMoreDetails;
}

/**
 * relatedPackageDimensionZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPackageDimensionZodSchema: z.ZodSchema<CompletePackageDimension> =
  z.lazy(() =>
    packageDimensionZodSchema.extend({
      product: relatedMoreDetailsZodSchema,
    }),
  );
