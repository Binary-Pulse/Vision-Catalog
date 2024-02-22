import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  AddNewProduct,
  GetUserProductList,
  UpdateProductVitalInfo,
  UseParentProductToAddVariant,
} from "@repo/api/product";
import {
  addProductZI,
  addVariantWithParentZI,
  updateProductZI,
} from "../input-zod-schema";
import { TRPCError } from "@trpc/server";

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
    .query(async ({ ctx: { userId } }) => {
      try {
        const res = await GetUserProductList(userId);
        return res?.products || [];
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message ?? "Error, please try again",
        });
      }
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
        try {
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
        } catch (error) {
          console.log(error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message ?? "Error, please try again",
          });
        }
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
