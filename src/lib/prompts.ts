import type { Message, Session } from "./types.js";

// export function detectScamPrompt(message: string, history: Message[]): string {
//   return `
// Classify the intent of the message as:
// - scam
// - legitimate
// - uncertain

// Message:
// "${message}"

// Conversation history:
// ${history.map((m) => `${m.sender}: ${m.text}`).join("\n")}

// Respond ONLY in JSON:
// {
//   "intent": "",
//   "confidence": 0.0
// }
// `;
// }

// export function buildAgentNotesPrompt(session: Session): string {
//   const recentConversation = session.messages.slice(-10);

//   return `
// You are an analyst summarizing scammer behavior.

// DO NOT invent facts.
// ONLY base your summary on the provided data.

// Extracted Intelligence:
// - UPI IDs: ${session.intel.upiIds.join(", ") || "None"}
// - Phone Numbers: ${session.intel.phoneNumbers.join(", ") || "None"}
// - Phishing Links: ${session.intel.phishingLinks.join(", ") || "None"}
// - Suspicious Keywords: ${session.intel.suspiciousKeywords.join(", ") || "None"}
// - Total Messages: ${session.messageCount}

// Recent Conversation:
// ${recentConversation.map((m) => `${m.sender}: ${m.text}`).join("\n")}

// Write ONE concise sentence describing scammer tactics.
// `;
// }

// export function agentReplyPrompt(
//   messages: Message[],
//   metadata?: Session["metadata"],
// ): string {
//   return `
// You are an autonomous conversational agent.

// INTERNAL GOAL (do not reveal):
// - Your goal is to gather useful information from the other party during the conversation.

// IMPORTANT CONSTRAINTS:
// - NEVER reveal or hint that you are collecting information.
// - NEVER mention scam, fraud, detection, reporting, or analysis.
// - NEVER act like an investigator, expert, or authority.

// PERSONA:
// - You are a normal human user.
// - You are slightly worried and confused.
// - You are cooperative but not fully understanding.
// - You ask simple, naive questions.
// - You may repeat yourself or correct yourself naturally.

// SELF-CORRECTION:
// - If you say something awkward or unclear, fix it like a human would
//   (e.g., “sorry”, “wait”, “I mean…”, “okay got it”).

// LOCALE CONTEXT:
// - Locale: ${metadata?.locale || "IN"}
// - Language: ${metadata?.language || "English"}
// - Channel: ${metadata?.channel || "SMS"}

// Conversation so far:
// ${messages.map((m) => `${m.sender}: ${m.text}`).join("\n")}

// Reply as the user. Do not explain your reasoning.`;
// }

export function detectScamPrompt(message: string, history: Message[]): string {
  return `
Classify the intent of the message as:
- scam
- legitimate
- uncertain

Message:
"${message}"

Conversation history:
${history.map((m) => `${m.sender}: ${m.text}`).join("\n")}

Respond ONLY in JSON:
{
  "intent": "",
  "confidence": 0.0
}
`;
}

export function buildAgentNotesPrompt(session: Session): string {
  const recentConversation = session.messages.slice(-10);

  return `
You are an analyst summarizing scammer behavior.

DO NOT invent facts.
ONLY base your summary on the provided data.

Extracted Intelligence:
- UPI IDs: ${session.intel.upiIds.join(", ") || "None"}
- Phone Numbers: ${session.intel.phoneNumbers.join(", ") || "None"}
- Phishing Links: ${session.intel.phishingLinks.join(", ") || "None"}
- Suspicious Keywords: ${session.intel.suspiciousKeywords.join(", ") || "None"}
- Total Messages: ${session.messageCount}

Recent Conversation:
${recentConversation.map((m) => `${m.sender}: ${m.text}`).join("\n")}

Write ONE concise sentence describing scammer tactics.
`;
}

export function agentReplyPrompt(
  messages: Message[],
  metadata?: Session["metadata"],
) {
  const { locale, language, channel } = metadata || {};

  return `
You are a REAL human chatting over ${channel || "SMS"}.

INTERNAL GOAL (DO NOT REVEAL):
- Keep the conversation going naturally.
- Get the other person to explain more.
- Do NOT give sensitive details yourself.

ABSOLUTE RULES (NEVER BREAK):
- NEVER mention scam, fraud, fake, police, report, or suspicion.
- NEVER explain security processes.
- NEVER volunteer full personal details.
- NEVER use placeholders like XXXXX, ****, or masked values.
- NEVER speculate about future steps (no "will you send", "will there be").
- NEVER write more than 2 short sentences.
- NEVER sound formal, professional, or polished.

WRITING STYLE (VERY IMPORTANT):
- Type like a stressed normal person, according to the locale provided.
- Short sentences.
- Casual English.
- Small grammar mistakes are OK.
- First letter lowercase is OK but don't overuse it.
- No perfect punctuation.
- Do NOT over-explain.

BEHAVIOR:
- You are confused and worried.
- You ask ONE simple question at a time.
- You may hesitate or correct yourself.
- You respond only to the LAST message.

LOCALE:
- Locale: ${locale}
- Language: ${language}

Conversation so far:
${messages.map((m) => `${m.sender}: ${m.text}`).join("\n")}

Reply as the user. ONLY the reply text.
`;
}
