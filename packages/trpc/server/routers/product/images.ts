import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { UpdateImagesForProduct } from "@repo/api/product";
import { addImagesParams, id } from "@repo/db";
import { updateProductImagesZI } from "../input-zod-schema";

export const imagesRouter = createTRPCRouter({
  updateProductImages: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/update-images-to-product",
        tags: ["Products"],
      },
    })
    .input(updateProductImagesZI)
    .output(z.object({}))
    .mutation(async ({ input: { productId, imagesData } }) => {
      const res = await UpdateImagesForProduct({
        imagesData,
        productId,
      });
      return res;
    }),
});
