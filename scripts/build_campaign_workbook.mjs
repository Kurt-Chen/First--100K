import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "outputs";
const outputPath = `${outputDir}/one_person_company_profit_sprint.xlsx`;
await fs.mkdir(outputDir, { recursive: true });

const wb = Workbook.create();

const theme = {
  navy: "#17324D",
  teal: "#0F766E",
  green: "#1F7A4D",
  amber: "#F59E0B",
  red: "#DC2626",
  ink: "#172033",
  muted: "#64748B",
  surface: "#F7FAFC",
  lightTeal: "#DFF3EE",
  lightAmber: "#FFF3D6",
  lightRed: "#FEE2E2",
  grid: "#D8E0E8",
  white: "#FFFFFF",
  inputBlue: "#0000FF",
  inputFill: "#FFF7CC",
};

function setTitle(sheet, range, title, subtitle = "") {
  const r = sheet.getRange(range);
  r.merge();
  r.values = [[title + (subtitle ? `\n${subtitle}` : "")]];
  r.format = {
    fill: theme.navy,
    font: { bold: true, color: theme.white, size: 16 },
    wrapText: true,
    horizontalAlignment: "center",
    verticalAlignment: "center",
  };
}

function styleHeader(range, fill = theme.teal) {
  range.format = {
    fill,
    font: { bold: true, color: theme.white },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { all: { style: "continuous", color: theme.grid, weight: "thin" } },
  };
}

function styleBlock(range, fill = theme.surface) {
  range.format = {
    fill,
    font: { color: theme.ink },
    borders: { all: { style: "continuous", color: theme.grid, weight: "thin" } },
    wrapText: true,
    verticalAlignment: "top",
  };
}

function setWidths(sheet, widths) {
  for (const [col, px] of Object.entries(widths)) {
    sheet.getRange(`${col}:${col}`).format.columnWidthPx = px;
  }
}

function addStatusValidation(range, values) {
  range.dataValidation = { rule: { type: "list", values } };
}

const dashboard = wb.worksheets.add("Dashboard");
const crm = wb.worksheets.add("CRM");
const daily = wb.worksheets.add("Daily_KPI");
const diagnostic = wb.worksheets.add("Profit_Diagnostic");
const pricing = wb.worksheets.add("Pricing_Calculator");
const cash = wb.worksheets.add("Cashflow_8W");
const delivery = wb.worksheets.add("Delivery_Checklist");
const scripts = wb.worksheets.add("Script_Library");

for (const sheet of [dashboard, crm, daily, diagnostic, pricing, cash, delivery, scripts]) {
  sheet.showGridLines = false;
}

// CRM
setTitle(crm, "A1:O1", "一人公司利润体检 CRM", "每天录入 50 个有效触达对象，所有漏斗指标会自动汇总到 Dashboard");
const crmHeaders = [
  "ID",
  "触达日期",
  "渠道",
  "昵称/账号",
  "业务类型",
  "状态",
  "是否发清单",
  "核心痛点",
  "下一步",
  "跟进日期",
  "报价类型",
  "收款金额",
  "收款日期",
  "交付状态",
  "备注",
];
crm.getRange("A3:O3").values = [crmHeaders];
styleHeader(crm.getRange("A3:O3"));
const crmRows = 700;
crm.getRange(`A4:A${3 + crmRows}`).formulas = Array.from({ length: crmRows }, (_, i) => [`=IF(B${4 + i}<>"",ROW()-3,"")`]);
crm.getRange(`B4:B${3 + crmRows}`).setNumberFormat("yyyy-mm-dd");
crm.getRange(`J4:J${3 + crmRows}`).setNumberFormat("yyyy-mm-dd");
crm.getRange(`L4:L${3 + crmRows}`).setNumberFormat("¥#,##0;[Red](¥#,##0);-");
crm.getRange(`M4:M${3 + crmRows}`).setNumberFormat("yyyy-mm-dd");
styleBlock(crm.getRange(`A4:O${3 + crmRows}`), theme.white);
crm.tables.add(`A3:O${3 + crmRows}`, true, "CRM_Table");
crm.freezePanes.freezeRows(3);
setWidths(crm, {
  A: 52, B: 92, C: 110, D: 150, E: 150, F: 110, G: 105, H: 220, I: 180, J: 92, K: 120, L: 100, M: 92, N: 115, O: 220,
});
addStatusValidation(crm.getRange(`C4:C${3 + crmRows}`), ["小红书", "即刻", "微信社群", "知识星球", "公众号", "朋友转介绍", "其他"]);
addStatusValidation(crm.getRange(`F4:F${3 + crmRows}`), ["未回", "已回复", "已领清单", "已深聊", "已报价", "已付款", "已交付", "无效"]);
addStatusValidation(crm.getRange(`G4:G${3 + crmRows}`), ["否", "是"]);
addStatusValidation(crm.getRange(`K4:K${3 + crmRows}`), ["1299利润体检", "999限时体检", "499迷你诊断", "1999恢复价"]);
addStatusValidation(crm.getRange(`N4:N${3 + crmRows}`), ["未开始", "资料待收", "诊断中", "已交付", "需复盘"]);

