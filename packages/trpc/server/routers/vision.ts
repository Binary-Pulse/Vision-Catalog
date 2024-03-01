import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const visionProRouter = createTRPCRouter({
  vision: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/vision",
        tags: ["ai"],
      },
    })
    .input(
      z.object({
        imageURL: z.string().url(),
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input, ctx: { userId } }) => {}),
});
