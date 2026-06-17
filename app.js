const offers = [
  {
    id: "withdraw",
    name: "合规提现额度测算",
    price: 1280,
    pain: "不知道这个月到底能安全拿多少钱",
    result: "提现参考区间 + 提现节奏建议 + 提现决策卡",
    session: "30 分钟一对一解读电话",
    stack: ["现金流健康度评分", "提现参考区间", "提现节奏建议", "提现决策卡", "30 分钟一对一解读电话"],
    risk: "测算结果与真实数据明显偏差，免费重新测算并补一次解读电话。",
    tags: ["提现", "现金流", "一对一"],
    short:
      "我们用 30 分钟，帮一人公司老板把「这个月到底能安全拿多少钱」算清楚，不用自己啃税法、不用瞎猜。",
    scripts: {
      opening:
        "我发现很多一人公司不是没收入，而是不知道这个月到底能安全拿走多少钱。账上有钱不等于都能拿，有些钱其实要留给税费、交付、供应商和未来几周周转。\n\n我现在做一个「合规提现额度测算」，用你的真实收支帮你算一个提现参考区间：建议拿多少、最多别超过多少、公司至少留多少。",
      qualify:
        "我先判断你适不适合做这个测算，问你 5 个数字就够：\n\n1. 最近 30 天总收入大概多少？\n2. 现在账上可用现金多少？\n3. 最近 30 天固定和变动成本大概多少？\n4. 未来 8 周确定要支出哪些钱？\n5. 你最近一个月实际从公司拿走了多少？",
      close:
        "你现在卡住的不是不会用表，而是不确定「这笔钱到底能不能拿」。我会用你的真实收入、成本、当前余额和未来 8 周收支，算出本月提现参考区间，并用 30 分钟电话帮你解释。\n\n价格是 1280 元。这个不是纯自助计算器，纯工具只给一个结果；我这里会帮你判断这个结果怎么用，以及哪些情况发生后必须重新测算。",
      reverse:
        "如果测算结果和你提供的真实数据存在明显偏差，我免费重新测算，并补一次解读电话。",
      boundary:
        "我会基于你提供的数据做经营现金流和提现参考测算，但不会替代税务师、律师或会计师给正式意见。具体税务处理和法律合规问题，你需要再问持证专业人士。"
    }
  },
  {
    id: "retain",
    name: "资金留存清单",
    price: 1480,
    pain: "账上有钱但不知道哪些钱不能动",
    result: "能拿 / 暂缓 / 必须留 三类资金清单",
    session: "45 分钟资金结构梳理会议",
    stack: ["资金分类清单", "留存原因说明", "45 分钟资金结构梳理会议", "一个月内一次免费修正"],
    risk: "一个月内发现明显分类逻辑错误，免费重新梳理。",
    tags: ["留存", "资金分类", "修正"],
    short:
      "我们用一次 45 分钟的资金梳理，帮一人公司老板把账上的钱分成「能拿、暂缓、必须留」三类。",
    scripts: {
      opening:
        "很多一人公司看到账上有钱，就以为这笔钱都能动。但其实有些钱要留给未来几周的成本、税费、供应商和交付。\n\n我做的「资金留存清单」就是帮你把账上的钱分成三类：能拿、暂缓、必须留。这样你不会因为动了不该动的钱，后面突然现金流紧。",
      qualify:
        "我先看你适不适合做这个，问你 6 个问题：\n\n1. 当前账上有多少可用现金？\n2. 未来 8 周确定会收到哪些钱？\n3. 未来 8 周确定要支出哪些钱？\n4. 每月固定成本大概多少？\n5. 有无供应商、外包、平台费或交付成本要付？\n6. 你这个月想从公司拿走多少钱？",
      close:
        "你现在的问题不是有没有钱，而是不知道这笔钱分别承担什么任务。我会帮你把资金分成「能拿、暂缓、必须留」三类，并用一次 45 分钟会议讲清楚每一类为什么这样放。\n\n价格是 1480 元。它贵在不是一张自助表，而是一次资金结构梳理：我会帮你判断、解释，并在一个月内保留一次免费修正。",
      reverse:
        "清单交付后一个月内，如果发现明显分类逻辑错误，我免费重新梳理，并加送一次复盘会议。",
      boundary:
        "这个清单基于经营现金流原则和你提供的数据做资金分类，不是正式税务、法律或投资建议。具体税务和合同风险要找对应专业人士确认。"
    }
  },
  {
    id: "profit",
    name: "真实利润还原器",
    price: 1480,
    pain: "不知道账面数字和真实利润差在哪里",
    result: "利润拆解 + 隐藏成本扫描 + 月度追踪模板",
    session: "结果讲解电话",
    stack: ["利润拆解模板", "隐藏成本扫描", "账面利润与实际利润对比图", "月度利润追踪模板", "结果讲解电话"],
    risk: "拆解结果与原始数据明显不符，免费重做并补一次讲解电话。",
    tags: ["利润", "隐藏成本", "讲解"],
    short:
      "我们用 15 分钟拆解加一次讲解电话，帮一人公司老板把账面数字和真实能装进口袋的利润分开。",
    scripts: {
      opening:
        "很多一人公司不是没收入，而是被「账上有钱」骗了。收入进来以后，工具、外包、平台费、交付时间、退款和个人支出一混，最后根本不知道真实利润。\n\n我做的「真实利润还原器」就是把账面数字和真实能装进口袋的钱拆开。",
      qualify:
        "我先看你适不适合做这个拆解：\n\n1. 最近 30 天总收入是多少？\n2. 主要收入来自哪些产品或服务？\n3. 最近 30 天固定成本大概多少？\n4. 最近 30 天变动成本大概多少？\n5. 有没有外包、工具、平台费、退款或个人支出混在里面？\n6. 你现在以为自己利润大概是多少？",
      close:
        "你现在不是缺一张表，而是缺一个人帮你把数字拆开看。我会用 15 分钟做初步拆解，再通过一次讲解电话帮你看懂：账面利润是多少，真实利润是多少，哪些成本在偷走利润。\n\n价格是 1480 元。纯工具只能算加减法，但我会帮你解释数字背后的经营问题。",
      reverse:
        "如果拆解结果和你提供的原始数据明显不符，我免费重做，并补一次讲解电话。",
      boundary:
        "这个服务是经营利润还原，不是会计审计，也不是税务申报。数据越真实，结果越有参考价值。"
    }
  },
  {
    id: "structure",
    name: "利润结构诊断",
    price: 1980,
    pain: "客户不少但报价和交付结构正在偷走利润",
    result: "项目利润排行 + 报价优化 + 30 天后复盘",
    session: "一次诊断 + 30 天后效果复盘",
    stack: ["客户/项目利润排行参考", "报价结构优化建议", "交付成本拆解", "可执行调整清单", "30 天后效果复盘会议"],
    risk: "按建议调整一个月后未见改善，免费复盘并重新出具一版调整建议。",
    tags: ["报价", "项目利润", "复盘"],
    short:
      "我们用一次诊断加 30 天后复盘，帮一人公司老板找出报价和交付结构里正在偷走利润的环节。",
    scripts: {
      opening:
        "如果你客户不少但老板拿不到钱，问题通常不是你不努力，而是利润结构有问题。有些客户看起来贡献收入，其实把你的时间、交付和售后成本吃光了。\n\n我做的「利润结构诊断」就是帮你找出哪些客户/项目赚钱，哪些客户/项目正在偷走利润。",
      qualify:
        "我先看你是否适合做这个诊断：\n\n1. 最近 30-90 天主要客户或项目有哪些？\n2. 每个项目大概收了多少钱？\n3. 每个项目大概花了你多少小时？\n4. 哪类客户最爱改、最爱问、最占时间？\n5. 最近有没有客户嫌贵或要求加服务？\n6. 你现在最想涨价、砍项目，还是重设交付边界？",
      close:
        "你现在不是缺客户，而是缺一张利润结构地图。我会把你的客户/项目按收入、成本、交付小时和老板有效时薪排出来，找出最该保留、涨价、降级或砍掉的部分。\n\n价格是 1980 元，包含一次诊断和 30 天后复盘。如果你按建议调整一个月后没有效果，我免费再出一版方案。",
      reverse:
        "如果你按建议调整一个月后没有看到改善，我们做一次免费复盘，并重新出具一版调整建议。",
      boundary:
        "效果取决于你的执行、客户反应和市场环境。我不承诺固定收入增长，但会负责把利润结构问题拆清楚，并给出可执行调整建议。"
    }
  }
];

