import type { ToolRegistration } from "../../types";
import { evolutionApi } from "../../utils/evolutionApi";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { setEvolutionSettingsSchema, type SetEvolutionSettingsSchema } from "./schema";

export async function setEvolutionSettings(args: SetEvolutionSettingsSchema) {
  const { 
    instanceName, 
    rejectCall, 
    msgCall,
    groupsIgnore, 
    alwaysOnline, 
    readMessages, 
    syncFullHistory, 
    readStatus 
  } = args;

  const result = await evolutionApi.setSettings(instanceName, {
    rejectCall,
    msgCall,
    groupsIgnore,
    alwaysOnline,
    readMessages,
    syncFullHistory,
    readStatus
  });

  return result;
}

export const setEvolutionSettingsTool: ToolRegistration<SetEvolutionSettingsSchema> = {
  name: "set_evolution_settings",
  description: "Configure behavior settings for a WhatsApp instance such as call handling, message receipts, and online status",
  inputSchema: makeJsonSchema(setEvolutionSettingsSchema),
  handler: async (args: SetEvolutionSettingsSchema) => {
    try {
      const result = await setEvolutionSettings(args);
      
      return {
        content: [
          {
            type: "text",
            text: `✅ Settings for ${args.instanceName} have been updated:
            
• ${args.alwaysOnline ? '✓' : '✗'} Always online
• ${args.readMessages ? '✓' : '✗'} Read receipts
• ${args.readStatus ? '✓' : '✗'} Read status
• ${args.rejectCall ? '✓' : '✗'} Auto-reject calls
• ${args.groupsIgnore ? '✓' : '✗'} Ignore groups
• ${args.syncFullHistory ? '✓' : '✗'} Sync full history
${args.msgCall ? '• Call rejection message: "' + args.msgCall + '"' : ''}`
          }
        ]
      };
    } catch (error) {
      console.error("Error in setEvolutionSettingsTool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: `❌ Failed to set settings: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  },
}; 