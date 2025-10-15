import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { sendContactSchema, type SendContactSchema } from "./schema";

export const sendContact = async (args: SendContactSchema) => {
  try {
    const result = await evolutionApi.sendContact(
      args.instanceName,
      args.number,
      args.contact,
      {
        delay: args.delay,
        quoted: args.quoted,
        mentionsEveryOne: args.mentionsEveryOne,
        mentioned: args.mentioned,
      }
    );

    return result;
  } catch (error) {
    console.error("Error in sendContact:", error);
    throw new Error(`Failed to send contact: ${(error as Error).message}`);
  }
};

export const sendContactTool: ToolRegistration<SendContactSchema> = {
  name: "send_contact",
  label: "Send WhatsApp Contact",
  description: "Sends contact information to a user via WhatsApp",
  inputSchema: makeJsonSchema(sendContactSchema),
  handler: async (args: SendContactSchema) => {
    try {
      const parsedArgs = sendContactSchema.parse(args);
      const result = await sendContact(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully sent contact to ${parsedArgs.number}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendContactTool handler:", error);
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