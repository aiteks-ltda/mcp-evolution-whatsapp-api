import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type SendStickerSchema, sendStickerSchema } from "./schema";

export const sendSticker = async (
  args: SendStickerSchema,
) => {
  try {
    const result = await evolutionApi.sendSticker(args.instanceName, {
      number: args.number,
      sticker: args.sticker,
      delay: args.delay,
      quoted: args.quoted,
      mentionsEveryOne: args.mentionsEveryOne,
      mentioned: args.mentioned
    });
    
    return result;
  } catch (error) {
    console.error("Error in sendSticker:", error);
    throw new Error(`Failed to send sticker: ${(error as Error).message}`);
  }
};

export const sendStickerTool: ToolRegistration<SendStickerSchema> = {
  name: "send_sticker",
  description: "Send a sticker to a WhatsApp number",
  inputSchema: makeJsonSchema(sendStickerSchema),
  handler: async (args: SendStickerSchema) => {
    try {
      const parsedArgs = sendStickerSchema.parse(args);
      const result = await sendSticker(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully sent sticker to ${parsedArgs.number}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendStickerTool handler:", error);
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