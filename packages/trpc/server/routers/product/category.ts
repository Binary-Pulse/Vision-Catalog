import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../trpc";
import { AddCategory } from "@repo/api/product";
import { addCategoryParams } from "@repo/db";
export const categoryRouter = createTRPCRouter({
  addCategory: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-category",
        tags: ["Products"],
      },
    })
    .input(
      z.object({
        categoryData: addCategoryParams,
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input: { categoryData } }) => {
      const res = await AddCategory({
        categoryData,
      });
      return res;
    }),
});
