import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { UpdateImagesForProduct } from "@repo/api/product";
import { addImagesParams, id } from "@repo/db";
export const imagesRouter = createTRPCRouter({
  updateImagesForProduct: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/update-images-to-product",
        tags: ["Products"],
      },
    })
    .input(
      z.object({
        productId: id,
        imagesData: addImagesParams,
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input: { productId, imagesData } }) => {
      const res = await UpdateImagesForProduct({
        imagesData,
        productId,
      });
      return res;
    }),
});
