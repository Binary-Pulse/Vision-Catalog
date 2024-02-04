import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { AddPriceToProduct } from "@repo/api/product";
import { addPriceParamsSchema, id } from "@repo/db";
export const priceRouter = createTRPCRouter({
  addPriceToProduct: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-price-to-product",
        tags: ["Products"],
      },
    })
    .input(
      z.object({
        productId: id,
        priceData: addPriceParamsSchema,
      })
    )
    .output(z.object({}))
    .mutation(async ({ input: { productId, priceData } }) => {
      const res = await AddPriceToProduct({
        priceData,
        productId,
      });
      return res;
    }),
});
