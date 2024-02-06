import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { AddBrand } from "@repo/api/product";
import { addBrandParams } from "@repo/db";
export const addBrandZI = z.object({
  brandData: addBrandParams,
});
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
});
