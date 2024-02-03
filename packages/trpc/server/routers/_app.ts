import { createTRPCRouter } from "../trpc";
import { imageSearchRouter } from "./image-search";
import { authRouter } from "./auth";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  imageSearch: imageSearchRouter,
});

export type AppRouter = typeof appRouter;
