const offers = [
  {
    id: "withdraw",
    name: "合规提现额度测算",
    price: 1280,
    pain: "不知道这个月到底能安全拿多少钱",
    audience: "月收入 1 万元以上、公司有现金流，但老板不知道每月该从经营账户里拿多少钱的一人公司主理人。",
    promise: "用你的真实经营数据，测算更稳妥的老板提现参考区间，并通过 30 分钟一对一电话解释怎么用。",
    result: "提现参考区间 + 提现节奏建议 + 提现决策卡",
    session: "30 分钟一对一解读电话",
    tags: ["提现", "现金流", "决策卡"],
    short: "我会用你的真实收入、成本、余额和未来 8 周收支，给你一个提现参考区间和提现节奏，并用 30 分钟电话帮你看懂这组数字。价格是 1280 元。",
    requirements: ["主体类型与当前拿钱方式", "最近 30 天收入与实际提现", "固定成本与变动成本", "当前可用现金余额", "未来 8 周确定收入与支出", "老板最低生活费需求"],
    deliverables: ["现金流健康度评分", "保守 / 建议 / 最高提现参考", "提现节奏建议", "提现决策卡", "30 分钟一对一解读电话"],
    risk: "如果测算结果与您提供的真实数据存在明显偏差，免费重新测算并补一次解读电话。",
    boundaries: "本服务只做经营现金流和提现参考测算，不替代税务师、律师或会计师的正式意见。",
    fieldIds: ["income", "fixedCost", "variableCost", "balance", "futureIncome", "futureExpense", "personalMinimum"],
    steps: [
      ["主体确认", "主体类型、当前拿钱方式与公私账户", "主体和资金路径必须说清", "公私混用或凭证不足时暂停给出“合规”结论", "主体与风险标记"],
      ["现金底图", "余额、近 30 天收支、应收与应付", "已发生未付款必须计入成本", "关键数据不完整时只保存草稿，不出最终区间", "本月现金底图"],
      ["8 周预测", "按周确认未来收入与不可延迟支出", "低概率收入不计入安全提现依据", "大额支出或客户延期付款后必须重算", "8 周现金位置"],
      ["三层留存", "必须留、安全垫、可提取三层资金", "先覆盖 4–8 周确定支出，再讨论可提取", "安全垫不足时降低提现建议", "三层资金边界"],
      ["提现区间", "保守额、建议额和最高参考额", "建议额不得突破安全垫", "利润为负或现金不足时建议暂停提现", "三档提现参考"],
      ["决策卡", "本月金额、上限、复核日期与重算事件", "每次重大现金变动都要复核", "退款、投放、外包增加时立即重算", "提现决策卡"],
    ],
    controlPoints: [
      ["停办", "主体不清、公私账户严重混用或关键数据缺失时，不给出最终提现结论。"],
      ["重算", "大额支出、延迟回款、退款、临时投放或外包增加时重新测算。"],
      ["升级", "如涉及税务、法律或股东借款定性，转交持证专业人士。"],
    ],
    scripts: {
      opening: "我发现很多一人公司不是没收入，而是不知道这个月到底能安全拿走多少钱。我现在做一个「合规提现额度测算」，用你的真实收支帮你算一个提现参考区间。",
      qualify: "我先判断你适不适合做这个测算：最近 30 天收入、当前余额、固定和变动成本、未来 8 周支出，以及最近实际拿走的金额分别是多少？",
      close: "你现在卡住的不是不会用表，而是不确定「这笔钱到底能不能拿」。我会给你一个提现参考区间，并用 30 分钟电话帮你解释。价格是 1280 元。",
      reverse: "如果测算结果和你提供的真实数据存在明显偏差，我免费重新测算，并补一次解读电话。",
      boundary: "我会基于你提供的数据做经营现金流和提现参考测算，但不替代税务师、律师或会计师给正式意见。",
    },
  },
  {
    id: "retain",
    name: "资金留存清单",
    price: 1480,
    pain: "账上有钱但不知道哪些钱不能动",
    audience: "账上有钱进来，但经营资金、老板可提取资金、未来支出和暂缓动用资金混在一起的一人公司主理人。",
    promise: "把账上资金分成「可提取、暂缓、需留存」三类，并用 45 分钟资金结构会议讲清每一类钱为什么这样放。",
    result: "可提取 / 暂缓 / 需留存三类资金清单",
    session: "45 分钟资金结构梳理会议",
    tags: ["留存", "资金分类", "一月修正"],
    short: "我会帮你把账上的钱分成可提取、暂缓、需留存三类，并开一次 45 分钟会议讲清分类逻辑。一个月内保留一次免费修正，价格 1480 元。",
    requirements: ["当前各账户余额", "未来 8 周确定收入", "未来 8 周确定支出", "每月固定成本", "近期大额支出与交付预留", "老板个人最低生活费"],
    deliverables: ["可提取 / 暂缓 / 需留存分类清单", "每类资金留存原因", "45 分钟资金结构会议", "一个月内一次免费修正"],
    risk: "清单交付后一个月内发现明显分类逻辑错误，免费重新梳理并加送一次复盘会议。",
    boundaries: "资金分类基于经营现金流原则和客户数据，不是正式税务、法律、投资或理财建议。",
    fieldIds: ["balance", "futureIncome", "futureExpense", "fixedCost", "variableCost", "taxReserve", "personalMinimum"],
    steps: [
      ["用途分类", "经营、税费、交付、固定成本、老板提取和增长投入", "每笔钱必须有唯一主要用途", "无法确认用途的资金先放入暂缓区", "资金用途底图"],
      ["必须留存", "已发生未支付成本和 4–8 周不可延迟支出", "税费、供应商、交付和固定成本优先", "未确认应付项时不得扩大可提取金额", "必须留存清单"],
      ["暂缓资金", "投放、购买工具、课程和可选外包", "安全垫达标且收入到账后再解锁", "收入延迟时继续冻结", "暂缓使用列表"],
      ["可提取资金", "扣除必须留存和暂缓后的剩余资金", "不突破本月经营安全垫", "安全垫不足时可提取额归零", "可提取上限"],
      ["梳理会议", "确认数据、解释三类资金、定下执行规则", "45 分钟内完成分类与下月规则", "数据争议未解决时不确认最终版", "资金分类执行规则"],
      ["一月修正", "新增大额收支、分类逻辑与客户执行情况", "逻辑错误免费修正一次", "客户未执行时只复盘解释，不承诺结果", "修正版资金清单"],
    ],
    controlPoints: [["冻结", "用途不明或未来支出未确认的资金先列入暂缓。"], ["重分", "新增大额收入或支出后重做三类分类。"], ["修正", "一个月内发现分类逻辑错误，免费修正并复盘。"]],
    scripts: {
      opening: "很多一人公司看到账上有钱，就以为这笔钱都能动。我做的「资金留存清单」会把账上的钱分成能拿、暂缓、必须留三类。",
      qualify: "我先看你适不适合做这个：当前余额、未来 8 周收支、每月固定成本、供应商/外包/交付支出，以及你本月想拿走多少分别是多少？",
      close: "你现在的问题不是有没有钱，而是不知道这些钱分别承担什么任务。我会帮你分成三类，并用 45 分钟会议讲清。价格是 1480 元。",
      reverse: "清单交付后一个月内，如果发现明显分类逻辑错误，我免费重新梳理，并加送一次复盘会议。",
      boundary: "这个清单基于经营现金流原则和你提供的数据做分类，不是正式税务、法律或投资建议。",
    },
  },
  {
    id: "profit",
    name: "真实利润还原器",
    price: 1480,
    pain: "不知道账面数字和真实利润差在哪里",
    audience: "有收入流水，但公司支出、个人支出、工具费、外包费、平台费和隐形成本混在一起的一人公司主理人。",
    promise: "还原最近 30 天真实利润，找出隐藏成本，并通过结果讲解电话帮你看懂数字背后的经营问题。",
    result: "利润拆解 + 隐藏成本扫描 + 月度追踪模板",
    session: "一次结果讲解电话",
    tags: ["利润", "隐藏成本", "讲解"],
    short: "我会帮你还原最近 30 天真实利润，扫描隐藏成本，再通过电话讲清数字背后的经营问题。价格 1480 元。",
    requirements: ["最近 30 天收入明细", "固定成本与变动成本", "工具、外包、平台费与退款", "个人支出和经营支出混用情况", "老板交付、沟通与售后时间", "主推产品/服务收入占比"],
    deliverables: ["利润拆解模板", "隐藏成本扫描", "账面利润与真实利润对比", "月度利润追踪模板", "结果讲解电话"],
    risk: "如果拆解结果与原始数据明显不符，免费重做并补一次讲解电话。",
    boundaries: "这是经营利润还原，不是会计审计或税务申报；数据越真实，结果越有参考价值。",
    fieldIds: ["income", "fixedCost", "variableCost", "hiddenCost", "personalExpense", "deliveryHours"],
    steps: [
      ["收入还原", "到账、未到账、退款、折扣与坏账风险", "只把可确认收入纳入利润", "大额未到账收入单独标记，不充当现金", "可确认收入"],
      ["固定成本", "软件、办公、平台、社群课程和固定外包", "周期性支出按本月分摊", "长期未使用的订阅进入隐藏成本审核", "固定成本清单"],
      ["变动成本", "项目外包、平台手续费、佣金、材料和售后", "成本必须归到产生它的收入", "无法归属时单独列出并说明假设", "变动成本清单"],
      ["隐藏成本", "时间、修改、免费答疑、闲置订阅与个人支出混用", "每一项都要给出金额或明确标记", "无法估算时使用保守区间并披露", "隐藏成本扫描"],
      ["利润对比", "账面收入、显性成本、隐藏成本与真实利润", "个人支出必须单独展示，不得隐藏", "数据与原始记录不符时重做", "账面/真实利润对比"],
      ["调整建议", "收入结构、失控成本与最先处理项", "只给出 1–3 个可执行优先项", "利润为负时先止损，不给扩张建议", "本月利润调整清单"],
    ],
    controlPoints: [["核对", "收入、成本必须能回到原始记录；不符时停止出报告。"], ["披露", "估算的时间成本和隐藏成本必须标注假设。"], ["止损", "真实利润为负时，优先停掉最大漏损项而不是继续扩张。"]],
    scripts: {
      opening: "很多一人公司不是没收入，而是被「账上有钱」骗了。我做的「真实利润还原器」就是把账面数字和真实能装进口袋的钱拆开。",
      qualify: "我先看你适不适合做这个拆解：最近 30 天收入、固定成本、变动成本、工具/外包/退款/个人支出，以及你现在以为的利润分别是多少？",
      close: "你现在不是缺一张表，而是缺一个人帮你把数字拆开看。我会做初步拆解，再通过电话帮你看懂。价格是 1480 元。",
      reverse: "如果拆解结果和你提供的原始数据明显不符，我免费重做，并补一次讲解电话。",
      boundary: "这个服务是经营利润还原，不是会计审计，也不是税务申报。",
    },
  },
  {
    id: "structure",
    name: "利润结构诊断",
    price: 1980,
    pain: "客户不少但报价和交付结构正在偷走利润",
    audience: "客户不少、项目不少、交付很忙，但老板可支配收入不高的一人公司主理人。",
    promise: "诊断客户/项目利润结构，找出最值得保留、涨价、降级或砍掉的业务，并在 30 天后做一次效果复盘。",
    result: "项目利润排行 + 报价优化 + 30 天后复盘",
    session: "一次诊断 + 30 天后效果复盘",
    tags: ["报价", "项目利润", "30 天复盘"],
    short: "我会帮你按客户/项目拆利润、看交付成本，给出报价结构优化建议和可执行调整清单，30 天后再复盘。价格 1980 元。",
    requirements: ["最近 30–90 天客户/项目列表", "每个项目收入与直接成本", "每个项目交付小时", "修改、沟通和售后时间", "当前报价与交付边界", "客户还价、嫌贵或超范围需求"],
    deliverables: ["客户/项目利润排行参考", "报价结构优化建议", "交付成本拆解", "可执行调整清单", "30 天后效果复盘会议"],
    risk: "按建议调整一个月后未见改善，免费复盘并重新出具一版调整建议。",
    boundaries: "效果取决于客户执行、市场反应和经营环境；不承诺固定收入增长结果。",
    fieldIds: ["income", "fixedCost", "variableCost", "hiddenCost", "deliveryHours", "projectCount", "revisionHours"],
    steps: [
      ["项目清单", "近 30–90 天项目、收入、交付内容与周期", "至少覆盖主要收入来源的 80%", "样本过少时只做预诊断，不下结构性结论", "客户/项目底图"],
      ["项目利润", "收入、直接成本、外包、工具佣金和售后修改", "每项成本必须归属到项目", "无法归属的成本单列为共享成本", "单项目利润"],
      ["有效时薪", "老板交付、沟通、修改与售后小时", "项目利润 ÷ 全部老板投入小时", "遗漏修改或售后时间时必须重算", "老板有效时薪"],
      ["利润排行", "高/低利润与高/低消耗四象限", "低利润高消耗项目必须进入调整列表", "高收入低时薪项目不得误标为优质", "项目利润排行"],
      ["漏利环节", "报价、范围、修改次数、筛选和售后边界", "只锁定有数据支持的主要漏损", "无数据支持时标记为待验证假设", "利润漏损地图"],
      ["30 天行动", "一个主报价、一个低利润项目、一个停止动作", "30 天内只做少量可比较调整", "数据口径改变时不直接比较前后结果", "30 天调整与复盘清单"],
    ],
    controlPoints: [["预诊断", "项目样本太少或覆盖收入不足 80% 时，只输出待验证假设。"], ["低时薪", "有效时薪低于目标时，优先调整交付边界或报价。"], ["复盘", "30 天后使用同一数据口径复盘；未改善则免费重出建议。"]],
    scripts: {
      opening: "如果你客户不少但老板拿不到钱，问题通常不是不努力，而是利润结构有问题。我做的「利润结构诊断」会找出哪些项目赚钱，哪些正在偷走利润。",
      qualify: "我先看你是否适合做这个诊断：最近 30–90 天项目数、每个项目收入、交付小时、修改售后时间，以及你最想涨价、砍项目还是重设边界？",
      close: "你现在不是缺客户，而是缺一张利润结构地图。我会找出最该保留、涨价、降级或砍掉的部分。价格 1980 元，包含 30 天后复盘。",
      reverse: "如果你按建议调整一个月后没有看到改善，我们做一次免费复盘，并重新出具一版调整建议。",
      boundary: "效果取决于你的执行、客户反应和市场环境。我不承诺固定收入增长。",
    },
  },
];

