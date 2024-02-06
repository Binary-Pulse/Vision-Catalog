import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { UpdateProductMoreDetails } from "@repo/api/product";
import { addMoreDetailsParams, dimensionsParam, id } from "@repo/db";
export const updateProductMoreDetailsZI = z.object({
  productId: id,
  moreDetails: addMoreDetailsParams,
  dimensions: dimensionsParam,
});
export const moreDetailsRouter = createTRPCRouter({
  updateProductMoreDetails: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-more-details-to-product",
        tags: ["Products"],
      },
    })
    .input(updateProductMoreDetailsZI)
    .output(z.object({}))
    .mutation(async ({ input: { productId, dimensions, moreDetails } }) => {
      const res = await UpdateProductMoreDetails({
        moreDetails,
        dimensions,
        productId,
      });
      return res;
    }),
});
