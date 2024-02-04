import * as z from "zod";
import { CompleteUser, relatedUserZodSchema } from "./index";

export const addressZodSchema = z.object({
  id: z.string(),
  userId: z.string(),
  street: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  zip: z.string().nullish(),
  country: z.string().nullish(),
  isDefault: z.boolean(),
});

export interface CompleteAddress extends z.infer<typeof addressZodSchema> {
  user: CompleteUser;
}

/**
 * relatedAddressZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAddressZodSchema: z.ZodSchema<CompleteAddress> = z.lazy(
  () =>
    addressZodSchema.extend({
      user: relatedUserZodSchema,
    })
);