const fieldDefinitions = {
  income: ["最近 30 天收入", "元", 100],
  fixedCost: ["固定成本", "元", 100],
  variableCost: ["变动成本", "元", 100],
  balance: ["当前可用余额", "元", 100],
  futureIncome: ["未来 8 周确定收入", "元", 100],
  futureExpense: ["未来 8 周确定支出", "元", 100],
  personalMinimum: ["老板最低生活费", "元", 100],
  taxReserve: ["税费/合规预留", "元", 100],
  hiddenCost: ["隐藏成本估算", "元", 100],
  personalExpense: ["混入的个人支出", "元", 100],
  deliveryHours: ["老板交付小时", "小时", 1],
  projectCount: ["客户/项目数量", "个", 1],
  revisionHours: ["修改与售后小时", "小时", 1],
};

const cycle = [
  { title: "Day 1", name: "建池触达", tasks: ["新增 50 个有效触达对象", "发送第一轮私信", "给回复者发送自查清单"] },
  { title: "Day 2", name: "深聊报价", tasks: ["跟进已读未回和领取清单者", "筛选高匹配对象", "完成至少 2 次明确报价"] },
  { title: "Day 3", name: "成交复盘", tasks: ["优先跟进 A 类线索", "推进收款或明确不做", "复盘 150 触达与 3 次报价"] },
];

