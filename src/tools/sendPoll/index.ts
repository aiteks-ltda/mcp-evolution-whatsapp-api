import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type SendPollSchema, sendPollSchema } from "./schema";

export const sendPoll = async (
  args: SendPollSchema,
) => {
  try {
    const result = await evolutionApi.sendPoll(args.instanceName, {
      number: args.number,
      name: args.name,
      selectableCount: args.selectableCount,
      values: args.values,
      delay: args.delay,
      quoted: args.quoted,
      mentionsEveryOne: args.mentionsEveryOne,
      mentioned: args.mentioned
    });
    
    return result;
  } catch (error) {
    console.error("Error in sendPoll:", error);
    throw new Error(`Failed to send poll message: ${(error as Error).message}`);
  }
};

export const sendPollTool: ToolRegistration<SendPollSchema> = {
  name: "send_poll",
  description: "Send a poll message to a WhatsApp number with options to vote",
  inputSchema: makeJsonSchema(sendPollSchema),
  handler: async (args: SendPollSchema) => {
    try {
      const parsedArgs = sendPollSchema.parse(args);
      const result = await sendPoll(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully sent poll "${parsedArgs.name}" with ${parsedArgs.values.length} options to ${parsedArgs.number}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendPollTool handler:", error);
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