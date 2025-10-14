import { findGroupMembersSchema } from "./schema";
import type { FindGroupMembersSchema } from "./schema";
import { evolutionApi } from "../../utils/evolutionApi";
import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";

export const findGroupMembers = async (params: FindGroupMembersSchema) => {
  try {
    // Validate params against schema
    findGroupMembersSchema.parse(params);

    // Get group members from Evolution API
    const result = await evolutionApi.findGroupMembers(
      params.instanceName,
      { groupJid: params.groupJid }
    );

    // Return group members
    return result;
  } catch (error) {
    console.error("Error in findGroupMembers:", error);
    throw new Error(`Failed to find group members: ${(error as Error).message}`);
  }
};

export const findGroupMembersTool: ToolRegistration<FindGroupMembersSchema> = {
  name: "find_group_members",
  description: "Find all members of a WhatsApp group by its JID (Group ID)",
  inputSchema: makeJsonSchema(findGroupMembersSchema),
  handler: async (args: FindGroupMembersSchema) => {
    try {
      const parsedArgs = findGroupMembersSchema.parse(args);
      const result = await findGroupMembers(parsedArgs);
      const resultJson = JSON.stringify(result, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Group members for ${parsedArgs.groupJid}:\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in findGroupMembersTool handler:", error);
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