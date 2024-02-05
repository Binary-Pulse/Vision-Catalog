import { createTRPCRouter } from "../trpc";
import { productSearchRouter } from "./product-search";
import { productRouter } from "./product/_app";

export const appRouter = createTRPCRouter({
  productSearchRouter: productSearchRouter,
  productRouter: productRouter,
});

export type AppRouter = typeof appRouter;
