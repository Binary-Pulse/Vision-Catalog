import { z } from "zod";
import { variantZodSchema } from "../../prisma/zod";

export const addVariantsParams = variantZodSchema.omit({ id: true });
export type AddVariantsParamsType = z.infer<typeof addVariantsParams>;
