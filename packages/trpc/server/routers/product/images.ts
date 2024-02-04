import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../trpc";
import { AddImagesToProduct } from "@repo/api/product";
import { addImagesParams, id } from "@repo/db";
export const imagesRouter = createTRPCRouter({
  addImageToProduct: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-images-to-product",
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
      const res = await AddImagesToProduct({
        imagesData,
        productId,
      });
      return res;
    }),
});
