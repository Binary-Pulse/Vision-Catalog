import { generateOpenApiDocument } from "trpc-openapi";
import { appRouter } from "../server/routers/_app";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Vision Catalog Open Api Swagger",
  description: "OpenAPI compliant REST API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl:
    process.env.VERCEL_ENV === "production"
      ? (process.env.NEXT_PUBLIC_APP_URL as string)
      : "http://localhost:3000",
  tags: ["auth", "computers"],
});

export * from "trpc-openapi";
