import type { ToolRegistration } from "../types";
import { someFunctionTool } from "./exampleTool/index.js";
import { createEvolutionInstanceTool } from "./createEvolutionInstance/index.js";
import { getEvolutionInfoTool } from "./getEvolutionInfo/index.js";
import { fetchEvolutionInstancesTool } from "./fetchEvolutionInstances/index.js";
import { connectEvolutionInstanceTool } from "./connectEvolutionInstance/index.js";
import { getConnectionStateTool } from "./getConnectionState/index.js";
import { logoutEvolutionInstanceTool } from "./logoutEvolutionInstance/index.js";
import { deleteEvolutionInstanceTool } from "./deleteEvolutionInstance/index.js";
import { setEvolutionPresenceTool } from "./setEvolutionPresence/index.js";
import { setEvolutionWebhookTool } from "./setEvolutionWebhook/index.js";
import { setEvolutionSettingsTool } from "./setEvolutionSettings/index.js";
import { getEvolutionSettingsTool } from "./getEvolutionSettings/index.js";
import { getEvolutionWebhookTool } from "./getEvolutionWebhook/index.js";
import { restartEvolutionInstanceTool } from "./restartEvolutionInstance/index.js";
import { sendPlainTextTool } from "./sendPlainText/index.js";
import { sendStatusTool } from "./sendStatus/index.js";
import { sendMediaTool } from "./sendMedia/index.js";
import { sendWhatsAppAudioTool } from "./sendWhatsAppAudio/index.js";
import { sendStickerTool } from "./sendSticker/index.js";
import { sendLocationTool } from "./sendLocation/index.js";
import { sendContactTool } from "./sendContact/index.js";
import { sendReactionTool } from "./sendReaction/index.js";
import { sendPollTool } from "./sendPoll/index.js";
import { sendListTool } from "./sendList/index.js";
import { sendButtonsTool } from "./sendButtons/index.js";
import { fetchAllGroupsTool } from "./fetchAllGroups/index.js";
import { findGroupByJidTool } from "./findGroupByJid/index.js";
import { findGroupMembersTool } from "./findGroupMembers/index.js";
import { findChatsTool } from "./findChats/index.js";
import { findContactsTool } from "./findContacts/index.js";

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createTools = (): ToolRegistration<any>[] => {
	return [
		{
			...someFunctionTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => someFunctionTool.handler(args),
		},
		{
			...createEvolutionInstanceTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => createEvolutionInstanceTool.handler(args),
		},
		{
			...getEvolutionInfoTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => getEvolutionInfoTool.handler(args),
		},
		{
			...fetchEvolutionInstancesTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => fetchEvolutionInstancesTool.handler(args),
		},
		{
			...connectEvolutionInstanceTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => connectEvolutionInstanceTool.handler(args),
		},
		{
			...getConnectionStateTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => getConnectionStateTool.handler(args),
		},
		{
			...logoutEvolutionInstanceTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => logoutEvolutionInstanceTool.handler(args),
		},
		{
			...deleteEvolutionInstanceTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => deleteEvolutionInstanceTool.handler(args),
		},
		{
			...restartEvolutionInstanceTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => restartEvolutionInstanceTool.handler(args),
		},
		{
			...setEvolutionPresenceTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => setEvolutionPresenceTool.handler(args),
		},
		{
			...setEvolutionWebhookTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => setEvolutionWebhookTool.handler(args),
		},
		{
			...getEvolutionWebhookTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => getEvolutionWebhookTool.handler(args),
		},
		{
			...setEvolutionSettingsTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => setEvolutionSettingsTool.handler(args),
		},
		{
			...getEvolutionSettingsTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => getEvolutionSettingsTool.handler(args),
		},
		{
			...sendPlainTextTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendPlainTextTool.handler(args),
		},
		{
			...sendStatusTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendStatusTool.handler(args),
		},
		{
			...sendMediaTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendMediaTool.handler(args),
		},
		{
			...sendWhatsAppAudioTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendWhatsAppAudioTool.handler(args),
		},
		{
			...sendStickerTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendStickerTool.handler(args),
		},
		{
			...sendLocationTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendLocationTool.handler(args),
		},
		{
			...sendContactTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendContactTool.handler(args),
		},
		{
			...sendReactionTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendReactionTool.handler(args),
		},
		{
			...sendPollTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendPollTool.handler(args),
		},
		{
			...sendListTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendListTool.handler(args),
		},
		{
			...sendButtonsTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => sendButtonsTool.handler(args),
		},
		{
			...fetchAllGroupsTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => fetchAllGroupsTool.handler(args),
		},
		{
			...findGroupByJidTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => findGroupByJidTool.handler(args),
		},
		{
			...findGroupMembersTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => findGroupMembersTool.handler(args),
		},
		{
			...findChatsTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => findChatsTool.handler(args),
		},
		{
			...findContactsTool,
			// biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
			handler: (args: any) => findContactsTool.handler(args),
		},
	];
};