crm.getRange("A4:O8").values = [
  ["", new Date("2026-06-17"), "小红书", "样板客户A", "咨询/陪跑", "已付款", "是", "报价低，交付重", "48小时交付", new Date("2026-06-18"), "1299利润体检", 1299, new Date("2026-06-17"), "诊断中", "示例，可删除"],
  ["", new Date("2026-06-17"), "即刻", "样板客户B", "自由职业设计", "已报价", "是", "低价项目太多", "明晚跟进", new Date("2026-06-18"), "1299利润体检", "", "", "未开始", "示例，可删除"],
  ["", new Date("2026-06-17"), "微信社群", "样板客户C", "知识付费", "已深聊", "是", "现金流紧", "发资料清单", new Date("2026-06-17"), "", "", "", "未开始", "示例，可删除"],
  ["", new Date("2026-06-17"), "公众号", "样板客户D", "文案服务", "已领清单", "是", "不敢涨价", "问3个筛选问题", new Date("2026-06-18"), "", "", "", "未开始", "示例，可删除"],
  ["", new Date("2026-06-17"), "知识星球", "样板客户E", "代运营", "未回", "否", "", "24小时后换话术", new Date("2026-06-18"), "", "", "", "未开始", "示例，可删除"],
];
crm.getRange("A4:A8").formulas = [["=IF(B4<>\"\",ROW()-3,\"\")"], ["=IF(B5<>\"\",ROW()-3,\"\")"], ["=IF(B6<>\"\",ROW()-3,\"\")"], ["=IF(B7<>\"\",ROW()-3,\"\")"], ["=IF(B8<>\"\",ROW()-3,\"\")"]];

// Daily KPI
setTitle(daily, "A1:K1", "14 天每日 KPI", "Day 4 未达标就改价和改人群，不硬扛原话术");
daily.getRange("A3:K3").values = [[
  "Day", "日期", "阶段", "触达目标", "实际触达", "回复数", "深聊数", "付款数", "收款", "今日话术优化", "复盘备注",
]];
styleHeader(daily.getRange("A3:K3"));
const phases = [
  "样板+销售资产",
  "第一轮触达",
  "第一轮触达",
  "第4天校准",
  "成交+交付",
  "成交+交付",
  "第7天校准",
  "案例放大",
  "案例放大",
  "案例放大",
  "案例放大",
  "冲刺跟进",
  "冲刺跟进",
  "最终收款",
];
const dailyRows = phases.map((phase, idx) => [idx + 1, new Date(Date.UTC(2026, 5, 17 + idx)), phase, 50, "", "", "", "", "", "", ""]);
daily.getRange("A4:K17").values = dailyRows;
daily.getRange("E4").formulas = [["=COUNTIFS(CRM!$B$4:$B$703,B4)"]];
daily.getRange("F4").formulas = [["=COUNTIFS(CRM!$B$4:$B$703,B4,CRM!$F$4:$F$703,\"<>未回\",CRM!$F$4:$F$703,\"<>无效\")"]];
daily.getRange("G4").formulas = [["=COUNTIFS(CRM!$B$4:$B$703,B4,CRM!$F$4:$F$703,\"已深聊\")+COUNTIFS(CRM!$B$4:$B$703,B4,CRM!$F$4:$F$703,\"已报价\")+COUNTIFS(CRM!$B$4:$B$703,B4,CRM!$F$4:$F$703,\"已付款\")+COUNTIFS(CRM!$B$4:$B$703,B4,CRM!$F$4:$F$703,\"已交付\")"]];
daily.getRange("H4").formulas = [["=COUNTIFS(CRM!$M$4:$M$703,B4)"]];
daily.getRange("I4").formulas = [["=SUMIFS(CRM!$L$4:$L$703,CRM!$M$4:$M$703,B4)"]];
daily.getRange("E4:I17").fillDown();
daily.getRange("B4:B17").setNumberFormat("yyyy-mm-dd");
daily.getRange("I4:I17").setNumberFormat("¥#,##0;[Red](¥#,##0);-");
styleBlock(daily.getRange("A4:K17"), theme.white);
daily.tables.add("A3:K17", true, "Daily_KPI_Table");
daily.freezePanes.freezeRows(3);
setWidths(daily, { A: 58, B: 105, C: 130, D: 82, E: 82, F: 74, G: 74, H: 74, I: 100, J: 220, K: 260 });

