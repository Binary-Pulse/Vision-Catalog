import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../trpc";
import { AddMoreDetailsToProduct } from "@repo/api/product";
import { addMoreDetailsParams, dimensionsParam, id } from "@repo/db";
export const moreDetailsRouter = createTRPCRouter({
  addMoreDetailsToProduct: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-more-details-to-product",
        tags: ["Products"],
      },
    })
    .input(
      z.object({
        productId: id,
        moreDetails: addMoreDetailsParams,
        dimensions: dimensionsParam,
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input: { productId, dimensions, moreDetails } }) => {
      const res = await AddMoreDetailsToProduct({
        moreDetails,
        dimensions,
        productId,
      });
      return res;
    }),
});
