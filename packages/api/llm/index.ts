import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableSequence } from "langchain/schema/runnable";
import { promptTemplate } from "./promptTemplate";
import { StringOutputParser } from "langchain/schema/output_parser";

import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.GEMINI_VISION_PRO_API_KEY) {
  throw new Error("GEMINI_VISION_PRO_API_KEY is not set in your env");
}

export const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_VISION_PRO_API_KEY,
  streaming: false,
  temperature: 0.4,
  modelName: "gemini-pro-vision",
  maxOutputTokens: 2048,
});

export const llm = RunnableSequence.from([
  {
    metadata: (input) => input.metadata,
    image: (input) => input.image,
    sampleOutput: (input) => input.sampleOutput,
  },
  promptTemplate,
  model,
  new StringOutputParser(),
]);

export * from "./mutation";
export * from "./promptTemplate";
