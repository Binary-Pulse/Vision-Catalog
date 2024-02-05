import { llm } from ".";
import { ProductListFormSchema } from "../vector-search";

interface InvokeLLMProps<T> {
  stringifiedMetadata: string;
  imageBase64: string;
  stringifiedSampleJsonOutput: string;
}

export async function invokeLLM<T>({
  stringifiedMetadata: metadata,
  imageBase64: image,
  stringifiedSampleJsonOutput: sampleOutput,
}: InvokeLLMProps<ProductListFormSchema>) {
  try {
    const responseString = await llm.invoke({
      metadata,
      image,
      sampleJsonOutput: sampleOutput,
    });

    try {
      const parsedResponse: T = JSON.parse(responseString);
      if (typeof parsedResponse !== "object" || parsedResponse === null) {
        throw new Error("Invalid JSON format in the response.");
      }
      return parsedResponse;
    } catch (jsonParseError) {
      throw new Error(
        `Error parsing JSON: ${(jsonParseError as Error).message}`,
      );
    }
  } catch (error) {
    throw new Error((error as Error).message ?? "Error invoking llm");
  }
}
