import * as z from "zod"
import { CompleteUser, relatedUserZodSchema } from "./index"

export const sessionZodSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date(),
})

export interface CompleteSession extends z.infer<typeof sessionZodSchema> {
  user: CompleteUser
}

/**
 * relatedSessionZodSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSessionZodSchema: z.ZodSchema<CompleteSession> = z.lazy(() => sessionZodSchema.extend({
  user: relatedUserZodSchema,
}))