// Dashboard
setTitle(dashboard, "A1:H1", "一人公司利润体检冲刺 Dashboard", "目标：14 天收款 5000 元以上；默认 4 单 × 1299 元");
dashboard.getRange("A3:B11").values = [
  ["指标", "当前值"],
  ["收款目标", 5000],
  ["已收款", ""],
  ["距离目标", ""],
  ["有效触达", ""],
  ["回复数", ""],
  ["领取清单", ""],
  ["深聊/报价/付款", ""],
  ["付款单数", ""],
];
dashboard.getRange("B5").formulas = [["=SUM(CRM!L4:L703)"]];
dashboard.getRange("B6").formulas = [["=MAX(0,B4-B5)"]];
dashboard.getRange("B7").formulas = [["=COUNTA(CRM!B4:B703)"]];
dashboard.getRange("B8").formulas = [["=COUNTIF(CRM!F4:F703,\"<>未回\")-COUNTIF(CRM!F4:F703,\"无效\")"]];
dashboard.getRange("B9").formulas = [["=COUNTIF(CRM!G4:G703,\"是\")"]];
dashboard.getRange("B10").formulas = [["=COUNTIF(CRM!F4:F703,\"已深聊\")+COUNTIF(CRM!F4:F703,\"已报价\")+COUNTIF(CRM!F4:F703,\"已付款\")+COUNTIF(CRM!F4:F703,\"已交付\")"]];
dashboard.getRange("B11").formulas = [["=COUNTIF(CRM!F4:F703,\"已付款\")+COUNTIF(CRM!F4:F703,\"已交付\")"]];
styleHeader(dashboard.getRange("A3:B3"), theme.navy);
styleBlock(dashboard.getRange("A4:B11"), theme.white);
dashboard.getRange("B4:B6").setNumberFormat("¥#,##0;[Red](¥#,##0);-");
dashboard.getRange("D3:E11").values = [
  ["漏斗指标", "当前值"],
  ["回复率", ""],
  ["清单领取率", ""],
  ["深聊率", ""],
  ["付款转化率", ""],
  ["平均客单价", ""],
  ["Day 4 状态", ""],
  ["Day 7 状态", ""],
  ["最终状态", ""],
];
dashboard.getRange("E4").formulas = [["=IF(B7=0,0,B8/B7)"]];
dashboard.getRange("E5").formulas = [["=IF(B8=0,0,B9/B8)"]];
dashboard.getRange("E6").formulas = [["=IF(B7=0,0,B10/B7)"]];
dashboard.getRange("E7").formulas = [["=IF(B7=0,0,B11/B7)"]];
dashboard.getRange("E8").formulas = [["=IF(B11=0,0,B5/B11)"]];
dashboard.getRange("E9").formulas = [["=IF(AND(SUM(Daily_KPI!E4:E7)>=200,SUM(Daily_KPI!F4:F7)>=15,OR(B11>=1,COUNTIF(CRM!F4:F703,\"已报价\")>=3)),\"OK\",\"改价/改人群\")"]];
dashboard.getRange("E10").formulas = [["=IF(COUNTIF(CRM!N4:N703,\"已交付\")>=1,\"OK\",\"需要首个交付\")"]];
dashboard.getRange("E11").formulas = [["=IF(B5>=5000,\"OK\",\"继续冲刺\")"]];
styleHeader(dashboard.getRange("D3:E3"), theme.navy);
styleBlock(dashboard.getRange("D4:E11"), theme.white);
dashboard.getRange("E4:E7").setNumberFormat("0.0%");
dashboard.getRange("E8").setNumberFormat("¥#,##0;[Red](¥#,##0);-");
dashboard.getRange("A13:H17").values = [
  ["执行提醒", "", "", "", "", "", "", ""],
  ["每天 50 个有效触达；有回复先发自查清单，再问 3 个诊断问题。", "", "", "", "", "", "", ""],
  ["Day 4 没有 1 个付款或 3 个明确问价，就把主服务临时降到 999 元。", "", "", "", "", "", "", ""],
  ["服务只做经营财务/报价诊断，不做税务、审计、投资建议。", "", "", "", "", "", "", ""],
  ["两周目标以实际收款为准，不以意向计算。", "", "", "", "", "", "", ""],
];
dashboard.getRange("A13:H13").merge();
dashboard.getRange("A14:H17").merge(true);
styleHeader(dashboard.getRange("A13:H13"), theme.teal);
styleBlock(dashboard.getRange("A14:H17"), theme.lightTeal);
dashboard.getRange("G3:H9").values = [
  ["状态色", "含义"],
  ["OK", "达标"],
  ["继续冲刺", "未到终点"],
  ["改价/改人群", "触达策略需调整"],
  ["需要首个交付", "缺少样板反馈"],
  ["", ""],
  ["注意", "客户数据请手动录入 CRM"],
];
styleHeader(dashboard.getRange("G3:H3"), theme.navy);
styleBlock(dashboard.getRange("G4:H9"), theme.white);
const chart = dashboard.charts.add("bar", daily.getRange("B3:I17"));
chart.title = "每日触达与收款";
chart.hasLegend = true;
chart.xAxis = { axisType: "textAxis" };
chart.yAxis = { numberFormatCode: "0" };
chart.setPosition("A20", "H36");
setWidths(dashboard, { A: 140, B: 120, C: 35, D: 140, E: 135, F: 35, G: 120, H: 200 });

