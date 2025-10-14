import { z } from "zod";
import type { WebhookEvent } from "../../utils/evolutionApi";

export const setEvolutionWebhookSchema = z.object({
  instanceName: z.string().describe("The name of the WhatsApp instance to configure webhook for"),
  url: z.string().url().describe("The URL that will receive webhook events"),
  enabled: z.boolean().default(true).describe("Whether the webhook is enabled or disabled"),
  webhookByEvents: z.boolean().optional().describe("Whether to send separate webhooks for each event type"),
  webhookBase64: z.boolean().optional().describe("Whether to encode binary data as base64"),
  events: z.array(
    z.enum([
      'APPLICATION_STARTUP',
      'QRCODE_UPDATED',
      'MESSAGES_SET',
      'MESSAGES_UPSERT',
      'MESSAGES_UPDATE',
      'MESSAGES_DELETE',
      'SEND_MESSAGE',
      'CONTACTS_SET',
      'CONTACTS_UPSERT',
      'CONTACTS_UPDATE',
      'PRESENCE_UPDATE',
      'CHATS_SET',
      'CHATS_UPSERT',
      'CHATS_UPDATE',
      'CHATS_DELETE',
      'GROUPS_UPSERT',
      'GROUP_UPDATE',
      'GROUP_PARTICIPANTS_UPDATE',
      'CONNECTION_UPDATE',
      'LABELS_EDIT',
      'LABELS_ASSOCIATION',
      'CALL',
      'TYPEBOT_START',
      'TYPEBOT_CHANGE_STATUS'
    ] as const)
  ).nonempty().describe("The events to subscribe to")
});

export type SetEvolutionWebhookSchema = z.infer<typeof setEvolutionWebhookSchema>; 