import { z } from "zod";
import { priceZodSchema } from "../../prisma/zod";

export const addPriceParamsSchema = priceZodSchema.omit({
  id: true,
  productId: true,
});
export type AddPriceParamsType = z.infer<typeof addPriceParamsSchema>;
