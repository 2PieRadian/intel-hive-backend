import { buildAgentNotesPrompt } from "../lib/prompts.js";
import type { Session } from "../lib/types.js";
import { openai } from "./openaiClient.js";

export default async function buildAgentNotes(
  session: Session,
): Promise<string> {
  let notes = "";

  const agentNotesPrompt = buildAgentNotesPrompt(session);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: agentNotesPrompt }],
    temperature: 0.2,
    max_completion_tokens: 60,
  });

  if (!response || !response.choices || response.choices.length === 0) {
    return notes;
  }

  return response.choices[0]?.message.content || notes;
}
