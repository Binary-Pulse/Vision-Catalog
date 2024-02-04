import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { AddNewProductOrVariant } from "@repo/api/product";
import { id, productDetailsParams } from "@repo/db";
export const productRouter = createTRPCRouter({
  addProductOrVariant: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-product-or-variant",
        tags: ["Products"],
      },
    })
    .input(
      z.object({
        brandId: id,
        categoryId: id,
        productVitalInfo: productDetailsParams,
        userId: id,
        addVariantByParentId: id,
      }),
    )
    .output(z.object({}))
    .mutation(
      async ({
        input: { brandId, categoryId, productVitalInfo, addVariantByParentId },
        ctx: { userId },
      }) => {
        const res = await AddNewProductOrVariant({
          brandId,
          categoryId,
          productVitalInfo,
          userId,
          addVariantByParentId,
        });
        return res;
      },
    ),
});
