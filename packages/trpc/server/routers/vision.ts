import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { invokeLLM } from "@repo/api/llm";
import {
  ImageVectorMetadataRetriever,
  ProductListFormSchema,
  sampleProductListForm,
} from "@repo/api/vector-search";
import { SEARCH_BY_IMAGE_CLASS, imageURLToBase64 } from "@repo/utils";
export const visionProRouter = createTRPCRouter({
  vision: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/vision",
        tags: ["ai"],
      },
    })
    .input(
      z.object({
        imageURL: z.string().url(),
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input }) => {
      const image = await imageURLToBase64(input.imageURL);
      const stringifiedSampleJsonOutput = JSON.stringify(sampleProductListForm);
      const response = await invokeLLM({
        imageBase64: image,
        stringifiedSampleJsonOutput,
      });
      return response;
    }),
});
