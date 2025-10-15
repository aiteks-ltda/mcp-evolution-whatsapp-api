import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type CreateEvolutionInstanceSchema, createEvolutionInstanceSchema } from "./schema";

export const createEvolutionInstance = async (
  args: CreateEvolutionInstanceSchema,
): Promise<string> => {
  try {
    const result = await evolutionApi.createInstance(args);
    return JSON.stringify(result, null, 2);
  } catch (error) {
    console.error("Error in createEvolutionInstance:", error);
    throw new Error(`Failed to create Evolution API instance: ${(error as Error).message}`);
  }
};

export const createEvolutionInstanceTool: ToolRegistration<CreateEvolutionInstanceSchema> = {
  name: "create_evolution_instance",
  description: "Create a new WhatsApp instance using Evolution API",
  inputSchema: makeJsonSchema(createEvolutionInstanceSchema),
  handler: async (args: CreateEvolutionInstanceSchema) => {
    try {
      const parsedArgs = createEvolutionInstanceSchema.parse(args);
      const result = await createEvolutionInstance(parsedArgs);
      return {
        content: [
          {
            type: "text",
            text: `Successfully created WhatsApp instance: ${parsedArgs.instanceName}\n\n${result}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in createEvolutionInstanceTool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  },
}; 