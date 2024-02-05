import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  AddNewProduct,
  GetUserProductList,
  UpdateProductVitalInfo,
  UseParentProductToAddVariant,
} from "@repo/api/product";
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
    .input(z.undefined())
    .output(z.object({}))
    .query(async ({ ctx: { userId } }) => {
      const res = await GetUserProductList(userId);
      return res;
    }),
  addProduct: protectedProcedure
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
        currency: z.union([z.literal("INR"), z.literal("USD")]),
        pricePerUnit: z.number(),
        primaryImageUrl: z.string().url(),
      }),
    )
    .output(z.object({}))
    .mutation(
      async ({
        input: {
          brandId,
          categoryId,
          productVitalInfo,
          primaryImageUrl,
          currency,
          pricePerUnit,
        },
        ctx: { userId },
      }) => {
        await db?.brand.findFirstOrThrow({
          where: { id: brandId },
        });
        await db?.category.findFirstOrThrow({
          where: { id: categoryId },
        });
        const res = await AddNewProduct({
          currency,
          pricePerUnit,
          brandId,
          categoryId,
          productVitalInfo,
          userId,
          primaryImageUrl,
        });
        return res;
      },
    ),
  addVariantWithExistingProduct: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-variant-with-existing-product",
        tags: ["Products"],
      },
    })
    .input(
      z.object({
        parentProductId: id,
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input: { parentProductId } }) => {
      const response = await UseParentProductToAddVariant(parentProductId);
      return response;
    }),
  updateProductOrVariant: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-product-or-variant",
        tags: ["Products"],
      },
    })
    .input(
      z.object({
        productId: id,
        productVitalInfo: productDetailsParams,
      }),
    )
    .output(z.object({}))
    .mutation(
      async ({
        input: { productId, productVitalInfo: updatedProductVitalInfo },
      }) => {
        const res = await UpdateProductVitalInfo({
          productId,
          updatedProductVitalInfo,
        });

        return res;
      },
    ),
});
