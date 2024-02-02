import * as z from "zod";
import { CompleteMoreDetails, relatedMoreDetailsSchema } from "./index";

export const packageDimensionSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  length: z.number(),
  width: z.number(),
  height: z.number(),
  parameter: z.string(),
});

export interface CompletePackageDimension
  extends z.infer<typeof packageDimensionSchema> {
  product: CompleteMoreDetails;
}

/**
 * relatedPackageDimensionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPackageDimensionSchema: z.ZodSchema<CompletePackageDimension> =
  z.lazy(() =>
    packageDimensionSchema.extend({
      product: relatedMoreDetailsSchema,
    }),
  );