// Profit diagnostic
setTitle(diagnostic, "A1:H1", "利润体检模板", "填写客户最近 30 天收入与成本，自动计算利润、利润率和本人时薪");
diagnostic.getRange("A3:D3").values = [["收入项", "单价", "数量", "收入"]];
styleHeader(diagnostic.getRange("A3:D3"));
diagnostic.getRange("A4:D13").values = [
  ["单次咨询", 599, 20, ""],
  ["月度陪跑", 3999, 3, ""],
  ["资料包", 99, 61, ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["收入合计", "", "", ""],
];
diagnostic.getRange("D4").formulas = [["=IF(OR(B4=\"\",C4=\"\"),\"\",B4*C4)"]];
diagnostic.getRange("D4:D12").fillDown();
diagnostic.getRange("D13").formulas = [["=SUM(D4:D12)"]];
diagnostic.getRange("B4:D13").setNumberFormat("¥#,##0;[Red](¥#,##0);-");
diagnostic.getRange("C4:C12").setNumberFormat("#,##0");
diagnostic.getRange("F3:H3").values = [["成本项", "金额", "类型"]];
styleHeader(diagnostic.getRange("F3:H3"));
diagnostic.getRange("F4:H13").values = [
  ["软件/工具", 1200, "固定"],
  ["社群/学习", 1000, "固定"],
  ["办公/设备", 1600, "固定"],
  ["外包整理", 3000, "变动"],
  ["平台手续费", 1200, "变动"],
  ["材料/交付", 1000, "变动"],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["成本合计", "", ""],
];
diagnostic.getRange("G13").formulas = [["=SUM(G4:G12)"]];
diagnostic.getRange("G4:G13").setNumberFormat("¥#,##0;[Red](¥#,##0);-");
addStatusValidation(diagnostic.getRange("H4:H12"), ["固定", "变动"]);
diagnostic.getRange("A16:B24").values = [
  ["经营快照", ""],
  ["总收入", ""],
  ["总成本", ""],
  ["估算利润", ""],
  ["估算利润率", ""],
  ["本人交付小时", 95],
  ["估算本人时薪", ""],
  ["最赚钱收入项", ""],
  ["最大成本项", ""],
];
diagnostic.getRange("B17").formulas = [["=D13"]];
diagnostic.getRange("B18").formulas = [["=G13"]];
diagnostic.getRange("B19").formulas = [["=B17-B18"]];
diagnostic.getRange("B20").formulas = [["=IF(B17=0,0,B19/B17)"]];
diagnostic.getRange("B22").formulas = [["=IF(B21=0,0,B19/B21)"]];
diagnostic.getRange("B23").formulas = [["=INDEX(A4:A12,MATCH(MAX(D4:D12),D4:D12,0))"]];
diagnostic.getRange("B24").formulas = [["=INDEX(F4:F12,MATCH(MAX(G4:G12),G4:G12,0))"]];
styleHeader(diagnostic.getRange("A16:B16"), theme.navy);
styleBlock(diagnostic.getRange("A17:B24"), theme.white);
diagnostic.getRange("B17:B19").setNumberFormat("¥#,##0;[Red](¥#,##0);-");
diagnostic.getRange("B20").setNumberFormat("0.0%");
diagnostic.getRange("B21").setNumberFormat("#,##0");
diagnostic.getRange("B22").setNumberFormat("¥#,##0;[Red](¥#,##0);-");
diagnostic.getRange("D16:H24").values = [
  ["3 个利润漏洞", "", "", "", ""],
  ["漏洞 1", "单次咨询交付碎片化，吃掉注意力。", "", "", ""],
  ["证据", "收入不低，但需要大量零散沟通。", "", "", ""],
  ["动作", "把单次咨询降级为筛选入口。", "", "", ""],
  ["漏洞 2", "资料包成交多，但没有升单路径。", "", "", ""],
  ["动作", "资料包购买后 24 小时内引导轻诊断。", "", "", ""],
  ["漏洞 3", "高利润陪跑没有成为主推入口。", "", "", ""],
  ["30 天动作", "把 3999 元陪跑改为核心报价。", "", "", ""],
  ["", "", "", "", ""],
];
diagnostic.getRange("D16:H16").merge();
diagnostic.getRange("E17:H24").merge(true);
styleHeader(diagnostic.getRange("D16:H16"), theme.teal);
styleBlock(diagnostic.getRange("D17:H24"), theme.white);
styleBlock(diagnostic.getRange("A4:D13"), theme.white);
styleBlock(diagnostic.getRange("F4:H13"), theme.white);
diagnostic.getRange("B4:C12").format.font = { color: theme.inputBlue };
diagnostic.getRange("G4:G12").format.font = { color: theme.inputBlue };
diagnostic.getRange("B21").format.font = { color: theme.inputBlue };
diagnostic.getRange("B4:C12").format.fill = theme.inputFill;
diagnostic.getRange("G4:G12").format.fill = theme.inputFill;
diagnostic.getRange("B21").format.fill = theme.inputFill;
setWidths(diagnostic, { A: 160, B: 100, C: 75, D: 105, E: 20, F: 150, G: 100, H: 100 });

// Pricing calculator
setTitle(pricing, "A1:H1", "报价/套餐测算", "输入价格、预计成交和交付小时，判断哪个服务最值得主推");
pricing.getRange("A3:H3").values = [["套餐", "价格", "预计月销量", "月收入", "每单交付小时", "总小时", "收入/小时", "建议"]];
styleHeader(pricing.getRange("A3:H3"));
pricing.getRange("A4:H8").values = [
  ["499 轻诊断", 499, 6, "", 1.0, "", "", "获客/筛选入口"],
  ["1299 利润体检", 1299, 4, "", 3.0, "", "", "两周主推"],
  ["3999 月度陪跑", 3999, 2, "", 8.0, "", "", "高利润核心"],
  ["6999 深度陪跑", 6999, 1, "", 14.0, "", "", "限量高阶"],
  ["合计", "", "", "", "", "", "", ""],
];
pricing.getRange("D4").formulas = [["=IF(OR(B4=\"\",C4=\"\"),\"\",B4*C4)"]];
pricing.getRange("F4").formulas = [["=IF(OR(C4=\"\",E4=\"\"),\"\",C4*E4)"]];
pricing.getRange("G4").formulas = [["=IF(F4=0,\"\",D4/F4)"]];
pricing.getRange("D4:G7").fillDown();
pricing.getRange("D8").formulas = [["=SUM(D4:D7)"]];
pricing.getRange("F8").formulas = [["=SUM(F4:F7)"]];
pricing.getRange("G8").formulas = [["=IF(F8=0,\"\",D8/F8)"]];
pricing.getRange("B4:D8").setNumberFormat("¥#,##0;[Red](¥#,##0);-");
pricing.getRange("E4:F8").setNumberFormat("0.0");
pricing.getRange("G4:G8").setNumberFormat("¥#,##0;[Red](¥#,##0);-");
styleBlock(pricing.getRange("A4:H8"), theme.white);
pricing.getRange("B4:C7").format.fill = theme.inputFill;
pricing.getRange("E4:E7").format.fill = theme.inputFill;
pricing.getRange("B4:C7").format.font = { color: theme.inputBlue };
pricing.getRange("E4:E7").format.font = { color: theme.inputBlue };
pricing.tables.add("A3:H8", true, "Pricing_Table");
setWidths(pricing, { A: 150, B: 95, C: 95, D: 110, E: 105, F: 85, G: 110, H: 160 });

// Cash flow
setTitle(cash, "A1:J1", "未来 8 周现金流预警", "输入每周确定收款和支出，自动标记风险周");
cash.getRange("A3:J3").values = [["项目", "Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "合计"]];
styleHeader(cash.getRange("A3:J3"));
cash.getRange("A4:J11").values = [
  ["期初现金", 5000, "", "", "", "", "", "", "", ""],
  ["确定收款", 1299, 1299, 0, 1299, 0, 0, 1299, 0, ""],
  ["确定支出", 1800, 1200, 1600, 1200, 2800, 1200, 1200, 1600, ""],
  ["净现金流", "", "", "", "", "", "", "", "", ""],
  ["期末现金", "", "", "", "", "", "", "", "", ""],
  ["最低安全现金", 3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, ""],
  ["风险状态", "", "", "", "", "", "", "", "", ""],
  ["建议动作", "", "", "", "", "", "", "", "", ""],
];
cash.getRange("B7").formulas = [["=B5-B6"]];
cash.getRange("B8").formulas = [["=B4+B7"]];
cash.getRange("C4").formulas = [["=B8"]];
cash.getRange("C4:I4").fillRight();
cash.getRange("C7:I7").formulas = [["=C5-C6", "=D5-D6", "=E5-E6", "=F5-F6", "=G5-G6", "=H5-H6", "=I5-I6"]];
cash.getRange("C8:I8").formulas = [["=C4+C7", "=D4+D7", "=E4+E7", "=F4+F7", "=G4+G7", "=H4+H7", "=I4+I7"]];
cash.getRange("B9:I9").formulas = [["=IF(B8<B9,\"风险\",IF(B8<B9*1.5,\"关注\",\"OK\"))", "=IF(C8<C9,\"风险\",IF(C8<C9*1.5,\"关注\",\"OK\"))", "=IF(D8<D9,\"风险\",IF(D8<D9*1.5,\"关注\",\"OK\"))", "=IF(E8<E9,\"风险\",IF(E8<E9*1.5,\"关注\",\"OK\"))", "=IF(F8<F9,\"风险\",IF(F8<F9*1.5,\"关注\",\"OK\"))", "=IF(G8<G9,\"风险\",IF(G8<G9*1.5,\"关注\",\"OK\"))", "=IF(H8<H9,\"风险\",IF(H8<H9*1.5,\"关注\",\"OK\"))", "=IF(I8<I9,\"风险\",IF(I8<I9*1.5,\"关注\",\"OK\"))"]];
cash.getRange("B10:I10").formulas = [["=IF(B9=\"风险\",\"提前收款/砍支出\",IF(B9=\"关注\",\"跟进应收款\",\"维持\"))", "=IF(C9=\"风险\",\"提前收款/砍支出\",IF(C9=\"关注\",\"跟进应收款\",\"维持\"))", "=IF(D9=\"风险\",\"提前收款/砍支出\",IF(D9=\"关注\",\"跟进应收款\",\"维持\"))", "=IF(E9=\"风险\",\"提前收款/砍支出\",IF(E9=\"关注\",\"跟进应收款\",\"维持\"))", "=IF(F9=\"风险\",\"提前收款/砍支出\",IF(F9=\"关注\",\"跟进应收款\",\"维持\"))", "=IF(G9=\"风险\",\"提前收款/砍支出\",IF(G9=\"关注\",\"跟进应收款\",\"维持\"))", "=IF(H9=\"风险\",\"提前收款/砍支出\",IF(H9=\"关注\",\"跟进应收款\",\"维持\"))", "=IF(I9=\"风险\",\"提前收款/砍支出\",IF(I9=\"关注\",\"跟进应收款\",\"维持\"))"]];
cash.getRange("J5").formulas = [["=SUM(B5:I5)"]];
cash.getRange("J6").formulas = [["=SUM(B6:I6)"]];
cash.getRange("J7").formulas = [["=SUM(B7:I7)"]];
cash.getRange("J8").formulas = [["=I8"]];
cash.getRange("B4:J8").setNumberFormat("¥#,##0;[Red](¥#,##0);-");
cash.getRange("B4:I6").format.fill = theme.inputFill;
cash.getRange("B4:I6").format.font = { color: theme.inputBlue };
styleBlock(cash.getRange("A4:J11"), theme.white);
setWidths(cash, { A: 130, B: 95, C: 95, D: 95, E: 95, F: 95, G: 95, H: 95, I: 95, J: 100 });

// Delivery checklist
setTitle(delivery, "A1:F1", "交付检查表", "每个已付款客户都复制一组检查，保证 48 小时内交付完整");
delivery.getRange("A3:F3").values = [["阶段", "任务", "负责人", "截止时间", "状态", "备注"]];
styleHeader(delivery.getRange("A3:F3"));
delivery.getRange("A4:F16").values = [
  ["收集", "确认付款并锁定 48 小时交付时间", "我", "", "未开始", ""],
  ["收集", "收集最近 30 天收入明细", "客户", "", "未开始", ""],
  ["收集", "收集最近 30 天成本明细", "客户", "", "未开始", ""],
  ["收集", "收集当前报价和交付小时", "客户", "", "未开始", ""],
  ["收集", "收集未来 8 周确定收支", "客户", "", "未开始", ""],
  ["诊断", "填写利润体检模板", "我", "", "未开始", ""],
  ["诊断", "找出 3 个利润漏洞", "我", "", "未开始", ""],
  ["诊断", "完成报价/套餐测算", "我", "", "未开始", ""],
  ["诊断", "完成 8 周现金流预警", "我", "", "未开始", ""],
  ["交付", "输出 30 天唯一优先动作", "我", "", "未开始", ""],
  ["交付", "写 3 条客户沟通话术", "我", "", "未开始", ""],
  ["交付", "发送表格、文档和语音讲解", "我", "", "未开始", ""],
  ["复盘", "确认是否需要 30 分钟补充复盘", "我", "", "未开始", ""],
];
delivery.getRange("D4:D16").setNumberFormat("yyyy-mm-dd hh:mm");
addStatusValidation(delivery.getRange("E4:E16"), ["未开始", "进行中", "已完成", "卡住"]);
styleBlock(delivery.getRange("A4:F16"), theme.white);
delivery.tables.add("A3:F16", true, "Delivery_Checklist_Table");
setWidths(delivery, { A: 90, B: 260, C: 70, D: 145, E: 95, F: 220 });

// Script library
setTitle(scripts, "A1:D1", "话术库", "复制到私信/微信后按客户行业微调");
scripts.getRange("A3:D3").values = [["场景", "目标", "话术", "下一步"]];
styleHeader(scripts.getRange("A3:D3"));
scripts.getRange("A4:D10").values = [
  ["冷触达", "领取自查清单", "你好，我看到你在做一人公司/咨询/陪跑类业务。我整理了一份免费「利润漏洞自查清单」，能快速看报价、交付和现金流有没有漏钱点。你要的话我发你。", "对方回复后发清单"],
  ["清单后跟进", "拿到3个关键信息", "你可以先回答 3 个：最近30天收入大概多少？主要成本或最耗时间的交付是什么？最焦虑的是利润低、现金流紧，还是报价不敢涨？", "判断是否推进体检"],
  ["推进主服务", "报价1299", "我有一个48小时一人公司利润体检，会整理收入、成本、利润、报价和未来8周现金流，最后给你3个利润漏洞和1个30天动作。前4个样板名额1299元。", "发资料清单并收款"],
  ["嫌贵", "保留主服务，给降阶", "理解。如果现在不想做完整体检，可以先做499元迷你诊断：只看一个最明显利润漏洞，并给一个7天动作。完整体检更适合已有稳定成交但利润不清楚的情况。", "二选一成交"],
  ["考虑一下", "制造合理截止", "可以。你只看一个问题：如果这次能帮你找到一个30天内多赚或少亏1299元以上的动作，就值得做。前4个1299名额满了恢复1999元。", "约定跟进时间"],
  ["成交", "收款并锁定交付", "确认的话我给你锁一个1299元样板名额。付款后我发资料清单，从资料完整时开始计48小时交付。", "收款"],
  ["边界声明", "控制风险", "这是经营财务和报价诊断，不包含税务申报、代理记账、审计、法律、投资或理财建议。", "写入每次交付"],
];
styleBlock(scripts.getRange("A4:D10"), theme.white);
scripts.tables.add("A3:D10", true, "Script_Library_Table");
setWidths(scripts, { A: 90, B: 130, C: 520, D: 150 });

// Global formatting touch-ups
for (const sheet of [dashboard, crm, daily, diagnostic, pricing, cash, delivery, scripts]) {
  const used = sheet.getUsedRange();
  if (used) {
    used.format.font = { name: "Microsoft YaHei", size: 10, color: theme.ink };
    used.format.verticalAlignment = "top";
  }
}

// Re-apply title/header after global font reset where needed
for (const [sheet, range] of [
  [dashboard, "A1:H1"],
  [crm, "A1:O1"],
  [daily, "A1:K1"],
  [diagnostic, "A1:H1"],
  [pricing, "A1:H1"],
  [cash, "A1:J1"],
  [delivery, "A1:F1"],
  [scripts, "A1:D1"],
]) {
  sheet.getRange(range).format = {
    fill: theme.navy,
    font: { name: "Microsoft YaHei", bold: true, color: theme.white, size: 16 },
    wrapText: true,
    horizontalAlignment: "center",
    verticalAlignment: "center",
  };
}

// Visual checks and export
const dashInspect = await wb.inspect({
  kind: "table",
  range: "Dashboard!A1:H17",
  include: "values,formulas",
  tableMaxRows: 20,
  tableMaxCols: 10,
  maxChars: 5000,
});
console.log(dashInspect.ndjson);

const formulaErrors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
  maxChars: 3000,
});
console.log(formulaErrors.ndjson);

for (const sheetName of ["Dashboard", "CRM", "Daily_KPI", "Profit_Diagnostic", "Pricing_Calculator", "Cashflow_8W", "Delivery_Checklist", "Script_Library"]) {
  const preview = await wb.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(`${outputDir}/preview_${sheetName}.png`, new Uint8Array(await preview.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(outputPath);
console.log(`Saved ${outputPath}`);
