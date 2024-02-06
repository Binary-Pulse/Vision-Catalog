import * as z from "zod"
import { CompleteMoreDetails, relatedMoreDetailsZodSchema } from "./index"

export const dimensionZodSchema = z.object({
  id: z.string(),
  moreDetailsId: z.string(),
  productLength: z.number().nullish(),
  productWidth: z.number().nullish(),
  productHeight: z.number().nullish(),
  packageLength: z.number().nullish(),
  packageWidth: z.number().nullish(),
  packageHeight: z.number().nullish(),
  displayLenght: z.number().nullish(),
  displayWidth: z.number().nullish(),
  parameter: z.string().nullish(),
})

export interface CompleteDimension extends z.infer<typeof dimensionZodSchema> {
  package: CompleteMoreDetails
}

/**
 * relatedDimensionZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedDimensionZodSchema: z.ZodSchema<CompleteDimension> = z.lazy(() => dimensionZodSchema.extend({
  package: relatedMoreDetailsZodSchema,
}))
