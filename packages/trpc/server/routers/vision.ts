import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { invokeLLM } from "@repo/api/llm";
import {
  ImageVectorMetadataRetriever,
  ProductListFormSchema,
  sampleProductListForm,
} from "@repo/api/vector-search";
import { imageURLToBase64 } from "@repo/utils";
export const visionProRouter = createTRPCRouter({
  getProductMetadataByImage: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/create-class",
        tags: ["ImageSearch"],
      },
    })
    .input(
      z.object({
        className: z.string(),
        imageURL: z.string().url(),
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input }) => {
      const image = await imageURLToBase64(input.imageURL);
      const metadata = await ImageVectorMetadataRetriever({
        className: input.className,
        image,
      });
      const stringifiedMetadata = JSON.stringify(metadata);
      const stringifiedSampleJsonOutput = JSON.stringify(sampleProductListForm);
      const response = await invokeLLM<ProductListFormSchema>({
        stringifiedMetadata,
        imageBase64: image,
        stringifiedSampleJsonOutput,
      });
      return response;
    }),
});
