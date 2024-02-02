import { z } from "zod";
import { imageZodSchema } from "../../prisma/zod";

export const addImagesParams = imageZodSchema.omit({ id: true });
export type AddImagesParamsType = z.infer<typeof addImagesParams>;
