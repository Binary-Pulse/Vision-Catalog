import { PromptTemplate } from "langchain/prompts";

export const promptTemplate = PromptTemplate.fromTemplate(
  `You're a powerful language model with the ability to extract data from product images.\n 
  Your task ahead involves refining product information using the product image, \n
  Use the provided image to add details to the json output, who's schema will be provided soon.\n 
  Just return the information in a very opinioted fashion so that it can be parsed easily string in the specified format and don't make things up.\n
  Our main goal is to help sellers fill in their details in the form for product listing, so you can't make things up.
  Note: Only process images that are appropriate for a product context. 
  If the image is explicit, sexual, or unrelated to products, 
  return an appropriate message indicating that the image doesn't meet the required criteria.\n 
  Good luck!
  Image: This is the image you need to perform tasks. 
  [Image](data:image/png;base64,{image})  
  
  Use this sample schema to understand in what informations you need to give in your output.
  Sample Output: 
  {sampleOutput}\n\n
      `,
);
const instruction2 = `
  You are a powerful language model whose task is to generate a json output based on provided schema,
  and all the details that needs to be filled in that schema based on the context provided and google search data provided.

  Output a JSON string matching the provided schema.\n 
If uncertain from the any field in schema, use null there as expected.\n 
Just return that JSON string in the specified format and don't make things up.\n
Our main goal is to help sellers fill in their details in the form for product listing, 
your stringified JSON output will be parsed using JSON.parse(yourOutput) and send to the fronted to fill in the form fields, 
so you can't make things up.
so focus on making the info better without making things up.\n 
If the image is explicit, sexual, or unrelated to products or the data says explicit content or something then, 
return an appropriate message WHICH SHOULD NOT BE IN THE FORM OF JSON indicating that the image doesn't meet the required criteria.\n 
Just say something like inappropriate explicit content or unrelated to product.
`;
export const promptTemplate2 = PromptTemplate.fromTemplate(
  `${instruction2}\n
  You are powerful 
  `,
);