const cycle = [
  {
    title: "Day 1",
    name: "建池触达",
    tasks: ["新增 50 个有效触达对象", "发送第一轮私信", "给回复者发送自查清单"]
  },
  {
    title: "Day 2",
    name: "深聊报价",
    tasks: ["跟进已读未回和领取清单者", "筛选高匹配对象", "完成至少 2 次明确报价"]
  },
  {
    title: "Day 3",
    name: "成交复盘",
    tasks: ["优先跟进 A 类线索", "推进收款或明确不做", "复盘 150 触达与 3 次报价"]
  }
];

const defaultLeads = [
  {
    name: "样板客户 A",
    pain: "真实利润",
    status: "已深聊",
    next: "发真实利润还原器报价"
  },
  {
    name: "样板客户 B",
    pain: "资金留存",
    status: "已报价",
    next: "明晚跟进是否锁名额"
  },
  {
    name: "样板客户 C",
    pain: "利润结构",
    status: "已回复",
    next: "问项目收入和交付小时"
  }
];

const state = {
  selectedOffer: "withdraw",
  selectedTab: "opening",
  leads: [],
  values: {
    income: 30000,
    fixedCost: 3800,
    variableCost: 5200,
    balance: 22000,
    futureIncome: 36000,
    futureExpense: 18000,
    deliveryHours: 95,
    projectCount: 8
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const currency = (value) =>
  Number.isFinite(value) ? `¥${Math.max(0, Math.round(value)).toLocaleString("zh-CN")}` : "--";

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("profit-workbench-state"));
    if (saved) {
      Object.assign(state, saved);
      state.values = { ...state.values, ...(saved.values || {}) };
      state.leads = saved.leads?.length ? saved.leads : defaultLeads;
    } else {
      state.leads = defaultLeads;
    }
  } catch {
    state.leads = defaultLeads;
  }
}

