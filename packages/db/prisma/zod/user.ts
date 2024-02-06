import * as z from "zod"
import { CompleteAccount, relatedAccountZodSchema, CompleteSession, relatedSessionZodSchema, CompleteProduct, relatedProductZodSchema, CompleteAddress, relatedAddressZodSchema } from "./index"

export const userZodSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof userZodSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  products: CompleteProduct[]
  address: CompleteAddress[]
}

/**
 * relatedUserZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserZodSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userZodSchema.extend({
  accounts: relatedAccountZodSchema.array(),
  sessions: relatedSessionZodSchema.array(),
  products: relatedProductZodSchema.array(),
  address: relatedAddressZodSchema.array(),
}))
