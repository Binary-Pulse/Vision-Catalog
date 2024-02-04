import { createTRPCRouter } from "../trpc";
import { imageSearchRouter } from "./image-search";
import { productRouter } from "./product/_app";

export const appRouter = createTRPCRouter({
  imageSearch: imageSearchRouter,
  productRouter: productRouter,
});

export type AppRouter = typeof appRouter;