function saveState() {
  localStorage.setItem("profit-workbench-state", JSON.stringify(state));
  $("#autosaveState").textContent = "已自动保存";
}

function selectedOffer() {
  return offers.find((offer) => offer.id === state.selectedOffer) || offers[0];
}

function getValues() {
  const values = {};
  Object.keys(state.values).forEach((key) => {
    values[key] = Number($(`#${key}`)?.value || 0);
  });
  return values;
}

function calculate() {
  const v = getValues();
  const visibleCost = v.fixedCost + v.variableCost;
  const realProfit = v.income - visibleCost;
  const reserve = Math.max(v.futureExpense, v.fixedCost * 2 + v.variableCost);
  const availableAfterEightWeeks = v.balance + v.futureIncome - v.futureExpense;
  const maxWithdraw = Math.max(0, availableAfterEightWeeks - reserve * 0.25);
  const suggestedWithdraw = Math.max(0, Math.min(realProfit * 0.45, maxWithdraw * 0.7));
  const conservativeWithdraw = Math.max(0, Math.min(realProfit * 0.25, suggestedWithdraw));
  const hourlyRate = v.deliveryHours > 0 ? realProfit / v.deliveryHours : 0;
  const margin = v.income > 0 ? realProfit / v.income : 0;
  const runway = v.futureExpense > 0 ? availableAfterEightWeeks / v.futureExpense : 1;
  const cashScore = Math.round(
    Math.max(0, Math.min(100, 35 + margin * 40 + Math.min(runway, 2) * 20 - (v.deliveryHours > 120 ? 10 : 0)))
  );

  let recommendation = "合规提现额度测算";
  if (availableAfterEightWeeks < reserve) recommendation = "资金留存清单";
  if (margin < 0.25 && v.income > 0) recommendation = "真实利润还原器";
  if (hourlyRate > 0 && hourlyRate < 260 && v.deliveryHours > 40) recommendation = "利润结构诊断";

  return {
    ...v,
    visibleCost,
    realProfit,
    reserve,
    conservativeWithdraw,
    suggestedWithdraw,
    maxWithdraw,
    hourlyRate,
    margin,
    availableAfterEightWeeks,
    cashScore,
    recommendation
  };
}

function renderOffers() {
  const grid = $("#offerGrid");
  grid.innerHTML = offers
    .map(
      (offer) => `
        <button class="offer-card ${offer.id === state.selectedOffer ? "active" : ""}" data-offer="${offer.id}">
          <div>
            <h3>${offer.name}</h3>
            <div class="offer-price">¥${offer.price}</div>
          </div>
          <p>${offer.pain}</p>
          <div class="offer-tags">
            ${offer.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </button>
      `
    )
    .join("");
}

