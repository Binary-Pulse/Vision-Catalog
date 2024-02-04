import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { AddNewProductOrVariant, GetUserProductList } from "@repo/api/product";
import { id, productDetailsParams } from "@repo/db";
export const productRouter = createTRPCRouter({
  getUserProductList: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "GET",
        path: "/get-user-product-list",
        tags: ["Products"],
      },
    })
    .input(z.object({}))
    .output(z.object({}))
    .query(async ({ ctx: { userId } }) => {
      const res = await GetUserProductList(userId);
      return res;
    }),

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
