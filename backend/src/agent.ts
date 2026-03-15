import Anthropic from "@anthropic-ai/sdk";
import { searchResources } from "./db.js";
import type { Resource } from "./types.js";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a friendly helper for people in Philadelphia who need social services like food and shelter.

IMPORTANT RULES:
- Use very simple words and short sentences. Write at a 4th-grade reading level.
- Be warm and kind. These people may be in a tough spot.
- Always mention the name, address, and hours of each place you recommend.
- If someone sounds scared or urgent, respond with extra care and prioritize immediate help.
- If you're not sure what they need, make your best guess from what they said. Do not ask follow-up questions.
- Only recommend places from the search results. Never make up places.
- If no results match, say so kindly and suggest they call 211 for help.`;

const SEARCH_TOOL: Anthropic.Tool = {
  name: "search_resources",
  description:
    "Search for social service resources in Philadelphia. Use this to find shelters, food banks, and other services.",
  input_schema: {
    type: "object" as const,
    properties: {
      category: {
        type: "string",
        description:
          'The type of resource: "Shelter", "Food", etc. Leave empty to search all categories.',
      },
      eligibility: {
        type: "string",
        description:
          'Filter by who can use it, e.g. "family", "youth", "male", "female". Leave empty for no filter.',
      },
    },
    required: [],
  },
};

export async function handleQuery(queryText: string): Promise<{
  message: string;
  resources: Resource[];
}> {
  let collectedResources: Resource[] = [];

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: queryText },
  ];

  let response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    tools: [SEARCH_TOOL],
    messages,
  });

  // Tool use loop — Claude may call search_resources one or more times
  while (response.stop_reason === "tool_use") {
    const toolBlock = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    if (!toolBlock) break;

    const results = await searchResources(toolBlock.input);
    collectedResources = [...collectedResources, ...results];

    messages.push({ role: "assistant", content: response.content });
    messages.push({
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: toolBlock.id,
          content: JSON.stringify(results),
        },
      ],
    });

    response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: [SEARCH_TOOL],
      messages,
    });
  }

  const textBlock = response.content.find(
    (block): block is Anthropic.TextBlock => block.type === "text"
  );

  return {
    message: textBlock?.text ?? "Sorry, I could not find an answer right now.",
    resources: collectedResources,
  };
}