function renderAllOfferList() {
  const list = $("#allOfferList");
  if (!list) return;
  list.innerHTML = offers
    .map(
      (offer) => `
        <article class="all-offer-item">
          <header>
            <h3>${offer.name}</h3>
            <strong>¥${offer.price}</strong>
          </header>
          <p>${offer.pain}</p>
          <ul>
            ${offer.stack.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <p><strong>风险逆转：</strong>${offer.risk}</p>
        </article>
      `
    )
    .join("");
}

function renderInputs() {
  Object.entries(state.values).forEach(([key, value]) => {
    const input = $(`#${key}`);
    if (input) input.value = value;
  });
}

function renderSummary() {
  const offer = selectedOffer();
  const metrics = calculate();
  $("#offerSummary").innerHTML = `
    <div class="summary-item"><span>当前报价</span><strong>${offer.name} · ¥${offer.price}</strong></div>
    <div class="summary-item"><span>核心结果</span><strong>${offer.result}</strong></div>
    <div class="summary-item"><span>一对一环节</span><strong>${offer.session}</strong></div>
    <div class="summary-item"><span>短版报价</span><strong>${offer.short}</strong></div>
    <div class="summary-item"><span>当前测算重点</span><strong>${metrics.recommendation}</strong></div>
  `;
}

function renderResults() {
  const metrics = calculate();
  const score = Number.isFinite(metrics.cashScore) ? metrics.cashScore : 0;
  $("#scoreRing").textContent = score || "--";
  $("#scoreRing").style.background = `radial-gradient(circle at center, var(--surface) 58%, transparent 60%), conic-gradient(var(--green) ${score * 3.6}deg, var(--green-soft) 0deg)`;
  $("#scoreLabel").textContent =
    score >= 78 ? "现金流健康" : score >= 58 ? "需要留意现金边界" : "现金流压力偏高";
  $("#scoreHint").textContent =
    score >= 78 ? "可以讨论提现节奏，但仍需保留未来支出。" : "建议先看资金留存和未来 8 周现金流。";
  $("#withdrawRange").textContent = `${currency(metrics.conservativeWithdraw)} - ${currency(metrics.suggestedWithdraw)}`;
  $("#retainFunds").textContent = currency(metrics.reserve);
  $("#realProfit").textContent = currency(metrics.realProfit);
  $("#hourlyRate").textContent = metrics.hourlyRate > 0 ? `${currency(metrics.hourlyRate)}/小时` : "--";
  $("#recommendedOffer").textContent = metrics.recommendation;

  const note =
    metrics.realProfit < 0
      ? "当前估算利润为负，优先做真实利润还原和成本清理。"
      : metrics.availableAfterEightWeeks < metrics.reserve
        ? "未来 8 周现金安全垫不足，先不要按最高额度提款。"
        : "数据结构可进入报价，建议先用客户最明显的痛点切入口。";
  $("#riskNote").textContent = note;
}

function renderScripts() {
  const offer = selectedOffer();
  $("#scriptText").textContent = offer.scripts[state.selectedTab];
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === state.selectedTab));
}

function renderCycle() {
  const start = new Date("2026-06-17T00:00:00");
  const today = new Date();
  const diffDays = Math.floor((today - start) / 86400000);
  const activeIndex = ((diffDays % 3) + 3) % 3;
  $("#cycleToday").textContent = `今天：${cycle[activeIndex].title} ${cycle[activeIndex].name}`;
  $("#cycleGrid").innerHTML = cycle
    .map(
      (item, index) => `
        <div class="cycle-card ${index === activeIndex ? "active" : ""}">
          <h3>${item.title} · ${item.name}</h3>
          <ul>${item.tasks.map((task) => `<li>${task}</li>`).join("")}</ul>
        </div>
      `
    )
    .join("");
}

function painToOffer(pain) {
  const map = {
    提现额度: "合规提现额度测算",
    资金留存: "资金留存清单",
    真实利润: "真实利润还原器",
    利润结构: "利润结构诊断"
  };
  return map[pain] || "合规提现额度测算";
}

