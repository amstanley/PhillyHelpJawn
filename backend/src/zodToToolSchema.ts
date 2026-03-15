import type { z } from "zod";
import type Anthropic from "@anthropic-ai/sdk";

/**
 * Converts a Zod object schema to a JSON Schema compatible with
 * Anthropic's tool input_schema format.
 *
 * Handles: string, number, boolean, optional, and .describe().
 * Not a general-purpose converter — just enough for our tool definitions.
 */
export function zodToToolSchema(
  schema: z.ZodObject<any>
): Anthropic.Tool["input_schema"] {
  const shape = (schema as any)._zod.def.shape as Record<string, any>;
  const properties: Record<string, any> = {};
  const required: string[] = [];

  for (const [key, field] of Object.entries(shape)) {
    const zodDef = (field as any)._zod.def;
    const isOptional = zodDef.type === "optional";
    const inner = isOptional ? zodDef.innerType : field;
    const innerType = isOptional
      ? inner._zod?.def?.type ?? inner.type
      : zodDef.type;

    const prop: Record<string, any> = {};

    switch (innerType) {
      case "string":
        prop.type = "string";
        break;
      case "number":
        prop.type = "number";
        break;
      case "boolean":
        prop.type = "boolean";
        break;
      default:
        prop.type = "string";
    }

    const description = inner?.description ?? inner?._zod?.def?.description;
    if (description) {
      prop.description = description;
    }

    properties[key] = prop;

    if (!isOptional) {
      required.push(key);
    }
  }

  return {
    type: "object" as const,
    properties,
    required,
  };
}
