import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type SendPlainTextSchema, sendPlainTextSchema } from "./schema";

export const sendPlainText = async (
  args: SendPlainTextSchema,
) => {
  try {
    // Need to implement this method in evolutionApi class
    const result = await evolutionApi.sendPlainText(args.instanceName, {
      number: args.number,
      text: args.text,
      delay: args.delay,
      linkPreview: args.linkPreview,
      mentionsEveryOne: args.mentionsEveryOne,
      mentioned: args.mentioned,
      quoted: args.quoted
    });
    
    return result;
  } catch (error) {
    console.error("Error in sendPlainText:", error);
    throw new Error(`Failed to send plain text message: ${(error as Error).message}`);
  }
};

export const sendPlainTextTool: ToolRegistration<SendPlainTextSchema> = {
  name: "send_plain_text",
  description: "Send a plain text message to a WhatsApp number",
  inputSchema: makeJsonSchema(sendPlainTextSchema),
  handler: async (args: SendPlainTextSchema) => {
    try {
      const parsedArgs = sendPlainTextSchema.parse(args);
      const result = await sendPlainText(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully sent message to ${parsedArgs.number}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendPlainTextTool handler:", error);
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