function renderLeads() {
  $("#leadTable").innerHTML = state.leads
    .map(
      (lead) => `
        <tr>
          <td><strong>${lead.name}</strong></td>
          <td>${lead.pain}</td>
          <td><span class="status ${["已报价", "已付款"].includes(lead.status) ? "hot" : ""}">${lead.status}</span></td>
          <td>${painToOffer(lead.pain)}</td>
          <td>${lead.next}</td>
        </tr>
      `
    )
    .join("");
}

function buildDiagnosticSummary() {
  const offer = selectedOffer();
  const metrics = calculate();
  return [
    `报价入口：${offer.name}（¥${offer.price}）`,
    `现金流健康度：${metrics.cashScore}/100`,
    `提现参考区间：${currency(metrics.conservativeWithdraw)} - ${currency(metrics.suggestedWithdraw)}`,
    `需留存资金：${currency(metrics.reserve)}`,
    `估算真实利润：${currency(metrics.realProfit)}`,
    `老板有效时薪：${metrics.hourlyRate > 0 ? `${currency(metrics.hourlyRate)}/小时` : "--"}`,
    `推荐下一步：${metrics.recommendation}`,
    `边界说明：本结果用于经营现金流和利润结构参考，不构成正式税务、法律、审计、投资或理财意见。`
  ].join("\n");
}

function buildAllOffersText() {
  return offers
    .map(
      (offer, index) => [
        `报价${index + 1}：${offer.name}`,
        `定价：¥${offer.price}`,
        `解决问题：${offer.pain}`,
        `价值堆叠：${offer.stack.join("；")}`,
        `一对一/跟进：${offer.session}`,
        `风险逆转：${offer.risk}`,
        `短版文案：${offer.short}`
      ].join("\n")
    )
    .join("\n\n");
}

function copyText(text, message) {
  navigator.clipboard
    ?.writeText(text)
    .then(() => showToast(message))
    .catch(() => showToast("复制失败，请手动选择文本"));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function renderAll() {
  renderOffers();
  renderAllOfferList();
  renderInputs();
  renderResults();
  renderSummary();
  renderScripts();
  renderCycle();
  renderLeads();
}

function bindEvents() {
  $("#offerGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-offer]");
    if (!card) return;
    state.selectedOffer = card.dataset.offer;
    renderOffers();
    renderSummary();
    renderScripts();
    saveState();
  });

  $("#calculatorForm").addEventListener("input", () => {
    Object.assign(state.values, getValues());
    $("#autosaveState").textContent = "正在保存";
    renderResults();
    renderSummary();
    saveState();
  });

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.selectedTab = tab.dataset.tab;
      renderScripts();
      saveState();
    });
  });

  $$(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      $$(".nav-item").forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");
      $(`#${item.dataset.section}`)?.scrollIntoView({ block: "start" });
    });
  });

  $("#generateButton").addEventListener("click", () => {
    copyText(buildDiagnosticSummary(), "诊断摘要已复制");
  });
  $("#copyAllOffersButton").addEventListener("click", () => copyText(buildAllOffersText(), "全部四个报价已复制"));
  $("#copySummaryButton").addEventListener("click", () => copyText(buildDiagnosticSummary(), "测算摘要已复制"));
  $("#copyOfferButton").addEventListener("click", () => copyText(selectedOffer().short, "短版报价已复制"));
  $("#copyScriptButton").addEventListener("click", () => copyText($("#scriptText").textContent, "话术已复制"));
  $("#useScriptButton").addEventListener("click", () => showToast("已标记为本轮使用话术"));
  $("#editClientButton").addEventListener("click", () => $("#leads").scrollIntoView({ block: "start" }));
  $("#resetButton").addEventListener("click", () => {
    localStorage.removeItem("profit-workbench-state");
    location.reload();
  });

  $("#addLeadButton").addEventListener("click", () => {
    const name = $("#leadName").value.trim();
    if (!name) {
      showToast("先填写昵称/账号");
      return;
    }
    state.leads.unshift({
      name,
      pain: $("#leadPain").value,
      status: $("#leadStatus").value,
      next: $("#leadNext").value.trim() || "待跟进"
    });
    $("#leadName").value = "";
    $("#leadNext").value = "";
    renderLeads();
    saveState();
    showToast("线索已新增");
  });
}

loadState();
renderAll();
bindEvents();
