import { z } from "zod";

export * from "./product";

export const id = z.string().uuid();
export type Id = z.infer<typeof id>;
