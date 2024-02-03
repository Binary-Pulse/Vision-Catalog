import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { invokeLLM } from "@repo/api/llm";
import { URLOrB64ToB64 } from "../../../lib";
import {
  ImageProductVectorRetriever,
  ProductListFormSchema,
  sampleProductListForm,
} from "@repo/api/image-search";
export const visionProRouter = createTRPCRouter({
  ProductDataExtractionService: publicProcedure
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
        imageBase64: z.string().optional(),
        imageURL: z.string().url().optional(),
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input }) => {
      const image = await URLOrB64ToB64({
        imageBase64: input.imageBase64,
        imageURL: input.imageURL,
      });
      const metadata = await ImageProductVectorRetriever({
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
