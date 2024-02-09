import { mergeRouters } from "../../trpc";
import { brandRouter } from "./brand";
import { categoryRouter } from "./category";
import { imagesRouter } from "./images";
import { moreDetailsRouter } from "./moreDetails";
import { priceRouter } from "./price";
import { productRouter } from "./product";

export const productAPI = mergeRouters(
  categoryRouter,
  brandRouter,
  priceRouter,
  imagesRouter,
  moreDetailsRouter,
  productRouter,
);
