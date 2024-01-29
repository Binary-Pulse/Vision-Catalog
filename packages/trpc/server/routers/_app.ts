import { computersRouter } from "./computers";
import { createTRPCRouter } from "../trpc";
import { imageSearchRouter } from "./image-search";
import { authRouter } from "./auth";

export const appRouter = createTRPCRouter({
  computers: computersRouter,
  auth: authRouter,
  imageSearch: imageSearchRouter,
});

export type AppRouter = typeof appRouter;
