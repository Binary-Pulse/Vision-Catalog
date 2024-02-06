import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  SEARCH_BY_IMAGE_CLASS,
  SEARCH_BY_TEXT_CLASS,
  imageURLToBase64,
} from "@repo/utils";
import {
  ImageVectorMetadataRetriever,
  TextVectorMetadataRetriever,
} from "@repo/api/vector-search";
import { ProductSearchVectorSchema } from "@repo/api/vector-search/schemaConfig";

export const searchByImageZI = z.object({
  imageURL: z.string().url(),
});
export const searchByTextZI = z.object({
  text: z.string(),
});
export const productSearchRouter = createTRPCRouter({
  searchByImage: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/search-by-image",
        tags: ["ProductSearch"],
      },
    })
    .input(searchByImageZI)
    .output(z.array(ProductSearchVectorSchema))
    .mutation(async ({ input }) => {
      const imageBase64 = await imageURLToBase64(input.imageURL);
      const response = await ImageVectorMetadataRetriever({
        className: SEARCH_BY_IMAGE_CLASS,
        image: imageBase64,
      });
      return response;
    }),
  searchByText: publicProcedure
    .meta({
      /* 👉 */ openapi: {
        method: "POST",
        path: "/search-by-text",
        tags: ["ProductSearch"],
      },
    })
    .input(searchByTextZI)
    .output(z.array(ProductSearchVectorSchema))
    .mutation(async ({ input }) => {
      const response = await TextVectorMetadataRetriever({
        className: SEARCH_BY_TEXT_CLASS,
        text: input.text,
      });
      return response;
    }),
  // addProductMetadata: protectedProcedure
  //   .input(
  //     z.object({
  //       imageURL: z.string().url(),
  //       metadata: z.object({}),
  //     }),
  //   )
  //   .output(z.object({}))
  //   .mutation(async ({ input: { imageURL, metadata } }) => {
  //     const imageBase64 = await imageURLToBase64(imageURL);
  //     const response = await addNewProductMetadata({
  //       imageBase64,
  //       imageClassName: SEARCH_BY_IMAGE_CLASS,
  //       metadata: metadata as ProductSearchVectorType,
  //       textClassName: SEARCH_BY_TEXT_CLASS,
  //     });
  //     return response;
  //   }),
  // updateProductMetadata: protectedProcedure
  //   .input(
  //     z.object({
  //       vectorImageObjId: z.string(),
  //       vectorTextObjId: z.string(),
  //       imageURL: z.string().url(),
  //       metadata: z.object({}),
  //     }),
  //   )
  //   .output(z.object({}))
  //   .mutation(
  //     async ({
  //       input: { vectorImageObjId, vectorTextObjId, imageURL, metadata },
  //     }) => {
  //       const imageBase64 = await imageURLToBase64(imageURL);
  //       updateProductMetadata({
  //         imageBase64,
  //         imageClassName: SEARCH_BY_IMAGE_CLASS,
  //         vectorImageObjId,
  //         vectorTextObjId,
  //         metadata: metadata as ProductSearchVectorType,
  //         textClassName: SEARCH_BY_TEXT_CLASS,
  //       });
  //       return { msg: "Product's image metadata updated" };
  //     },
  //   ),
});
