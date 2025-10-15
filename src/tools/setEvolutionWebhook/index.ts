import type { ToolRegistration } from "../../types";
import { evolutionApi } from "../../utils/evolutionApi";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { setEvolutionWebhookSchema, type SetEvolutionWebhookSchema } from "./schema";

export async function setEvolutionWebhook(args: SetEvolutionWebhookSchema) {
  const { instanceName, url, enabled, events, webhookByEvents, webhookBase64 } = args;

  const result = await evolutionApi.setWebhook(instanceName, {
    enabled,
    url,
    events,
    webhookByEvents,
    webhookBase64
  });

  return result;
}

export const setEvolutionWebhookTool: ToolRegistration<SetEvolutionWebhookSchema> = {
  name: "set_evolution_webhook",
  description: "Configure a webhook for a WhatsApp instance to receive notifications for specified events",
  inputSchema: makeJsonSchema(setEvolutionWebhookSchema),
  handler: async (args: SetEvolutionWebhookSchema) => {
    try {
      const result = await setEvolutionWebhook(args);
      
      return {
        content: [
          {
            type: "text",
            text: `✅ Webhook for ${args.instanceName} has been ${args.enabled ? 'enabled' : 'disabled'} at ${args.url}.\n\nConfigured events: ${args.events.join(', ')}`
          }
        ]
      };
    } catch (error) {
      console.error("Error in setEvolutionWebhookTool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: `❌ Failed to set webhook: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  },
}; 