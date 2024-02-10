import { llm } from ".";

interface InvokeLLMProps {
  imageBase64: string;
  stringifiedSampleJsonOutput: string;
}

export async function invokeLLM({
  imageBase64: image,
  stringifiedSampleJsonOutput: sampleOutput,
}: InvokeLLMProps) {
  try {
    const responseString = await llm.invoke({
      image,
      sampleJsonOutput: sampleOutput,
    });

    try {
      const parsedResponse = JSON.parse(responseString);
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
