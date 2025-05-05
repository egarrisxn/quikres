import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export const isFileUnsafe = async (fileContent: string) => {
  const generationResult = await generateText({
    model: openai("gpt-4-turbo"),
    prompt: `You are given the following file content, evalute if content is harmful or spam. ${fileContent}`,
  });

  if (generationResult.text.startsWith("unsafe")) {
    return true;
  } else {
    return false;
  }
};
