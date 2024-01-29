import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  ImageMetaDataRetriever,
  addProperties,
  classCreator,
} from "@repo/api/image-search";
import {
  MetadataKeysArray,
  metadataType,
} from "@repo/api/image-search/schemaConfig";
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
      }),
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
        imageBase64: z.string().url(),
        metadata: z.object({}), // import metadataType in the frontend to get the types
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input }) => {
      const response = await addProperties({
        className: input.className,
        image: input.imageBase64,
        metadata: input.metadata as metadataType,
      });
      return response;
    }),

  getSimilarImageMetaData: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "GET",
        path: "/get-similar-image-metadata",
        tags: ["ImageSearch"],
      },
    })
    .input(
      z.object({
        className: z.string(),
        imageBase64: z.string().url(),
        fields: z.object({}), // import metadataKeysArray
        metadata: z.object({}), // import metadataType in the frontend to get the types
      }),
    )
    .output(z.object({}))
    .query(async ({ input }) => {
      const response = await ImageMetaDataRetriever({
        className: input.className,
        fields: input.fields as MetadataKeysArray,
        image: input.imageBase64,
      });
      return response;
    }),
});
