const MAINLAND_PHONE = /^\+86\d{11}$/;

function required(env, name) {
  const value = env[name]?.trim();
  if (!value) {
    throw new Error(`缺少环境变量 ${name}`);
  }
  return value;
}

function parseBoolean(value, defaultValue) {
  if (value === undefined || value === "") return defaultValue;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error("TENCENT_SMS_DRY_RUN 只能是 true 或 false");
}

function parseTemplateParams(env, name) {
  const raw = env[name]?.trim() || "[]";
  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error(`${name} 必须是 JSON 数组`);
  }

  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${name} 必须是字符串组成的 JSON 数组`);
  }
  if (value.length > 10 || value.some((item) => item.length > 64)) {
    throw new Error(`${name} 最多 10 项，且每项不得超过 64 个字符`);
  }
  return value;
}

export function maskMainlandPhone(phone) {
  return `${phone.slice(0, 5)}****${phone.slice(-4)}`;
}

export function loadConfig(env = process.env, { requireCredentials = false } = {}) {
  const allowedTo = required(env, "TENCENT_SMS_ALLOWED_TO");
  if (!MAINLAND_PHONE.test(allowedTo)) {
    throw new Error("TENCENT_SMS_ALLOWED_TO 必须是 +86 加 11 位手机号");
  }

  const config = {
    allowedTo,
    appId: required(env, "TENCENT_SMS_SDK_APP_ID"),
    signName: required(env, "TENCENT_SMS_SIGN_NAME"),
    dryRun: parseBoolean(env.TENCENT_SMS_DRY_RUN, true),
    region: env.TENCENT_SMS_REGION?.trim() || "ap-guangzhou",
    endpoint: env.TENCENT_SMS_ENDPOINT?.trim() || "sms.tencentcloudapi.com",
    reminders: {
      morning: {
        templateId: required(env, "TENCENT_SMS_MORNING_TEMPLATE_ID"),
        templateParams: parseTemplateParams(env, "TENCENT_SMS_MORNING_PARAMS_JSON")
      },
      afternoon: {
        templateId: required(env, "TENCENT_SMS_AFTERNOON_TEMPLATE_ID"),
        templateParams: parseTemplateParams(env, "TENCENT_SMS_AFTERNOON_PARAMS_JSON")
      }
    }
  };

  if (requireCredentials) {
    config.credentials = {
      secretId: required(env, "TENCENTCLOUD_SECRET_ID"),
      secretKey: required(env, "TENCENTCLOUD_SECRET_KEY")
    };
  }

  return config;
}
