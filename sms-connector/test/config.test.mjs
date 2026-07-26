import test from "node:test";
import assert from "node:assert/strict";
import { loadConfig, maskMainlandPhone } from "../src/config.mjs";
import { previewReminder, sendReminder } from "../src/reminders.mjs";

function validEnv(overrides = {}) {
  return {
    TENCENT_SMS_ALLOWED_TO: "+8613800138000",
    TENCENT_SMS_SDK_APP_ID: "1400000000",
    TENCENT_SMS_SIGN_NAME: "测试签名",
    TENCENT_SMS_MORNING_TEMPLATE_ID: "100001",
    TENCENT_SMS_AFTERNOON_TEMPLATE_ID: "100002",
    TENCENT_SMS_MORNING_PARAMS_JSON: "[]",
    TENCENT_SMS_AFTERNOON_PARAMS_JSON: "[]",
    TENCENT_SMS_DRY_RUN: "true",
    ...overrides
  };
}

test("默认保持演练模式并固定两个模板", () => {
  const config = loadConfig(validEnv());
  assert.equal(config.dryRun, true);
  assert.equal(config.reminders.morning.templateId, "100001");
  assert.equal(config.reminders.afternoon.templateId, "100002");
});

test("拒绝非中国大陆 E.164 手机号", () => {
  assert.throws(
    () => loadConfig(validEnv({ TENCENT_SMS_ALLOWED_TO: "13800138000" })),
    /\+86/
  );
});

test("预览时手机号被脱敏", () => {
  const preview = previewReminder("morning", validEnv());
  assert.equal(preview.recipient, "+8613****8000");
  assert.equal(maskMainlandPhone("+8613800138000"), "+8613****8000");
});

test("演练模式不需要密钥且不会发送", async () => {
  const result = await sendReminder("afternoon", validEnv());
  assert.equal(result.sent, false);
  assert.equal(result.reason, "dry_run");
});

test("关闭演练模式后必须提供腾讯云密钥", async () => {
  await assert.rejects(
    sendReminder("morning", validEnv({ TENCENT_SMS_DRY_RUN: "false" })),
    /TENCENTCLOUD_SECRET_ID/
  );
});
