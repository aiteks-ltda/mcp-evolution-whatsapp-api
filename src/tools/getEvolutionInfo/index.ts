import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type GetEvolutionInfoSchema, getEvolutionInfoSchema } from "./schema";

export const getEvolutionInfo = async () => {
  try {
    const result = await evolutionApi.getInformation();
    return result;
  } catch (error) {
    console.error("Error in getEvolutionInfo:", error);
    throw new Error(`Failed to get Evolution API information: ${(error as Error).message}`);
  }
};

export const getEvolutionInfoTool: ToolRegistration<GetEvolutionInfoSchema> = {
  name: "get_evolution_info",
  description: "Get information about the Evolution API server, including version and status",
  inputSchema: makeJsonSchema(getEvolutionInfoSchema),
  handler: async () => {
    try {
      const info = await getEvolutionInfo();
      const resultJson = JSON.stringify(info, null, 2);
      
      return {
        content: [
          {
            type: "text",
            text: `Evolution API Information:
Status: ${info.status === 200 ? 'Online' : 'Error'}
Version: ${info.version}
${info.documentation ? `Documentation: ${info.documentation}` : ''}

Full response:
${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in getEvolutionInfoTool handler:", error);
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