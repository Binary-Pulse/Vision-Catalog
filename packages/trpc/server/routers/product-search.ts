import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  SEARCH_BY_IMAGE_CLASS,
  SEARCH_BY_TEXT_CLASS,
  imageURLToBase64,
} from "@repo/utils";
import {
  ImageVectorMetadataRetriever,
  TextVectorMetadataRetriever,
  addProductMetadataByImage,
  addProductMetadataByText,
} from "@repo/api/vector-search";
import { ProductSearchVectorSchema } from "@repo/api/vector-search/schemaConfig";
export const productSearchRouter = createTRPCRouter({
  addProductMetadata: protectedProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/add-product-metadata",
        tags: ["ProductSearch"],
      },
    })
    .input(
      z.object({
        imageURL: z.string().url(),
        metadata: z.string(),
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input: { imageURL, metadata } }) => {
      const imageBase64 = await imageURLToBase64(imageURL);
      await addProductMetadataByImage({
        className: SEARCH_BY_IMAGE_CLASS,
        imageBase64,
        metadata: metadata as ProductSearchVectorSchema,
      });
      await addProductMetadataByText({
        className: SEARCH_BY_TEXT_CLASS,
        metadata: metadata as ProductSearchVectorSchema,
      });
      return { msg: "Product's metadata added" };
    }),
  getSimilarProductMetadata: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/get-similar-product-metadata",
        tags: ["ImageSearch"],
      },
    })
    .input(
      z.discriminatedUnion("searchWith", [
        z.object({
          searchWith: z.literal("Text"),
          text: z.string(),
        }),
        z.object({
          searchWith: z.literal("Image"),
          imageURL: z.string().url(),
        }),
      ]),
    )
    .output(z.object({}))
    .mutation(async ({ input }) => {
      if (input.searchWith === "Image") {
        const imageBase64 = await imageURLToBase64(input.imageURL);
        const response = await ImageVectorMetadataRetriever({
          className: SEARCH_BY_IMAGE_CLASS,
          image: imageBase64,
        });
        return response;
      }
      const response = await TextVectorMetadataRetriever({
        className: SEARCH_BY_TEXT_CLASS,
        text: input.text,
      });
      return response;
    }),
});
