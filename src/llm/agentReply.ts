import { openai } from "./openaiClient.js";
import type { Message, Session } from "../lib/types.js";
import { agentReplyPrompt } from "../lib/prompts.js";

export default async function agentReply(
  messages: Message[],
  metadata?: Session["metadata"],
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: agentReplyPrompt(messages, metadata) }],
    temperature: 0.6,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from OpenAI agent");
  }

  return content.trim();
}
