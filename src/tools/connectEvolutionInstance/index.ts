import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type ConnectEvolutionInstanceSchema, connectEvolutionInstanceSchema } from "./schema";

export const connectEvolutionInstance = async (
  args: ConnectEvolutionInstanceSchema,
): Promise<string> => {
  try {
    const result = await evolutionApi.connectInstance(args.instanceName, args.phoneNumber);
    return JSON.stringify(result, null, 2);
  } catch (error) {
    console.error("Error in connectEvolutionInstance:", error);
    throw new Error(`Failed to connect to WhatsApp instance: ${(error as Error).message}`);
  }
};

export const connectEvolutionInstanceTool: ToolRegistration<ConnectEvolutionInstanceSchema> = {
  name: "connect_evolution_instance",
  description: "Connect to a WhatsApp instance to start a session",
  inputSchema: makeJsonSchema(connectEvolutionInstanceSchema),
  handler: async (args: ConnectEvolutionInstanceSchema) => {
    try {
      const parsedArgs = connectEvolutionInstanceSchema.parse(args);
      const result = await connectEvolutionInstance(parsedArgs);
      
      // Parse the result
      const connectionInfo = JSON.parse(result);
      let responseText = `Connected to WhatsApp instance: ${parsedArgs.instanceName}\n\n`;
      
      // Add pairing code if available
      if (connectionInfo.pairingCode) {
        responseText += `Pairing Code: ${connectionInfo.pairingCode}\n\n`;
      }
      
      // Add QR code info if available
      if (connectionInfo.code) {
        responseText += `QR Code: ${connectionInfo.code}\n\n`;
      }
      
      responseText += `Full Response:\n${result}`;
      
      return {
        content: [
          {
            type: "text",
            text: responseText,
          },
        ],
      };
    } catch (error) {
      console.error("Error in connectEvolutionInstanceTool handler:", error);
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