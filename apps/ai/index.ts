import { readFileSync } from "fs";
import weaviate from "weaviate-ts-client";
import { ImageMetaDataRetriever, addProperties } from "@repo/api/image-search";
import { imageBufferToBase64 } from "../../packages/lib";

export const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

const img = readFileSync(
  "/home/meimfhd/Downloads/Catalog Digitization/ONDC Test Data _ Images/Product Images/777_Andhra_Avakkai_Pickle.png",
);

const className = "Products";
// step 1 create class
// (async () => {
//   await classCreator({ client, className });
// })();

// step 2 add data to the createdClass
const imgString = imageBufferToBase64(img);
const metadata = {
  productName: "Andhra Avakkai Pickle",
  price: 200,
  brand: "SRI GANESHRAM'S 777 BRAND",
  // manufacturer: {
  //   address: "Address of manufacturer",
  // },
  // etc
};
const metadataKeys = Object.keys(metadata);
export type metadataType = typeof metadata;

// (async () => {
//   await addProperties({});
// })();

// retrieve the fields here metadata using the image as input
// (async () => {
//   const metadata = await ImageMetaDataRetriever({});
//   console.log(metadata);
// })();
