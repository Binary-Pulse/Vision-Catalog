import { createTRPCRouter } from "../trpc";
import { productSearchRouter } from "./product-search";
import { productAPI } from "./product/_app";

export const appRouter = createTRPCRouter({
  productSearchRouter: productSearchRouter,
  productRouter: productAPI,
});

export type AppRouter = typeof appRouter;
