import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type SendStatusSchema, sendStatusSchema } from "./schema";

export const sendStatus = async (
  args: SendStatusSchema,
) => {
  try {
    const result = await evolutionApi.sendStatus(args.instanceName, {
      statusMessage: {
        type: args.type,
        content: args.content,
        caption: args.caption,
        backgroundColor: args.backgroundColor,
        font: args.font,
        allContacts: args.allContacts,
        statusJidList: args.statusJidList
      }
    });
    
    return result;
  } catch (error) {
    console.error("Error in sendStatus:", error);
    throw new Error(`Failed to send WhatsApp status: ${(error as Error).message}`);
  }
};

export const sendStatusTool: ToolRegistration<SendStatusSchema> = {
  name: "send_status",
  description: "Post a WhatsApp status (story) with text, image, or audio",
  inputSchema: makeJsonSchema(sendStatusSchema),
  handler: async (args: SendStatusSchema) => {
    try {
      const parsedArgs = sendStatusSchema.parse(args);
      const result = await sendStatus(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully posted WhatsApp status\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendStatusTool handler:", error);
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