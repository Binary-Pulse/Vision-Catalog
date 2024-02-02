import * as z from "zod";
import {
  CompleteProductDimension,
  relatedProductDimensionSchema,
  CompletePackageDimension,
  relatedPackageDimensionSchema,
  CompleteProduct,
  relatedProductSchema,
} from "./index";

export const moreDetailsSchema = z.object({
  id: z.string(),
  moreDetailId: z.string(),
  TargetGender: z.string().nullish(),
  Usage: z.string().array(),
  DisplayWeight: z.string().nullish(),
  PackageWeight: z.string().nullish(),
  ShippingWeight: z.string().nullish(),
  DisplayLenght: z.string().nullish(),
  ContainsLiquid: z.boolean().nullish(),
  IsFragile: z.boolean().nullish(),
  ItemForm: z.string().nullish(),
  ItemType: z.string().nullish(),
  MaterialType: z.string().nullish(),
  HairType: z.string().nullish(),
  SkinType: z.string().nullish(),
  fabricType: z.string().nullish(),
});

export interface CompleteMoreDetails extends z.infer<typeof moreDetailsSchema> {
  productDimensions?: CompleteProductDimension | null;
  packageDimensions?: CompletePackageDimension | null;
  product: CompleteProduct;
}

/**
 * relatedMoreDetailsSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMoreDetailsSchema: z.ZodSchema<CompleteMoreDetails> =
  z.lazy(() =>
    moreDetailsSchema.extend({
      productDimensions: relatedProductDimensionSchema.nullish(),
      packageDimensions: relatedPackageDimensionSchema.nullish(),
      product: relatedProductSchema,
    }),
  );
