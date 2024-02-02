import { z } from "zod";
import { priceZodSchema } from "../../prisma/zod";

const addPriceParamsSchema = priceZodSchema.omit({ id: true });
export type AddPriceParams = z.infer<typeof addPriceParamsSchema>;
