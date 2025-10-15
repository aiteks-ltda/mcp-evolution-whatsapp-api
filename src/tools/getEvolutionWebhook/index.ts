import type { ToolRegistration } from "../../types";
import { evolutionApi } from "../../utils/evolutionApi";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { getEvolutionWebhookSchema, type GetEvolutionWebhookSchema } from "./schema";

export async function getEvolutionWebhook(args: GetEvolutionWebhookSchema) {
  const { instanceName } = args;
  const result = await evolutionApi.getWebhook(instanceName);
  return result;
}

export const getEvolutionWebhookTool: ToolRegistration<GetEvolutionWebhookSchema> = {
  name: "get_evolution_webhook",
  description: "Retrieve the current webhook configuration for a WhatsApp instance",
  inputSchema: makeJsonSchema(getEvolutionWebhookSchema),
  handler: async (args: GetEvolutionWebhookSchema) => {
    try {
      const result = await getEvolutionWebhook(args);
      const webhook = result.webhook.webhook;
      
      return {
        content: [
          {
            type: "text",
            text: `📡 Webhook for ${args.instanceName}:
            
• Status: ${webhook.enabled ? '✅ Enabled' : '❌ Disabled'}
• URL: ${webhook.url}
• Events: ${webhook.events.length > 0 ? '\n  - ' + webhook.events.join('\n  - ') : 'None'}`
          }
        ]
      };
    } catch (error) {
      console.error("Error in getEvolutionWebhookTool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: `❌ Failed to retrieve webhook configuration: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  },
}; 