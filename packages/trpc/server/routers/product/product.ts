import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  AddNewProduct,
  GetUserProductList,
  UpdateProductVitalInfo,
  UseParentProductToAddVariant,
} from "@repo/api/product";
import { id, productDetailsParams } from "@repo/db";
export const addProductZI = z.object({
  brandName: z.string(),
  categoryName: z.string(),
  productName: z.string(),
  productVitalInfo: productDetailsParams.omit({ productName: true }).optional(),
  currency: z.union([z.literal("INR"), z.literal("USD")]),
  pricePerUnit: z.number(),
  primaryImageUrl: z.string().url(),
});
export const addVariantWithParentZI = z.object({
  parentProductId: id,
});
export const updateProductZI = z.object({
  productId: id,
  productVitalInfo: productDetailsParams,
});
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
    .input(addProductZI)
    .output(z.object({}))
    .mutation(
      async ({
        input: {
          brandName,
          categoryName,
          productVitalInfo,
          productName,
          primaryImageUrl,
          currency,
          pricePerUnit,
        },
        ctx: { userId },
      }) => {
        const res = await AddNewProduct({
          currency,
          pricePerUnit,
          brandName,
          categoryName,
          productVitalInfo,
          productName,
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
    .input(addVariantWithParentZI)
    .output(z.object({}))
    .mutation(async ({ input: { parentProductId } }) => {
      const response = await UseParentProductToAddVariant(parentProductId);
      return response;
    }),
  updateProduct: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/update-product",
        tags: ["Products"],
      },
    })
    .input(updateProductZI)
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