const defaultLeads = [
  { name: "样板客户 A", pain: "真实利润", status: "已深聊", next: "发真实利润还原器报价" },
  { name: "样板客户 B", pain: "资金留存", status: "已报价", next: "明晚跟进是否锁名额" },
  { name: "样板客户 C", pain: "利润结构", status: "已回复", next: "问项目收入和交付小时" },
];

const state = {
  selectedOffer: "withdraw",
  selectedTab: "opening",
  leads: [],
  offerProgress: {},
  values: {
    income: 30000, fixedCost: 3800, variableCost: 5200, balance: 22000,
    futureIncome: 36000, futureExpense: 18000, personalMinimum: 6000,
    taxReserve: 3000, hiddenCost: 1800, personalExpense: 1200,
    deliveryHours: 95, projectCount: 8, revisionHours: 12,
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const currency = (value) => Number.isFinite(value) ? `¥${Math.max(0, Math.round(value)).toLocaleString("zh-CN")}` : "--";
const percent = (value) => Number.isFinite(value) ? `${Math.round(value * 100)}%` : "--";

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("profit-workbench-state"));
    if (saved) {
      Object.assign(state, saved);
      state.values = { ...state.values, ...(saved.values || {}) };
      state.offerProgress = saved.offerProgress || {};
      state.leads = saved.leads?.length ? saved.leads : defaultLeads;
    } else state.leads = defaultLeads;
  } catch { state.leads = defaultLeads; }
  if (!offers.some((offer) => offer.id === state.selectedOffer)) state.selectedOffer = "withdraw";
}

