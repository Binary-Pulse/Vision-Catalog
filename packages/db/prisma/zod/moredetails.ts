import * as z from "zod";
import {
  CompleteDimension,
  relatedDimensionZodSchema,
  CompleteProduct,
  relatedProductZodSchema,
} from "./index";

export const moreDetailsZodSchema = z.object({
  id: z.string(),
  productId: z.string(),
  launchDate: z.date().nullish(),
  releaseDate: z.date().nullish(),
  targetGender: z.string().nullish(),
  targetAudienceDetails: z.string().nullish(),
  usage: z.string().array(),
  displayWeight: z.string().nullish(),
  packageWeight: z.string().nullish(),
  shippingWeight: z.string().nullish(),
  containsLiquid: z.boolean().nullish(),
  isFragile: z.boolean().nullish(),
  itemForm: z.string().nullish(),
  itemType: z.string().nullish(),
  materialType: z.string().nullish(),
  hairType: z.string().nullish(),
  skinType: z.string().nullish(),
  fabricType: z.string().nullish(),
});

export interface CompleteMoreDetails
  extends z.infer<typeof moreDetailsZodSchema> {
  dimensions?: CompleteDimension | null;
  product: CompleteProduct;
}

/**
 * relatedMoreDetailsZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMoreDetailsZodSchema: z.ZodSchema<CompleteMoreDetails> =
  z.lazy(() =>
    moreDetailsZodSchema.extend({
      dimensions: relatedDimensionZodSchema.nullish(),
      product: relatedProductZodSchema,
    })
  );
