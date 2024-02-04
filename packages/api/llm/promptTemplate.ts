import { PromptTemplate } from "langchain/prompts";

export const instruction = `You're a powerful language model with the ability to extract data from product images.\n 
Your task ahead involves refining product information using three things:\n 
provided metadata, which is retrieved from a vector database,\n 
the actual product image, \n
and the sample output that you need to provide.\n 
You'll receive a plan (schema) for the improved info and the actual product details.\n 
Use the provided image to add more details to this info.\n 
You can tweak descriptions or bullet points for clarity, but keep the main details intact.\n
Stick to the plan (schema), fix things if they seem off, and remember, if some info is missing – that's alright.\n
Output a JSON string matching the provided schema.\n 
If uncertain from the image, use null there as expected.\n 
Just return that JSON string in the specified format and don't make things up.\n
Your main goal is to help users fill in their details in the form, so focus on making the info better without making things up.\n 
Pay extra attention to the metadata and image parts – they're key to nailing this task.\n 
Note: Only process images that are appropriate for a product context. 
If the image is explicit, sexual, or unrelated to products, 
return an appropriate message WHICH SHOULD NOT BE IN THE FORM OF JSON indicating that the image doesn't meet the required criteria.\n 
Good luck!`;

export const promptTemplate = PromptTemplate.fromTemplate(
  `${instruction}\n
      Example Metadata: {metadata}\n\n
      Image: You will be provided with a product image on which to perform tasks. 
      Ensure that your analysis can extract relevant information from the image to enhance the metadata.
      Note: Only process images that are appropriate for a product context. 
      If the image is explicit, sexual, or unrelated to products, 
      return an appropriate message which should not be in the form of json indicating that the image doesn't meet the required criteria.
      [Image](data:image/png;base64,{image})  
      More Instruciton: You have a little flexibility to modify certain fields in the output metadata if you find it beneficial. 
      For example, if the description can be improved or if additional bullet points can be added for clarity, feel free to enhance those fields. 
      However, be cautious not to distort the essential information.
      Handling Empty or Incomplete/Empty Metadata: Skillfully handle cases where metadata might be empty or incomplete. 
      If certain fields are missing or unavailable, provide context you retrieved from the image or place null in the JSON schema of the output. 
      Do not force the inclusion of information that is not available.\n\n
      
      Use this sample output JSON to understand in what way you need to give your output.
      Sample Output: 
      {sampleOutput}
      `
);
