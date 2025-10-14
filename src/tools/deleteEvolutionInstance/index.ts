import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type DeleteEvolutionInstanceSchema, deleteEvolutionInstanceSchema } from "./schema";

export const deleteEvolutionInstance = async (
  args: DeleteEvolutionInstanceSchema,
): Promise<string> => {
  try {
    const result = await evolutionApi.deleteInstance(args.instanceName);
    return JSON.stringify(result, null, 2);
  } catch (error) {
    console.error("Error in deleteEvolutionInstance:", error);
    throw new Error(`Failed to delete WhatsApp instance: ${(error as Error).message}`);
  }
};

export const deleteEvolutionInstanceTool: ToolRegistration<DeleteEvolutionInstanceSchema> = {
  name: "delete_evolution_instance",
  description: "Permanently delete a WhatsApp instance from the server",
  inputSchema: makeJsonSchema(deleteEvolutionInstanceSchema),
  handler: async (args: DeleteEvolutionInstanceSchema) => {
    try {
      const parsedArgs = deleteEvolutionInstanceSchema.parse(args);
      const result = await deleteEvolutionInstance(parsedArgs);
      
      // Parse the result
      const deleteInfo = JSON.parse(result);
      const isSuccess = !deleteInfo.error;
      const message = deleteInfo.response?.message || "No details provided";
      
      return {
        content: [
          {
            type: "text",
            text: `${isSuccess ? '✅' : '❌'} ${message}\n\nFull response:\n${result}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in deleteEvolutionInstanceTool handler:", error);
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