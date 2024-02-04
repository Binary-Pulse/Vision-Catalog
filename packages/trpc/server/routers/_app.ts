import { createTRPCRouter } from "../trpc";
import { imageSearchRouter } from "./image-search";
import { authRouter } from "./auth";
import { productRouter } from "./product/_app";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  imageSearch: imageSearchRouter,
  productRouter: productRouter,
});

export type AppRouter = typeof appRouter;
