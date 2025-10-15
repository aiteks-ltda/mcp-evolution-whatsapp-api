import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type GetConnectionStateSchema, getConnectionStateSchema } from "./schema";

export const getConnectionState = async (
  args: GetConnectionStateSchema,
): Promise<string> => {
  try {
    const result = await evolutionApi.getConnectionState(args.instanceName);
    return JSON.stringify(result, null, 2);
  } catch (error) {
    console.error("Error in getConnectionState:", error);
    throw new Error(`Failed to get WhatsApp instance connection state: ${(error as Error).message}`);
  }
};

export const getConnectionStateTool: ToolRegistration<GetConnectionStateSchema> = {
  name: "get_connection_state",
  description: "Check the connection state of a WhatsApp instance (connected or disconnected)",
  inputSchema: makeJsonSchema(getConnectionStateSchema),
  handler: async (args: GetConnectionStateSchema) => {
    try {
      const parsedArgs = getConnectionStateSchema.parse(args);
      const result = await getConnectionState(parsedArgs);
      
      // Parse the result to get the state
      const stateInfo = JSON.parse(result);
      const instanceName = stateInfo.instance.instanceName;
      const state = stateInfo.instance.state;
      
      let stateMessage = '';
      if (state === 'open') {
        stateMessage = `✅ Instance "${instanceName}" is CONNECTED`;
      } else if (state === 'close') {
        stateMessage = `❌ Instance "${instanceName}" is DISCONNECTED`;
      } else {
        stateMessage = `Instance "${instanceName}" state: ${state}`;
      }
      
      return {
        content: [
          {
            type: "text",
            text: `${stateMessage}\n\nFull response:\n${result}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getConnectionStateTool handler:", error);
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