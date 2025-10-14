import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type SendWhatsAppAudioSchema, sendWhatsAppAudioSchema } from "./schema";

export const sendWhatsAppAudio = async (
  args: SendWhatsAppAudioSchema,
) => {
  try {
    const result = await evolutionApi.sendWhatsAppAudio(args.instanceName, {
      number: args.number,
      audio: args.audio,
      delay: args.delay,
      encoding: args.encoding,
      quoted: args.quoted,
      mentionsEveryOne: args.mentionsEveryOne,
      mentioned: args.mentioned
    });
    
    return result;
  } catch (error) {
    console.error("Error in sendWhatsAppAudio:", error);
    throw new Error(`Failed to send WhatsApp audio message: ${(error as Error).message}`);
  }
};

export const sendWhatsAppAudioTool: ToolRegistration<SendWhatsAppAudioSchema> = {
  name: "send_whatsapp_audio",
  description: "Send a WhatsApp audio message (PTT/voice note) to a WhatsApp number",
  inputSchema: makeJsonSchema(sendWhatsAppAudioSchema),
  handler: async (args: SendWhatsAppAudioSchema) => {
    try {
      const parsedArgs = sendWhatsAppAudioSchema.parse(args);
      const result = await sendWhatsAppAudio(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully sent WhatsApp audio to ${parsedArgs.number}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendWhatsAppAudioTool handler:", error);
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