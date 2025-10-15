import { findGroupByJidSchema } from "./schema";
import type { FindGroupByJidSchema } from "./schema";
import { evolutionApi } from "../../utils/evolutionApi";
import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";

export const findGroupByJid = async (params: FindGroupByJidSchema) => {
  try {
    // Validate params against schema
    findGroupByJidSchema.parse(params);

    // Get group info from Evolution API
    const groupInfo = await evolutionApi.findGroupByJid(
      params.instanceName,
      { groupJid: params.groupJid }
    );

    // Return success response with group info
    return groupInfo;
  } catch (error) {
    console.error("Error in findGroupByJid:", error);
    throw new Error(`Failed to find group by JID: ${(error as Error).message}`);
  }
};

export const findGroupByJidTool: ToolRegistration<FindGroupByJidSchema> = {
  name: "find_group_by_jid",
  description: "Find a WhatsApp group by its JID (Group ID)",
  inputSchema: makeJsonSchema(findGroupByJidSchema),
  handler: async (args: FindGroupByJidSchema) => {
    try {
      const parsedArgs = findGroupByJidSchema.parse(args);
      const result = await findGroupByJid(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Group information for ${parsedArgs.groupJid}:\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in findGroupByJidTool handler:", error);
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