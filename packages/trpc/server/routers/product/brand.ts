import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { AddBrand } from "@repo/api/product";
import { addBrandParams } from "@repo/db";
import { addBrandZI } from "../input-zod-schema";

export const brandRouter = createTRPCRouter({
  addBrand: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-brand",
        tags: ["Internal"],
      },
    })
    .input(addBrandZI)
    .output(z.object({}))
    .mutation(async ({ input: { brandData } }) => {
      const res = await AddBrand({
        brandData,
      });
      return res;
    }),
  getBrandList: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-brand-list",
        tags: ["Internal"],
      },
    })
    .input(z.undefined())
    .output(z.object({}))
    .query(async () => {
      const brandList = await db?.brand.findMany({ select: { name: true } });
      return brandList;
    }),
});
