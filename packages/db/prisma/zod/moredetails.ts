import * as z from "zod";
import {
  CompleteProductDimension,
  relatedProductDimensionZodSchema,
  CompletePackageDimension,
  relatedPackageDimensionZodSchema,
  CompleteProduct,
  relatedProductZodSchema,
} from "./index";

export const moreDetailsZodSchema = z.object({
  id: z.string(),
  moreDetailId: z.string(),
  targetGender: z.string().nullish(),
  usage: z.string().array(),
  displayWeight: z.string().nullish(),
  packageWeight: z.string().nullish(),
  shippingWeight: z.string().nullish(),
  displayLenght: z.string().nullish(),
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
  productDimensions?: CompleteProductDimension | null;
  packageDimensions?: CompletePackageDimension | null;
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
      productDimensions: relatedProductDimensionZodSchema.nullish(),
      packageDimensions: relatedPackageDimensionZodSchema.nullish(),
      product: relatedProductZodSchema,
    }),
  );
