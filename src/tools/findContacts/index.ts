import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { findContactsSchema, type FindContactsSchema } from "./schema";

export const findContacts = async (params: FindContactsSchema) => {
  try {
    // Get contacts from Evolution API
    const result = await evolutionApi.findContacts(
      params.instanceName,
      { where: params.where }
    );

    return result;
  } catch (error) {
    console.error("Error in findContacts:", error);
    throw new Error(`Failed to find contacts: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const findContactsTool: ToolRegistration<FindContactsSchema> = {
  name: "find_contacts",
  description: "Find WhatsApp contacts with optional filtering by ID or name",
  inputSchema: makeJsonSchema(findContactsSchema),
  handler: async (args: FindContactsSchema) => {
    try {
      const parsedArgs = findContactsSchema.parse(args);
      const result = await findContacts(parsedArgs);
      
      // Format the results for display
      const contactCount = result.contacts?.length || 0;
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
            text: `Found ${contactCount} contacts${filterDescription ? ` with ${filterDescription}` : ""} for instance ${parsedArgs.instanceName}\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in findContactsTool handler:", error);
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