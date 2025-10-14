import type { ToolInput } from "../types";
import type { ZodSchema } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

// biome-ignore lint/suspicious/noExplicitAny: It is what zodToJsonSchema does. No reason to change it.
export const makeJsonSchema = (schema: ZodSchema<any>) => {
	return zodToJsonSchema(schema) as ToolInput;
};
