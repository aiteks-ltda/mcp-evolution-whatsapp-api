import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi, type PresenceStatus } from "../../utils/evolutionApi";
import { type SetEvolutionPresenceSchema, setEvolutionPresenceSchema } from "./schema";

export const setEvolutionPresence = async (
  args: SetEvolutionPresenceSchema,
): Promise<string> => {
  try {
    await evolutionApi.setPresence(args.instanceName, args.presence as PresenceStatus);
    return JSON.stringify({ 
      success: true, 
      message: `Presence set to "${args.presence}" for instance "${args.instanceName}"` 
    }, null, 2);
  } catch (error) {
    console.error("Error in setEvolutionPresence:", error);
    throw new Error(`Failed to set WhatsApp presence: ${(error as Error).message}`);
  }
};

export const setEvolutionPresenceTool: ToolRegistration<SetEvolutionPresenceSchema> = {
  name: "set_evolution_presence",
  description: "Set WhatsApp online/offline presence status for a specific instance",
  inputSchema: makeJsonSchema(setEvolutionPresenceSchema),
  handler: async (args: SetEvolutionPresenceSchema) => {
    try {
      const parsedArgs = setEvolutionPresenceSchema.parse(args);
      const result = await setEvolutionPresence(parsedArgs);
      
      // Parse the result
      const presenceInfo = JSON.parse(result);
      
      let statusEmoji = '';
      if (parsedArgs.presence === 'available') {
        statusEmoji = '🟢'; // Green circle for available
      } else {
        statusEmoji = '⚪️'; // White circle for unavailable
      }
      
      return {
        content: [
          {
            type: "text",
            text: `${statusEmoji} ${presenceInfo.message}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in setEvolutionPresenceTool handler:", error);
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