import type { ToolRegistration } from "../../types";
import { makeJsonSchema } from "../../utils/makeJsonSchema";
import { evolutionApi } from "../../utils/evolutionApi";
import { type FetchEvolutionInstancesSchema, fetchEvolutionInstancesSchema } from "./schema";

export const fetchEvolutionInstances = async (
  args: FetchEvolutionInstancesSchema,
) => {
  try {
    const result = await evolutionApi.fetchInstances(args.instanceName);
    return result;
  } catch (error) {
    console.error("Error in fetchEvolutionInstances:", error);
    throw new Error(`Failed to fetch Evolution API instances: ${(error as Error).message}`);
  }
};

export const fetchEvolutionInstancesTool: ToolRegistration<FetchEvolutionInstancesSchema> = {
  name: "fetch_evolution_instances",
  description: "Get a list of all WhatsApp instances or a specific one by name",
  inputSchema: makeJsonSchema(fetchEvolutionInstancesSchema),
  handler: async (args: FetchEvolutionInstancesSchema) => {
    try {
      const parsedArgs = fetchEvolutionInstancesSchema.parse(args);
      const instances = await fetchEvolutionInstances(parsedArgs);
      
      // Get instance count
      const count = instances.length;
      const specificInstance = parsedArgs.instanceName ? `for "${parsedArgs.instanceName}"` : '';
      const resultJson = JSON.stringify(instances, null, 2);
      
      return {
        content: [
          {
            type: "text",
            text: `Found ${count} WhatsApp instance${count !== 1 ? 's' : ''} ${specificInstance}:\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in fetchEvolutionInstancesTool handler:", error);
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