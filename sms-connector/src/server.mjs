import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { previewReminder, sendReminder } from "./reminders.mjs";

const server = new McpServer({
  name: "mainland-sms-reminder",
  version: "1.0.0"
});

const phaseSchema = z.enum(["morning", "afternoon"]);

server.registerTool(
  "preview_reminder_sms",
  {
    title: "预览每日机会提醒短信",
    description: "预览固定模板、脱敏手机号及演练状态，不发送短信。",
    inputSchema: {
      phase: phaseSchema.describe("morning 为上午提醒，afternoon 为下午提醒")
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false
    }
  },
  async ({ phase }) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(previewReminder(phase), null, 2)
      }
    ]
  })
);

server.registerTool(
  "send_reminder_sms",
  {
    title: "发送每日机会提醒短信",
    description:
      "向预设的唯一中国大陆手机号发送已审核的固定腾讯云短信模板。confirm 必须为 true；演练模式下不会产生外部请求。",
    inputSchema: {
      phase: phaseSchema.describe("morning 为上午提醒，afternoon 为下午提醒"),
      confirm: z.literal(true).describe("明确确认本次发送")
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true
    }
  },
  async ({ phase }) => {
    try {
      const result = await sendReminder(phase);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `短信发送失败：${error instanceof Error ? error.message : "未知错误"}`
          }
        ]
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("mainland-sms-reminder MCP server started");
