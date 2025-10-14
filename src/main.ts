#!/usr/bin/env node

// Version is automatically updated during release process
export const VERSION = "0.1.0";

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
	type CallToolRequest,
} from "@modelcontextprotocol/sdk/types.js";
import { createTools } from "./tools/index.js";


/* You can remove this section if you don't need to validate command line arguments */
/* You'll have to handle the error yourself */
/*
const expectedArgs = [
	"expected-arg-1",
	"expected-arg-2",
]
const args = process.argv.slice(2);
if (args.length < expectedArgs.length) {
	console.error("CLI arguments not provided. If you are getting this error and don't know why, you probably need to remove CLI argument logic in main.ts");
	process.exit(1);
}
*/

// Initialize server
const server = new Server(
	{
		name: "Evolution API MCP Server",
		version: VERSION,
	},
	{
		capabilities: {
			tools: {},
		},
	},
);

const tools = createTools();

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
	// Return tools with their schemas but without handlers
	return {
		tools: tools.map(({ handler, ...tool }) => ({
			name: tool.name,
			description: tool.description,
			inputSchema: tool.inputSchema,
		})),
	};
});

// Register tool handlers
server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
	try {
		const { name, arguments: args } = request.params;
		const tool = tools.find((t) => t.name === name);

		if (!tool) {
			throw new Error(`Unknown tool: ${name}`);
		}

		// Execute tool handler and catch any authentication errors
		try {
			return await tool.handler(args);
		} catch (error) {
			// If this is an authentication error, provide a more user-friendly message
			if (error instanceof Error && 
			   (error.message.includes('EVOLUTION_API_KEY') || 
				error.message.includes('EVOLUTION_API_URL'))) {
				return {
					content: [
						{
							type: "text",
							text: "Authentication required: Please provide your Evolution API credentials in the configuration settings.",
						},
					],
					isError: true,
				};
			}
			// Re-throw other errors
			throw error;
		}
	} catch (error) {
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
});

// Start server
async function runServer() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Evolution API MCP Server running on stdio");
}

runServer().catch((error) => {
	console.error("Fatal error running server:", error);
	process.exit(1);
});
