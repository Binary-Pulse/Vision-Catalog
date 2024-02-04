import * as z from "zod";
import {
  CompleteBrand,
  relatedBrandZodSchema,
  CompleteCategory,
  relatedCategoryZodSchema,
  CompleteImage,
  relatedImageZodSchema,
  CompleteMoreDetails,
  relatedMoreDetailsZodSchema,
  CompletePrice,
  relatedPriceZodSchema,
  CompleteUser,
  relatedUserZodSchema,
} from "./index";

export const productZodSchema = z.object({
  id: z.string(),
  userId: z.string(),
  brandId: z.string(),
  variantId: z.string().nullish(),
  UPC: z.string().nullish(),
  EAN: z.string().nullish(),
  ISBN: z.string().nullish(),
  productName: z.string(),
  description: z.string().nullish(),
  bulletPoints: z.string().array(),
  legalDisclaimer: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  keywords: z.string().nullish(),
  targetAudience: z.string().nullish(),
  searchTerms: z.string().array(),
  size: z.string().nullish(),
  color: z.string().nullish(),
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
  variant?: CompleteProduct | null;
  variants: CompleteProduct[];
  brand?: CompleteBrand | null;
  category: CompleteCategory[];
  images: CompleteImage[];
  moreDetails?: CompleteMoreDetails | null;
  price?: CompletePrice | null;
  user: CompleteUser;
}

/**
 * relatedProductZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductZodSchema: z.ZodSchema<CompleteProduct> = z.lazy(
  () =>
    productZodSchema.extend({
      variant: relatedProductZodSchema.nullish(),
      variants: relatedProductZodSchema.array(),
      brand: relatedBrandZodSchema.nullish(),
      category: relatedCategoryZodSchema.array(),
      images: relatedImageZodSchema.array(),
      moreDetails: relatedMoreDetailsZodSchema.nullish(),
      price: relatedPriceZodSchema.nullish(),
      user: relatedUserZodSchema,
    }),
);
