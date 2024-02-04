import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  ImageProductVectorRetriever,
  addProperties,
  classCreator,
} from "@repo/api/image-search";
import { ProductSearchVectorSchema } from "@repo/api/image-search/schemaConfig";
import { URLOrB64ToB64 } from "../../../lib";
export const imageSearchRouter = createTRPCRouter({
  createClass: publicProcedure
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
      })
    )
    .output(z.object({}))
    .mutation(async ({ input }) => {
      const response = await classCreator({ className: input.className });
      return response;
    }),

  addDataToClassProps: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-data-to-class",
        tags: ["ImageSearch"],
      },
    })
    .input(
      z.object({
        className: z.string(),
        imageBase64: z.string().optional(),
        imageURL: z.string().url().optional(),
        metadata: z.object({}), // import ProductSearchVectorSchema in the frontend to get the types
      })
    )
    .output(z.object({}))
    .mutation(async ({ input }) => {
      const response = await addProperties({
        className: input.className,
        imageURL: input.imageURL,
        imageBase64: input.imageBase64,
        metadata: input.metadata as ProductSearchVectorSchema,
      });
      return response;
    }),

  getSimilarImageMetaData: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/get-similar-image-metadata",
        tags: ["ImageSearch"],
      },
    })
    .input(
      z.object({
        className: z.string(),
        imageBase64: z.string().optional(),
        imageURL: z.string().url().optional(),
        fields: z.array(z.string()), // import metadataKeysArray
      })
    )
    .output(z.object({}))
    .mutation(async ({ input }) => {
      const image = await URLOrB64ToB64({
        imageBase64: input.imageBase64,
        imageURL: input.imageURL,
      });

      const response = await ImageProductVectorRetriever({
        className: input.className,
        image,
      });
      return response;
    }),
});
