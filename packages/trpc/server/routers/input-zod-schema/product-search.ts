import { z } from "zod";

export const searchByImageZI = z.object({
    imageURL: z.string().url(),
  });
  export const searchByTextZI = z.object({
    text: z.string(),
  });