import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { sendButtonsSchema, type SendButtonsSchema } from "./schema";

async function sendButtons(arg: SendButtonsSchema) {
  try {
    const {
      instanceName,
      number,
      title,
      description,
      footer,
      buttons,
      delay,
      quoted,
      mentionsEveryOne,
      mentioned,
    } = arg;

    const response = await evolutionApi.sendButtons(instanceName, {
      number,
      title,
      description,
      footer,
      buttons: buttons.map(button => ({
        buttonId: button.buttonId,
        buttonText: button.buttonText
      })),
      delay,
      quoted,
      mentionsEveryOne,
      mentioned,
    });

    return response;
  } catch (error) {
    console.error("Error sending buttons message:", error);
    throw new Error(`Failed to send buttons message: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const sendButtonsTool: ToolRegistration<SendButtonsSchema> = {
  name: "send_buttons",
  description: "Send a message with buttons to a WhatsApp number",
  inputSchema: makeJsonSchema(sendButtonsSchema),
  handler: async (args: SendButtonsSchema) => {
    try {
      const parsedArgs = sendButtonsSchema.parse(args);
      const result = await sendButtons(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Successfully sent buttons message "${parsedArgs.title}" with ${parsedArgs.buttons.length} buttons to ${parsedArgs.number}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in sendButtonsTool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  },
}; 