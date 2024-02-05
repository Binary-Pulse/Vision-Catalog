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
  addNewProductMetadata,
  updateProductMetadata,
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
        metadata: z.object({}),
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input: { imageURL, metadata } }) => {
      const imageBase64 = await imageURLToBase64(imageURL);
      const response = await addNewProductMetadata({
        imageBase64,
        imageClassName: SEARCH_BY_IMAGE_CLASS,
        metadata: metadata as ProductSearchVectorSchema,
        textClassName: SEARCH_BY_TEXT_CLASS,
      });
      return response;
    }),
  updateProductMetadata: protectedProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/update-product-metadata",
        tags: ["ProductSearch"],
      },
    })
    .input(
      z.object({
        imageClassPropertyId: z.string(),
        textClassPropertyId: z.string(),
        imageURL: z.string().url(),
        metadata: z.object({}),
      }),
    )
    .output(z.object({}))
    .mutation(
      async ({
        input: {
          imageClassPropertyId,
          textClassPropertyId,
          imageURL,
          metadata,
        },
      }) => {
        const imageBase64 = await imageURLToBase64(imageURL);
        updateProductMetadata({
          imageBase64,
          imageClassName: SEARCH_BY_IMAGE_CLASS,
          imageClassPropertyId,
          metadata: metadata as ProductSearchVectorSchema,
          textClassName: SEARCH_BY_TEXT_CLASS,
          textClassPropertyId,
        });
        return { msg: "Product's image metadata updated" };
      },
    ),
  getSimilarProductMetadata: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/get-similar-product-metadata",
        tags: ["ProductSearch"],
      },
    })
    .input(
      z.object({
        union: z.discriminatedUnion("searchWith", [
          z.object({
            searchWith: z.literal("Text"),
            text: z.string(),
          }),
          z.object({
            searchWith: z.literal("Image"),
            imageURL: z.string().url(),
          }),
        ]),
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input }) => {
      if (input.union.searchWith === "Image") {
        const imageBase64 = await imageURLToBase64(input.union.imageURL);
        const response = await ImageVectorMetadataRetriever({
          className: SEARCH_BY_IMAGE_CLASS,
          image: imageBase64,
        });
        return response;
      }
      const response = await TextVectorMetadataRetriever({
        className: SEARCH_BY_TEXT_CLASS,
        text: input.union.text,
      });
      return response;
    }),
});
