import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { AddCategory } from "@repo/api/product";
import { addCategoryZI } from "../input-zod-schema";

export const categoryRouter = createTRPCRouter({
  addCategory: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-category",
        tags: ["Internal"],
      },
    })
    .input(addCategoryZI)
    .output(z.object({}))
    .mutation(async ({ input: { categoryData } }) => {
      const res = await AddCategory({
        categoryData,
      });
      return res;
    }),
  getCategoryList: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-category-list",
        tags: ["Internal"],
      },
    })
    .input(z.undefined())
    .output(z.array(z.object({ name: z.string(), id: z.string() })).optional())
    .query(async () => {
      const categoryList = await db?.category.findMany({
        select: { name: true, id: true },
      });
      return categoryList;
    }),
});
