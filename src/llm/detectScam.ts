import { detectScamPrompt } from "../lib/prompts.js";
import type { Message, ScamDetectionResponse } from "../lib/types.js";
import { openai } from "./openaiClient.js";

export async function detectScam(message: string, history: Message[]) {
  const prompt = detectScamPrompt(message, history);
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  if (!response || !response.choices || response.choices.length === 0) {
    throw new Error("No response from OpenAI");
  }

  const rawResponse = response.choices[0]?.message.content;
  if (!rawResponse) {
    throw new Error("Empty response from LLM");
  }

  let parsedResponse: ScamDetectionResponse;

  try {
    parsedResponse = JSON.parse(rawResponse);
  } catch (error) {
    throw new Error(`Invalid JSON from LLM: ${rawResponse}`);
  }

  return parsedResponse;
}
