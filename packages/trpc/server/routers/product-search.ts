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
  updateProductMetadataByImage,
  updateProductMetadataByText,
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
        propertyId: z.string(),
        imageURL: z.string().url(),
        metadata: z.string(),
      }),
    )
    .output(z.object({}))
    .mutation(async ({ input: { propertyId, imageURL, metadata } }) => {
      const imageBase64 = await imageURLToBase64(imageURL);
      await updateProductMetadataByImage(propertyId, {
        className: SEARCH_BY_IMAGE_CLASS,
        imageBase64,
        metadata: metadata as ProductSearchVectorSchema,
      });
      await updateProductMetadataByText(propertyId, {
        className: SEARCH_BY_TEXT_CLASS,
        metadata: metadata as ProductSearchVectorSchema,
      });
      return { msg: "Product's image metadata updated" };
    }),
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