function saveState(message = "已自动保存") {
  localStorage.setItem("profit-workbench-state", JSON.stringify(state));
  if ($("#autosaveState")) $("#autosaveState").textContent = message;
}

function selectedOffer() { return offers.find((offer) => offer.id === state.selectedOffer) || offers[0]; }

function getValues() {
  const values = { ...state.values };
  Object.keys(fieldDefinitions).forEach((key) => {
    const input = $(`#${key}`);
    if (input) values[key] = Number(input.value || 0);
  });
  return values;
}

function calculate() {
  const v = { ...state.values, ...getValues() };
  const visibleCost = v.fixedCost + v.variableCost;
  const totalCost = visibleCost + v.hiddenCost + v.personalExpense;
  const realProfit = v.income - totalCost;
  const operatingProfit = v.income - visibleCost - v.hiddenCost;
  const reserve = Math.max(v.futureExpense + v.taxReserve, v.fixedCost * 2 + v.variableCost + v.taxReserve);
  const availableAfterEightWeeks = v.balance + v.futureIncome - v.futureExpense - v.taxReserve;
  const maxWithdraw = Math.max(0, availableAfterEightWeeks - reserve * 0.25);
  const suggestedWithdraw = Math.max(0, Math.min(realProfit * 0.45, maxWithdraw * 0.7));
  const conservativeWithdraw = Math.max(0, Math.min(v.personalMinimum, realProfit * 0.25, suggestedWithdraw));
  const totalHours = v.deliveryHours + v.revisionHours;
  const hourlyRate = totalHours > 0 ? operatingProfit / totalHours : 0;
  const margin = v.income > 0 ? realProfit / v.income : 0;
  const runway = v.futureExpense > 0 ? Math.max(0, availableAfterEightWeeks / (v.futureExpense / 8)) : 8;
  const cashScore = Math.round(Math.max(0, Math.min(100, 35 + margin * 40 + Math.min(runway / 4, 2) * 20 - (totalHours > 120 ? 10 : 0))));
  const mustRetain = Math.max(reserve, v.futureExpense + v.taxReserve);
  const deferFunds = Math.max(0, Math.min(v.variableCost * 0.5, v.balance + v.futureIncome - mustRetain));
  const extractableFunds = Math.max(0, v.balance + v.futureIncome - mustRetain - deferFunds);
  const averageProjectRevenue = v.projectCount > 0 ? v.income / v.projectCount : 0;
  const averageProjectProfit = v.projectCount > 0 ? operatingProfit / v.projectCount : 0;
  let recommendation = "合规提现额度测算";
  if (availableAfterEightWeeks < reserve) recommendation = "资金留存清单";
  if (margin < 0.25 && v.income > 0) recommendation = "真实利润还原器";
  if (hourlyRate > 0 && hourlyRate < 260 && totalHours > 40) recommendation = "利润结构诊断";
  return { ...v, visibleCost, totalCost, realProfit, operatingProfit, reserve, availableAfterEightWeeks, maxWithdraw, suggestedWithdraw, conservativeWithdraw, totalHours, hourlyRate, margin, runway, cashScore, mustRetain, deferFunds, extractableFunds, averageProjectRevenue, averageProjectProfit, recommendation };
}

