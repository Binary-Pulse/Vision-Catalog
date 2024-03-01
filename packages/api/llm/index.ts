import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableSequence } from "langchain/schema/runnable";
import { promptTemplate, promptTemplate2 } from "./promptTemplate";
import { StringOutputParser } from "langchain/schema/output_parser";

import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.GEMINI_VISION_PRO_API_KEY) {
  throw new Error("GEMINI_VISION_PRO_API_KEY is not set in your env");
}

export const vision = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_VISION_PRO_API_KEY,
  streaming: false,
  temperature: 0.7,
  modelName: "gemini-pro-vision",
});
export const pro = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_VISION_PRO_API_KEY,
  streaming: false,
  temperature: 0.4,
  modelName: "gemini-pro",
});
const visionChain = promptTemplate.pipe(vision).pipe(new StringOutputParser());

export const llm = RunnableSequence.from([
  {
    imageData: visionChain,
    sampleOutput: (input) => input.sampleOutput,
  },
  promptTemplate2,
  vision,
  new StringOutputParser(),
]);

export * from "./promptTemplate";
