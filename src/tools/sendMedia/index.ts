import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type SendMediaSchema, sendMediaSchema } from "./schema";

export const sendMedia = async (
  args: SendMediaSchema,
) => {
  try {
    const result = await evolutionApi.sendMedia(args.instanceName, {
      number: args.number,
      mediatype: args.mediatype,
      media: args.media,
      mimetype: args.mimetype,
      fileName: args.fileName,
      caption: args.caption,
      delay: args.delay,
      mentionsEveryOne: args.mentionsEveryOne,
      mentioned: args.mentioned,
      quoted: args.quoted
    });
    
    return result;
  } catch (error) {
    console.error("Error in sendMedia:", error);
    throw new Error(`Failed to send media message: ${(error as Error).message}`);
  }
};

export const sendMediaTool: ToolRegistration<SendMediaSchema> = {
  name: "send_media",
  description: "Send a media message (image, video, audio, document) to a WhatsApp number",
  inputSchema: makeJsonSchema(sendMediaSchema),
  handler: async (args: SendMediaSchema) => {
    try {
      const parsedArgs = sendMediaSchema.parse(args);
      const result = await sendMedia(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully sent ${parsedArgs.mediatype} to ${parsedArgs.number}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendMediaTool handler:", error);
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