function offerResults(offer, m) {
  if (offer.id === "withdraw") return {
    score: m.cashScore, scoreLabel: m.cashScore >= 78 ? "现金流健康" : m.cashScore >= 58 ? "需要留意现金边界" : "现金流压力偏高",
    hint: m.realProfit <= 0 ? "估算利润为负，建议暂停提现。" : "提现前仍需保留未来 8 周支出与安全垫。",
    rows: [["保守提现额", currency(m.conservativeWithdraw)], ["建议提现额", currency(m.suggestedWithdraw)], ["最高参考额", currency(m.maxWithdraw)], ["需留存资金", currency(m.reserve)]],
    note: m.balance <= 0 || m.futureExpense <= 0 ? "数据不完整：先补齐余额和未来支出，再确认提现区间。" : m.availableAfterEightWeeks < m.reserve ? "安全垫不足：暂停按最高额提现，先重算未来 8 周现金流。" : "可生成提现决策卡；大额支出、退款或回款延期后必须重算。",
  };
  if (offer.id === "retain") return {
    score: m.cashScore, scoreLabel: m.extractableFunds > 0 ? "资金可进入三类分类" : "暂无安全可提取资金",
    hint: "先留必须支出，再冻结可选支出，最后确认可提取金额。",
    rows: [["必须留存", currency(m.mustRetain)], ["暂缓使用", currency(m.deferFunds)], ["可提取参考", currency(m.extractableFunds)], ["现金覆盖周数", `${Math.round(m.runway * 10) / 10} 周`]],
    note: m.futureExpense <= 0 ? "未来支出未补齐：所有用途不明资金暂时列入「暂缓」。" : m.extractableFunds <= 0 ? "必须留存额已用完可用资金，本月可提取额建议归零。" : "可进入 45 分钟梳理会议；新增大额收支后重做分类。",
  };
  if (offer.id === "profit") {
    const score = Math.round(Math.max(0, Math.min(100, 50 + m.margin * 100)));
    return { score, scoreLabel: m.realProfit > 0 ? "真实利润已还原" : "真实利润为负", hint: "账面收入需同时扣除显性成本、隐藏成本和混入的个人支出。", rows: [["账面收入", currency(m.income)], ["显性成本", currency(m.visibleCost)], ["隐藏/个人支出", currency(m.hiddenCost + m.personalExpense)], ["估算真实利润", currency(m.realProfit)], ["真实利润率", percent(m.margin)]], note: m.hiddenCost <= 0 ? "隐藏成本尚未标记：先核对时间、修改、免费答疑和闲置订阅。" : m.realProfit <= 0 ? "真实利润为负：优先停掉最大漏损项，暂不做扩张建议。" : "可生成利润对比与 1–3 个本月调整优先项。" };
  }
  const score = Math.round(Math.max(0, Math.min(100, m.hourlyRate / 5)));
  return { score, scoreLabel: m.hourlyRate >= 500 ? "有效时薪健康" : m.hourlyRate >= 260 ? "有效时薪需优化" : "低时薪项目需优先处理", hint: "项目利润要扣除交付、沟通、修改和售后的全部时间。", rows: [["平均项目收入", currency(m.averageProjectRevenue)], ["平均项目利润", currency(m.averageProjectProfit)], ["老板有效时薪", `${currency(m.hourlyRate)}/小时`], ["项目利润率", percent(m.operatingProfit / Math.max(1, m.income))], ["修改/售后占时", percent(m.revisionHours / Math.max(1, m.totalHours))]], note: m.projectCount < 3 ? "项目样本过少：当前只做预诊断，不下结构性结论。" : m.hourlyRate < 260 ? "有效时薪偏低：优先检查报价、修改次数和交付边界。" : "可建立项目四象限排行，并选择一个主报价进行 30 天调整。" };
}

