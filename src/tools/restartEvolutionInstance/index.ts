import type { ToolRegistration } from "../../types";
import { evolutionApi } from "../../utils/evolutionApi";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { restartEvolutionInstanceSchema, type RestartEvolutionInstanceSchema } from "./schema";

export async function restartEvolutionInstance(args: RestartEvolutionInstanceSchema) {
  const { instanceName } = args;
  const result = await evolutionApi.restartInstance(instanceName);
  return result;
}

export const restartEvolutionInstanceTool: ToolRegistration<RestartEvolutionInstanceSchema> = {
  name: "restart_evolution_instance",
  description: "Restart a WhatsApp instance to reset connections or apply changes",
  inputSchema: makeJsonSchema(restartEvolutionInstanceSchema),
  handler: async (args: RestartEvolutionInstanceSchema) => {
    try {
      const result = await restartEvolutionInstance(args);
      
      return {
        content: [
          {
            type: "text",
            text: `🔄 Instance ${args.instanceName} restart: ${result.restart.success ? '✅ Success' : '❌ Failed'}
            
${result.restart.message}`
          }
        ]
      };
    } catch (error) {
      console.error("Error in restartEvolutionInstanceTool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: `❌ Failed to restart instance: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  },
}; 