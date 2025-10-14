import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type SendLocationSchema, sendLocationSchema } from "./schema";

export const sendLocation = async (
  args: SendLocationSchema,
) => {
  try {
    const result = await evolutionApi.sendLocation(args.instanceName, {
      number: args.number,
      name: args.name,
      address: args.address,
      latitude: args.latitude,
      longitude: args.longitude,
      delay: args.delay,
      quoted: args.quoted,
      mentionsEveryOne: args.mentionsEveryOne,
      mentioned: args.mentioned
    });
    
    return result;
  } catch (error) {
    console.error("Error in sendLocation:", error);
    throw new Error(`Failed to send location message: ${(error as Error).message}`);
  }
};

export const sendLocationTool: ToolRegistration<SendLocationSchema> = {
  name: "send_location",
  description: "Send a location message to a WhatsApp number",
  inputSchema: makeJsonSchema(sendLocationSchema),
  handler: async (args: SendLocationSchema) => {
    try {
      const parsedArgs = sendLocationSchema.parse(args);
      const result = await sendLocation(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully sent location to ${parsedArgs.number}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendLocationTool handler:", error);
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