import { mergeRouters } from "../../trpc";
import { brandRouter } from "./brand";
import { categoryRouter } from "./category";
import { imagesRouter } from "./images";
import { moreDetailsRouter } from "./moreDetails";
import { priceRouter } from "./price";

export const productRouter = mergeRouters(
  categoryRouter,
  brandRouter,
  priceRouter,
  imagesRouter,
  moreDetailsRouter
);
