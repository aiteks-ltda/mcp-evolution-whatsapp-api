import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type LogoutEvolutionInstanceSchema, logoutEvolutionInstanceSchema } from "./schema";

export const logoutEvolutionInstance = async (
  args: LogoutEvolutionInstanceSchema,
): Promise<string> => {
  try {
    const result = await evolutionApi.logoutInstance(args.instanceName);
    return JSON.stringify(result, null, 2);
  } catch (error) {
    console.error("Error in logoutEvolutionInstance:", error);
    throw new Error(`Failed to logout from WhatsApp instance: ${(error as Error).message}`);
  }
};

export const logoutEvolutionInstanceTool: ToolRegistration<LogoutEvolutionInstanceSchema> = {
  name: "logout_evolution_instance",
  description: "Logout from a WhatsApp instance (disconnect without deleting the instance)",
  inputSchema: makeJsonSchema(logoutEvolutionInstanceSchema),
  handler: async (args: LogoutEvolutionInstanceSchema) => {
    try {
      const parsedArgs = logoutEvolutionInstanceSchema.parse(args);
      const result = await logoutEvolutionInstance(parsedArgs);
      
      // Parse the result
      const logoutInfo = JSON.parse(result);
      const isSuccess = !logoutInfo.error;
      const message = logoutInfo.response?.message || "No details provided";
      
      return {
        content: [
          {
            type: "text",
            text: `${isSuccess ? '✅' : '❌'} ${message}\n\nFull response:\n${result}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in logoutEvolutionInstanceTool handler:", error);
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