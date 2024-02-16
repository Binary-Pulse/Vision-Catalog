import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { UpdateProductPriceInfo } from "@repo/api/product";
import { updateProductPriceZI } from "../input-zod-schema";

export const priceRouter = createTRPCRouter({
  updateProductPrice: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/update-product-price-info",
        tags: ["Products"],
      },
    })
    .input(updateProductPriceZI)
    .output(z.object({}))
    .mutation(async ({ input: { productId, priceData } }) => {
      const res = await UpdateProductPriceInfo({
        priceData,
        productId,
      });
      return res;
    }),
});
