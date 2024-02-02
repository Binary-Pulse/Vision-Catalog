import * as z from "zod";
import { CompleteProduct, relatedProductSchema } from "./index";

export const packageDimesionSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  length: z.number(),
  width: z.number(),
  height: z.number(),
  parameter: z.string(),
});

export interface CompletePackageDimesion
  extends z.infer<typeof packageDimesionSchema> {
  product: CompleteProduct;
}

/**
 * relatedPackageDimesionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPackageDimesionSchema: z.ZodSchema<CompletePackageDimesion> =
  z.lazy(() =>
    packageDimesionSchema.extend({
      product: relatedProductSchema,
    }),
  );
