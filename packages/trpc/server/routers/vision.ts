import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { invokeLLM } from "@repo/api/llm";
import { URLOrB64ToB64 } from "../../../lib";
import {
  ImageMetaDataRetriever,
  MetadataKeysArray,
  ProductMetadataType,
  sampleProductMetadata,
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
        fields: z.array(z.string()), // import metadataKeysArray
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input }) => {
      const image = await URLOrB64ToB64({
        imageBase64: input.imageBase64,
        imageURL: input.imageURL,
      });
      const metadata = await ImageMetaDataRetriever({
        className: input.className,
        fields: input.fields as MetadataKeysArray,
        image,
      });
      const stringifiedMetadata = JSON.stringify(metadata);
      const stringifiedSampleJsonOutput = JSON.stringify(sampleProductMetadata);
      const response = await invokeLLM<ProductMetadataType>({
        stringifiedMetadata,
        imageBase64: image,
        stringifiedSampleJsonOutput,
      });
      return response;
    }),
});
