import * as z from "zod";
import {
  CompleteBrand,
  relatedBrandSchema,
  CompleteVariantProduct,
  relatedVariantProductSchema,
  CompleteImage,
  relatedImageSchema,
  CompleteUser,
  relatedUserSchema,
  CompleteMoreDetails,
  relatedMoreDetailsSchema,
  CompletePrice,
  relatedPriceSchema,
} from "./index";

export const productSchema = z.object({
  id: z.string(),
  productId: z.string(),
  userId: z.string(),
  productName: z.string(),
  brandId: z.string().nullish(),
  variantIds: z.string().array(),
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

export interface CompleteProduct extends z.infer<typeof productSchema> {
  brand?: CompleteBrand | null;
  variants: CompleteVariantProduct[];
  images: CompleteImage[];
  user: CompleteUser;
  moreDetails?: CompleteMoreDetails | null;
  Price?: CompletePrice | null;
}

/**
 * relatedProductSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductSchema: z.ZodSchema<CompleteProduct> = z.lazy(() =>
  productSchema.extend({
    brand: relatedBrandSchema.nullish(),
    variants: relatedVariantProductSchema.array(),
    images: relatedImageSchema.array(),
    user: relatedUserSchema,
    moreDetails: relatedMoreDetailsSchema.nullish(),
    Price: relatedPriceSchema.nullish(),
  }),
);
