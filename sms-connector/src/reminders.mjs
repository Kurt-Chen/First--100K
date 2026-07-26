import tencentcloud from "tencentcloud-sdk-nodejs-sms";
import { loadConfig, maskMainlandPhone } from "./config.mjs";

const { Client: SmsClient } = tencentcloud.sms.v20210111;

export const REMINDER_SUMMARIES = Object.freeze({
  morning: "收集3个真实问题，评估潜力，并选出1个值得验证的机会。",
  afternoon: "根据价值方程制作大满贯报价，并联系5位目标客户完成最小测试。"
});

function buildRequest(config, phase) {
  const reminder = config.reminders[phase];
  if (!reminder) {
    throw new Error("phase 只能是 morning 或 afternoon");
  }

  return {
    PhoneNumberSet: [config.allowedTo],
    SmsSdkAppId: config.appId,
    SignName: config.signName,
    TemplateId: reminder.templateId,
    TemplateParamSet: reminder.templateParams
  };
}

export function previewReminder(phase, env = process.env) {
  const config = loadConfig(env);
  const request = buildRequest(config, phase);
  return {
    phase,
    summary: REMINDER_SUMMARIES[phase],
    recipient: maskMainlandPhone(config.allowedTo),
    signName: config.signName,
    templateId: request.TemplateId,
    templateParams: request.TemplateParamSet,
    dryRun: config.dryRun
  };
}

export async function sendReminder(phase, env = process.env) {
  const publicConfig = loadConfig(env);
  const preview = previewReminder(phase, env);

  if (publicConfig.dryRun) {
    return {
      sent: false,
      reason: "dry_run",
      ...preview
    };
  }

  const config = loadConfig(env, { requireCredentials: true });
  const client = new SmsClient({
    credential: config.credentials,
    region: config.region,
    profile: {
      httpProfile: {
        endpoint: config.endpoint
      }
    }
  });

  const response = await client.SendSms(buildRequest(config, phase));
  const status = response.SendStatusSet?.[0];
  return {
    sent: status?.Code === "Ok",
    phase,
    recipient: maskMainlandPhone(config.allowedTo),
    code: status?.Code ?? "Unknown",
    message: status?.Message ?? "腾讯云未返回发送状态",
    requestId: response.RequestId
  };
}