function renderOffers() {
  $("#offerGrid").innerHTML = offers.map((offer) => `
    <button class="offer-card ${offer.id === state.selectedOffer ? "active" : ""}" data-offer="${offer.id}" role="tab" aria-selected="${offer.id === state.selectedOffer}" aria-controls="offerWorkspace">
      <div class="offer-card-top"><span class="offer-number">0${offers.indexOf(offer) + 1}</span><span class="offer-price">¥${offer.price}</span></div>
      <h3>${offer.name}</h3><p>${offer.pain}</p>
      <div class="offer-tags">${offer.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <span class="offer-open">${offer.id === state.selectedOffer ? "当前工作区" : "打开独立工作区"}<b aria-hidden="true">→</b></span>
    </button>`).join("");
}

function renderOfferWorkspace() {
  const offer = selectedOffer();
  const progress = state.offerProgress[offer.id]?.started;
  $("#offerWorkspaceContent").innerHTML = `
    <div class="offer-hero">
      <div><p class="workspace-label">当前独立报价</p><h2>${offer.name}</h2><p class="offer-promise">${offer.promise}</p></div>
      <div class="offer-hero-price"><span>服务价格</span><strong>¥${offer.price}</strong><small>${offer.session}</small></div>
    </div>
    <div class="workspace-actions">
      <button class="primary-button" id="startOfferButton">${progress ? "继续测算" : "开始测算"}</button>
      <button class="ghost-button" id="copyCurrentOfferButton">复制当前报价</button>
      <button class="ghost-button" id="openCurrentScriptButton">进入当前话术</button>
      <button class="ghost-button" id="copyRequirementsButton">复制资料清单</button>
    </div>
    <div class="offer-context-grid">
      <article><span>适用客户</span><p>${offer.audience}</p></article>
      <article><span>核心问题</span><p>${offer.pain}</p></article>
      <article><span>交付结果</span><p>${offer.result}</p></article>
    </div>
    <div class="workspace-section-heading"><div><span>01</span><h3>解决路径</h3></div><p>每一步都有检查、判断、异常处理和明确输出。</p></div>
    <ol class="logic-steps">${offer.steps.map((step, index) => `<li><div class="step-index">${String(index + 1).padStart(2, "0")}</div><div class="step-body"><h4>${step[0]}</h4><dl><div><dt>检查内容</dt><dd>${step[1]}</dd></div><div><dt>判断标准</dt><dd>${step[2]}</dd></div><div class="exception"><dt>异常处理</dt><dd>${step[3]}</dd></div><div class="output"><dt>阶段输出</dt><dd>${step[4]}</dd></div></dl></div></li>`).join("")}</ol>
    <div class="workspace-section-heading"><div><span>02</span><h3>关键控制点</h3></div><p>到达以下条件时，按规则停办、重算、修正或升级。</p></div>
    <div class="control-grid">${offer.controlPoints.map((point) => `<article><span>${point[0]}</span><p>${point[1]}</p></article>`).join("")}</div>
    <div class="workspace-section-heading"><div><span>03</span><h3>交付边界</h3></div></div>
    <div class="delivery-grid">
      <article><h4>资料要求</h4><ul>${offer.requirements.map((item) => `<li>${item}</li>`).join("")}</ul></article>
      <article><h4>交付物</h4><ul>${offer.deliverables.map((item) => `<li>${item}</li>`).join("")}</ul></article>
      <article class="boundary-card"><h4>风险逆转</h4><p>${offer.risk}</p><h4>服务边界</h4><p>${offer.boundaries}</p></article>
    </div>`;
  bindWorkspaceActions();
}

