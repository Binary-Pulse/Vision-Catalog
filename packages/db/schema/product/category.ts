import { z } from "zod";
import { categoryZodSchema } from "../../prisma/zod";

export const addCategoryParams = categoryZodSchema.omit({
  id: true,
});
export type AddCategoryParamsType = z.infer<typeof addCategoryParams>;
