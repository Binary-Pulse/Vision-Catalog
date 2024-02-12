import * as z from "zod";

export const verificationTokenZodSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
});
