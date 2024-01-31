import { llm } from ".";

interface InvokeLLMProps<T> {
  stringifiedMetadata: string;
  imageBase64: string;
  stringifiedSampleJsonOutput: string;
}
export async function invokeLLM<T>({
  stringifiedMetadata: metadata,
  imageBase64: image,
  stringifiedSampleJsonOutput: sampleOutput,
}: InvokeLLMProps<T>) {
  try {
    const responseString = await llm.invoke({ metadata, image, sampleOutput });
    const parsedResponse: T = JSON.parse(responseString);
    console.log(parsedResponse);

    if (typeof parsedResponse !== "object" || parsedResponse === null) {
      throw new Error("Invalid JSON format in the response.");
    }

    return parsedResponse;
  } catch (error) {
    throw new Error((error as Error).message ?? "Error invoking llm");
  }
}
