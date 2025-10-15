import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { sendReactionSchema, type SendReactionSchema } from "./schema";

export const sendReaction = async (args: SendReactionSchema) => {
  try {
    const result = await evolutionApi.sendReaction(
      args.instanceName,
      {
        reactionMessage: args.reactionMessage
      }
    );

    return result;
  } catch (error) {
    console.error("Error in sendReaction:", error);
    throw new Error(`Failed to send reaction: ${(error as Error).message}`);
  }
};

export const sendReactionTool: ToolRegistration<SendReactionSchema> = {
  name: "send_reaction",
  label: "Send WhatsApp Reaction",
  description: "Sends a reaction emoji to a message on WhatsApp",
  inputSchema: makeJsonSchema(sendReactionSchema),
  handler: async (args: SendReactionSchema) => {
    try {
      const parsedArgs = sendReactionSchema.parse(args);
      const result = await sendReaction(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully sent reaction to message ${parsedArgs.reactionMessage.key.id}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendReactionTool handler:", error);
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