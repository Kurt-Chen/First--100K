# 腾讯云短信提醒 MCP

这是一个受限的本地 MCP 服务，用于给唯一预设的中国大陆手机号发送每天上午、下午两条机会验证提醒。

## 安全边界

- 收件手机号由 `TENCENT_SMS_ALLOWED_TO` 固定，MCP 工具不能临时更换。
- 上午和下午分别使用已审核的固定模板，MCP 工具不能发送任意正文。
- 默认 `TENCENT_SMS_DRY_RUN=true`，只返回预演结果。
- 真实发送还需要工具参数 `confirm=true`。
- 手机号只以脱敏形式出现在工具返回结果中。
- 腾讯云密钥只从进程环境变量读取。

## 1. 在腾讯云准备短信资源

在腾讯云短信控制台完成：

1. 实名认证并创建短信应用，取得 `SmsSdkAppId`。
2. 申请短信签名。
3. 申请两个固定内容模板。

上午模板建议：

> 企业家等于问题学家，问题就是机会。上午任务：收集三个真实问题，评估潜力，选出一个值得验证的机会。

下午模板建议：

> 根据价值方程，为今天选中的问题制作一个大满贯报价，并联系五位目标客户完成最小测试。

短信模板最终内容以腾讯云审核结果为准。若审核后的模板含变量，把变量值按顺序填写到对应的 `*_PARAMS_JSON` 环境变量。

## 2. 安装依赖

```powershell
cd "D:\Codex\第一个10万元\sms-connector"
npm install
```

## 3. 配置环境变量

将 `.env.example` 复制为 `.env.local`，然后填写真实值。`.env.local` 已被 Git 忽略。手机号必须使用 `+86` 加 11 位号码。

不要把密钥写入仓库、Codex 对话或 `codex-config.example.toml`。

首次配置时保留：

```text
TENCENT_SMS_DRY_RUN=true
```

## 4. 注册 MCP

项目 `.codex/config.toml` 已注册连接器。填写 `.env.local` 后重启 Codex。

先调用：

```text
preview_reminder_sms
```

确认脱敏手机号、签名和模板 ID 正确。再调用 `send_reminder_sms`，此时仍只会演练。

## 5. 发送真实测试短信

确认腾讯云模板已审核、账户有余额且演练结果正确后，将：

```text
TENCENT_SMS_DRY_RUN=false
```

重启 Codex，只发送一条测试短信并核对腾讯云回执。之后才能让自动化在每天 09:00 和 16:00 调用 `send_reminder_sms`。

## 本地验证

```powershell
npm run check
npm test
```
