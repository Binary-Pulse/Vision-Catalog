import * as z from "zod";
import {
  CompleteBrand,
  relatedBrandZodSchema,
  CompleteVariant,
  relatedVariantZodSchema,
  CompleteImage,
  relatedImageZodSchema,
  CompleteUser,
  relatedUserZodSchema,
  CompleteMoreDetails,
  relatedMoreDetailsZodSchema,
  CompletePrice,
  relatedPriceZodSchema,
} from "./index";

export const productZodSchema = z.object({
  id: z.string(),
  userId: z.string(),
  brandId: z.string(),
  UPC: z.string().nullish(),
  EAN: z.string().nullish(),
  ISBN: z.string().nullish(),
  productName: z.string(),
  description: z.string().nullish(),
  bulletPoints: z.string().array(),
  legalDisclaimer: z.string().nullish(),
  createdAt: z.date(),
  keywords: z.string().nullish(),
  targetAudience: z.string().nullish(),
  searchTerms: z.string().array(),
  modelNumber: z.string().nullish(),
  catalogNumber: z.string().nullish(),
  targetAudienceDetails: z.string().nullish(),
  eachUnitCount: z.number().int().nullish(),
  numberOfItems: z.number().int().nullish(),
  launchDate: z.date().nullish(),
  releaseDate: z.date().nullish(),
  isDiscontinuedByManufacturer: z.boolean().nullish(),
  usage: z.string().nullish(),
  safetyWarning: z.string().nullish(),
});

export interface CompleteProduct extends z.infer<typeof productZodSchema> {
  brand?: CompleteBrand | null;
  variants: CompleteVariant[];
  images: CompleteImage[];
  user: CompleteUser;
  moreDetails?: CompleteMoreDetails | null;
  price?: CompletePrice | null;
}

/**
 * relatedProductZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductZodSchema: z.ZodSchema<CompleteProduct> = z.lazy(
  () =>
    productZodSchema.extend({
      brand: relatedBrandZodSchema.nullish(),
      variants: relatedVariantZodSchema.array(),
      images: relatedImageZodSchema.array(),
      user: relatedUserZodSchema,
      moreDetails: relatedMoreDetailsZodSchema.nullish(),
      price: relatedPriceZodSchema.nullish(),
    }),
);