function renderInputs() {
  const offer = selectedOffer();
  $("#calculatorTitle").textContent = `${offer.name}·数据输入`;
  $("#calculatorHint").textContent = `当前只显示 ${offer.name} 需要的 ${offer.fieldIds.length} 项数据。`;
  $("#calculatorForm").innerHTML = offer.fieldIds.map((key) => {
    const [label, unit, step] = fieldDefinitions[key];
    return `<label for="${key}">${label}<span class="input-wrap"><input type="number" min="0" step="${step}" id="${key}" value="${state.values[key] ?? 0}" placeholder="请输入" /><em>${unit}</em></span></label>`;
  }).join("");
}

function renderSummary() {
  const offer = selectedOffer();
  const metrics = calculate();
  const result = offerResults(offer, metrics);
  $("#offerSummary").innerHTML = `<div class="summary-item"><span>当前报价</span><strong>${offer.name} · ¥${offer.price}</strong></div><div class="summary-item"><span>核心承诺</span><strong>${offer.promise}</strong></div><div class="summary-item"><span>一对一环节</span><strong>${offer.session}</strong></div><div class="summary-item"><span>当前控制结论</span><strong>${result.note}</strong></div>`;
}

function renderResults() {
  const offer = selectedOffer();
  const result = offerResults(offer, calculate());
  $("#scoreRing").textContent = Number.isFinite(result.score) ? result.score : "--";
  $("#scoreRing").style.background = `radial-gradient(circle at center, var(--surface) 58%, transparent 60%), conic-gradient(var(--green) ${Math.max(0, Math.min(100, result.score)) * 3.6}deg, var(--green-soft) 0deg)`;
  $("#scoreLabel").textContent = result.scoreLabel;
  $("#scoreHint").textContent = result.hint;
  $("#metricList").innerHTML = result.rows.map(([label, value]) => `<div class="metric-row"><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#riskNote").textContent = result.note;
}

function renderScripts() {
  const offer = selectedOffer();
  $("#scriptText").textContent = offer.scripts[state.selectedTab];
  $$(".tab").forEach((tab) => { const active = tab.dataset.tab === state.selectedTab; tab.classList.toggle("active", active); tab.setAttribute("aria-selected", String(active)); });
}

function renderCycle() {
  const dayIndex = (new Date().getDate() - 1) % 3;
  $("#cycleToday").textContent = `今天：${cycle[dayIndex].title} · ${cycle[dayIndex].name}`;
  $("#cycleGrid").innerHTML = cycle.map((day, index) => `<article class="cycle-card ${index === dayIndex ? "active" : ""}"><span>${day.title}</span><h3>${day.name}</h3><ul>${day.tasks.map((task) => `<li>${task}</li>`).join("")}</ul></article>`).join("");
}

function painToOffer(pain) {
  return ({ "提现额度": "合规提现额度测算", "资金留存": "资金留存清单", "真实利润": "真实利润还原器", "利润结构": "利润结构诊断" })[pain] || "合规提现额度测算";
}

function renderLeads() {
  $("#leadTable").innerHTML = state.leads.map((lead) => `<tr><td><strong>${lead.name}</strong></td><td>${lead.pain}</td><td><span class="status ${["已报价", "已付款"].includes(lead.status) ? "hot" : ""}">${lead.status}</span></td><td>${painToOffer(lead.pain)}</td><td>${lead.next}</td></tr>`).join("");
}

function buildCurrentOfferText() {
  const offer = selectedOffer();
  return [`报价：${offer.name}`, `定价：¥${offer.price}`, `适用客户：${offer.audience}`, `核心承诺：${offer.promise}`, `交付物：${offer.deliverables.join("；")}`, `风险逆转：${offer.risk}`, `服务边界：${offer.boundaries}`].join("\n");
}

function buildRequirementsText() {
  const offer = selectedOffer();
  return [`${offer.name}·资料清单`, ...offer.requirements.map((item, index) => `${index + 1}. ${item}`)].join("\n");
}

function buildDiagnosticSummary() {
  const offer = selectedOffer();
  const result = offerResults(offer, calculate());
  return [`报价入口：${offer.name}（¥${offer.price}）`, ...result.rows.map(([label, value]) => `${label}：${value}`), `关键控制结论：${result.note}`, `服务边界：${offer.boundaries}`].join("\n");
}

function copyText(text, message) {
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => fallbackCopy(text, message));
  else fallbackCopy(text, message);
}

function fallbackCopy(text, message) {
  const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select();
  try { document.execCommand("copy"); showToast(message); } catch { showToast("复制失败，请手动选择文本"); }
  area.remove();
}

function showToast(message) {
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function scrollToSection(selector) { $(selector)?.scrollIntoView({ behavior: "smooth", block: "start" }); }

function bindWorkspaceActions() {
  $("#startOfferButton").addEventListener("click", () => { state.offerProgress[state.selectedOffer] = { ...(state.offerProgress[state.selectedOffer] || {}), started: true }; saveState(); renderOfferWorkspace(); scrollToSection("#calculator"); });
  $("#copyCurrentOfferButton").addEventListener("click", () => copyText(buildCurrentOfferText(), "当前报价已复制"));
  $("#copyRequirementsButton").addEventListener("click", () => copyText(buildRequirementsText(), "资料清单已复制"));
  $("#openCurrentScriptButton").addEventListener("click", () => { state.selectedTab = "opening"; renderScripts(); saveState(); scrollToSection("#scripts"); });
}

function renderSelectedOffer() {
  renderOffers(); renderOfferWorkspace(); renderInputs(); renderResults(); renderSummary(); renderScripts();
}

function renderAll() { renderSelectedOffer(); renderCycle(); renderLeads(); }

function bindEvents() {
  $("#offerGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-offer]"); if (!card || card.dataset.offer === state.selectedOffer) return;
    state.selectedOffer = card.dataset.offer; renderSelectedOffer(); saveState(); $("#offerWorkspace").focus({ preventScroll: true });
  });
  $("#calculatorForm").addEventListener("input", () => { Object.assign(state.values, getValues()); $("#autosaveState").textContent = "正在保存"; renderResults(); renderSummary(); saveState(); });
  $$(".tab").forEach((tab) => tab.addEventListener("click", () => { state.selectedTab = tab.dataset.tab; renderScripts(); saveState(); }));
  $$(".nav-item").forEach((item) => item.addEventListener("click", () => { $$(".nav-item").forEach((nav) => nav.classList.remove("active")); item.classList.add("active"); scrollToSection(`#${item.dataset.section}`); }));
  $("#generateButton").addEventListener("click", () => copyText(buildDiagnosticSummary(), "诊断摘要已复制"));
  $("#copySummaryButton").addEventListener("click", () => copyText(buildDiagnosticSummary(), "测算摘要已复制"));
  $("#copyOfferButton").addEventListener("click", () => copyText(buildCurrentOfferText(), "当前报价已复制"));
  $("#copyScriptButton").addEventListener("click", () => copyText($("#scriptText").textContent, "话术已复制"));
  $("#useScriptButton").addEventListener("click", () => showToast("已标记为本轮使用话术"));
  $("#editClientButton").addEventListener("click", () => scrollToSection("#leads"));
  $("#periodSelect").addEventListener("change", () => showToast(`数据周期已切换为最近 ${$("#periodSelect").value} 天`));
  $("#resetButton").addEventListener("click", () => { localStorage.removeItem("profit-workbench-state"); location.reload(); });
  $("#addLeadButton").addEventListener("click", () => {
    const name = $("#leadName").value.trim(); if (!name) return showToast("先填写昵称/账号");
    state.leads.unshift({ name, pain: $("#leadPain").value, status: $("#leadStatus").value, next: $("#leadNext").value.trim() || "待设置" });
    $("#leadName").value = ""; $("#leadNext").value = ""; renderLeads(); saveState(); showToast("线索已新增");
  });
}

loadState();
renderAll();
bindEvents();
