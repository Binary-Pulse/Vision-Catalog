import { z } from "zod";
import { brandZodSchema } from "../../prisma/zod";

export const addBrandParams = brandZodSchema.omit({
  id: true,
});
export type AddBrandParamsType = z.infer<typeof addBrandParams>;
