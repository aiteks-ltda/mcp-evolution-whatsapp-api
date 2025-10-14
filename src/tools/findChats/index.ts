import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { findChatsSchema, type FindChatsSchema } from "./schema";

export const findChats = async (params: FindChatsSchema) => {
  try {
    // Get chats from Evolution API
    const result = await evolutionApi.findChats(
      params.instanceName,
      { where: params.where }
    );

    return result;
  } catch (error) {
    console.error("Error in findChats:", error);
    throw new Error(`Failed to find chats: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const findChatsTool: ToolRegistration<FindChatsSchema> = {
  name: "find_chats",
  description: "Find WhatsApp chats with optional filtering by ID, name, or archive status",
  inputSchema: makeJsonSchema(findChatsSchema),
  handler: async (args: FindChatsSchema) => {
    try {
      const parsedArgs = findChatsSchema.parse(args);
      const result = await findChats(parsedArgs);
      
      // Format the results for display
      const chatCount = result.chats?.length || 0;
      const filterDescription = parsedArgs.where ? 
        Object.entries(parsedArgs.where)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ") : 
        "no filters";
      
      const resultJson = JSON.stringify(result, null, 2);
      
      return {
        content: [
          {
            type: "text",
            text: `Found ${chatCount} chats${filterDescription ? ` with ${filterDescription}` : ""} for instance ${parsedArgs.instanceName}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in findChatsTool handler:", error);
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