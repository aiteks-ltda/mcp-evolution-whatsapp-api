import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type SendListSchema, sendListSchema } from "./schema";

export const sendList = async (
  args: SendListSchema,
) => {
  try {
    const result = await evolutionApi.sendList(args.instanceName, {
      number: args.number,
      title: args.title,
      description: args.description,
      buttonText: args.buttonText,
      footerText: args.footerText,
      sections: args.sections,
      delay: args.delay,
      quoted: args.quoted,
      mentionsEveryOne: args.mentionsEveryOne,
      mentioned: args.mentioned
    });
    
    return result;
  } catch (error) {
    console.error("Error in sendList:", error);
    throw new Error(`Failed to send list message: ${(error as Error).message}`);
  }
};

export const sendListTool: ToolRegistration<SendListSchema> = {
  name: "send_list",
  description: "Send an interactive list message to a WhatsApp number with selectable options organized in sections",
  inputSchema: makeJsonSchema(sendListSchema),
  handler: async (args: SendListSchema) => {
    try {
      const parsedArgs = sendListSchema.parse(args);
      const result = await sendList(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully sent list "${parsedArgs.title}" with ${parsedArgs.sections.reduce((acc, section) => acc + section.rows.length, 0)} options to ${parsedArgs.number}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendListTool handler:", error);
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