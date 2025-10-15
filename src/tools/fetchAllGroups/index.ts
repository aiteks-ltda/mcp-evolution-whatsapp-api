import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { fetchAllGroupsSchema, type FetchAllGroupsSchema } from "./schema";

export const fetchAllGroups = async (args: FetchAllGroupsSchema) => {
  try {
    const result = await evolutionApi.fetchAllGroups(
      args.instanceName,
      args.getParticipants
    );

    return result;
  } catch (error) {
    console.error("Error in fetchAllGroups:", error);
    throw new Error(`Failed to fetch groups: ${(error as Error).message}`);
  }
};

export const fetchAllGroupsTool: ToolRegistration<FetchAllGroupsSchema> = {
  name: "fetch_all_groups",
  label: "Fetch All WhatsApp Groups",
  description: "Retrieves all WhatsApp groups for a given instance",
  inputSchema: makeJsonSchema(fetchAllGroupsSchema),
  handler: async (args: FetchAllGroupsSchema) => {
    try {
      const parsedArgs = fetchAllGroupsSchema.parse(args);
      const result = await fetchAllGroups(parsedArgs);
      
      // Format the result to make it more readable
      const formattedGroups = result.map(group => ({
        id: group.id,
        name: group.subject,
        owner: group.owner,
        size: group.size,
        isRestricted: group.restrict,
        isAnnounce: group.announce,
        description: group.desc || "No description",
        participants: group.participants ? `${group.participants.length} members` : "Members not fetched"
      }));
      
      const resultJson = JSON.stringify(formattedGroups, null, 2);
      return {
        content: [
          {
            type: "text",
            text: `Found ${result.length} WhatsApp groups for instance ${parsedArgs.instanceName}:\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in fetchAllGroupsTool handler:", error);
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