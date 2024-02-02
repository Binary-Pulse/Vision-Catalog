import * as z from "zod";
import { CompleteUser, relatedUserSchema } from "./index";

export const addressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  isDefault: z.boolean(),
});

export interface CompleteAddress extends z.infer<typeof addressSchema> {
  user: CompleteUser;
}

/**
 * relatedAddressSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAddressSchema: z.ZodSchema<CompleteAddress> = z.lazy(() =>
  addressSchema.extend({
    user: relatedUserSchema,
  }),
);
