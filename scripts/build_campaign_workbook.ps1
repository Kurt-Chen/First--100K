$ErrorActionPreference = "Stop"

$OutputDir = Join-Path (Get-Location) "outputs"
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
$WorkbookPath = Join-Path $OutputDir "one_person_company_profit_sprint.xlsx"
$BuildDir = Join-Path $OutputDir ("xlsx_package_" + [guid]::NewGuid().ToString("N"))

function XmlEscape([object]$Value) {
  if ($null -eq $Value) { return "" }
  return [System.Security.SecurityElement]::Escape([string]$Value)
}

function ColName([int]$Number) {
  $name = ""
  while ($Number -gt 0) {
    $Number--
    $name = [char](65 + ($Number % 26)) + $name
    $Number = [math]::Floor($Number / 26)
  }
  return $name
}

function CellXml([int]$Row, [int]$Col, [object]$Value, [string]$Type = "s", [int]$Style = 0) {
  $ref = "$(ColName $Col)$Row"
  $styleAttr = if ($Style -gt 0) { " s=`"$Style`"" } else { "" }
  if ($null -eq $Value -or [string]$Value -eq "") {
    return "<c r=`"$ref`"$styleAttr/>"
  }
  if ($Type -eq "f") {
    $formula = [string]$Value
    if ($formula.StartsWith("=")) { $formula = $formula.Substring(1) }
    return "<c r=`"$ref`"$styleAttr><f>$(XmlEscape $formula)</f></c>"
  }
  if ($Type -eq "n") {
    return "<c r=`"$ref`"$styleAttr><v>$Value</v></c>"
  }
  if ($Type -eq "d") {
    $date = [datetime]$Value
    $serial = ($date.ToUniversalTime() - [datetime]"1899-12-30").TotalDays
    return "<c r=`"$ref`"$styleAttr><v>$([math]::Round($serial, 6))</v></c>"
  }
  return "<c r=`"$ref`" t=`"inlineStr`"$styleAttr><is><t>$(XmlEscape $Value)</t></is></c>"
}

function SheetXml([array]$Rows, [array]$ColWidths, [array]$Validations = @()) {
  $sb = [System.Text.StringBuilder]::new()
  [void]$sb.AppendLine('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>')
  [void]$sb.AppendLine('<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">')
  [void]$sb.AppendLine('<sheetViews><sheetView showGridLines="0" workbookViewId="0"/></sheetViews>')
  if ($ColWidths.Count -gt 0) {
    [void]$sb.AppendLine('<cols>')
    for ($i = 0; $i -lt $ColWidths.Count; $i++) {
      $w = $ColWidths[$i]
      [void]$sb.AppendLine("<col min=`"$($i+1)`" max=`"$($i+1)`" width=`"$w`" customWidth=`"1`"/>")
    }
    [void]$sb.AppendLine('</cols>')
  }
  [void]$sb.AppendLine('<sheetData>')
  for ($r = 0; $r -lt $Rows.Count; $r++) {
    $rowNum = $r + 1
    [void]$sb.Append("<row r=`"$rowNum`">")
    $row = $Rows[$r]
    for ($c = 0; $c -lt $row.Count; $c++) {
      $cell = $row[$c]
      if ($cell -is [hashtable]) {
        [void]$sb.Append((CellXml $rowNum ($c + 1) $cell.Value $cell.Type $cell.Style))
      } else {
        [void]$sb.Append((CellXml $rowNum ($c + 1) $cell "s" 0))
      }
    }
    [void]$sb.AppendLine('</row>')
  }
  [void]$sb.AppendLine('</sheetData>')
  if ($Validations.Count -gt 0) {
    [void]$sb.AppendLine("<dataValidations count=`"$($Validations.Count)`">")
    foreach ($v in $Validations) {
      $list = '&quot;' + (($v.Values -join ',') -replace '"','') + '&quot;'
      [void]$sb.AppendLine("<dataValidation type=`"list`" allowBlank=`"1`" showErrorMessage=`"1`" sqref=`"$($v.Range)`"><formula1>$list</formula1></dataValidation>")
    }
    [void]$sb.AppendLine('</dataValidations>')
  }
  [void]$sb.AppendLine('</worksheet>')
  return $sb.ToString()
}

function Cell([object]$Value, [string]$Type = "s", [int]$Style = 0) {
  return @{ Value = $Value; Type = $Type; Style = $Style }
}

New-Item -ItemType Directory -Force -Path $BuildDir | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $BuildDir "_rels") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $BuildDir "xl") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $BuildDir "xl\_rels") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $BuildDir "xl\worksheets") | Out-Null

$contentTypes = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet4.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet5.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet6.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet7.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet8.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>
'@
Set-Content -LiteralPath (Join-Path $BuildDir "[Content_Types].xml") -Value $contentTypes -Encoding UTF8

$rootRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>
'@
Set-Content -LiteralPath (Join-Path $BuildDir "_rels\.rels") -Value $rootRels -Encoding UTF8

$workbook = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Dashboard" sheetId="1" r:id="rId1"/>
    <sheet name="CRM" sheetId="2" r:id="rId2"/>
    <sheet name="Daily_KPI" sheetId="3" r:id="rId3"/>
    <sheet name="Profit_Diagnostic" sheetId="4" r:id="rId4"/>
    <sheet name="Pricing_Calculator" sheetId="5" r:id="rId5"/>
    <sheet name="Cashflow_8W" sheetId="6" r:id="rId6"/>
    <sheet name="Delivery_Checklist" sheetId="7" r:id="rId7"/>
    <sheet name="Script_Library" sheetId="8" r:id="rId8"/>
  </sheets>
</workbook>
'@
Set-Content -LiteralPath (Join-Path $BuildDir "xl\workbook.xml") -Value $workbook -Encoding UTF8

$workbookRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet3.xml"/>
  <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet4.xml"/>
  <Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet5.xml"/>
  <Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet6.xml"/>
  <Relationship Id="rId7" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet7.xml"/>
  <Relationship Id="rId8" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet8.xml"/>
  <Relationship Id="rId9" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>
'@
Set-Content -LiteralPath (Join-Path $BuildDir "xl\_rels\workbook.xml.rels") -Value $workbookRels -Encoding UTF8

$styles = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts count="4">
    <numFmt numFmtId="164" formatCode="yyyy-mm-dd"/>
    <numFmt numFmtId="165" formatCode="yyyy-mm-dd hh:mm"/>
    <numFmt numFmtId="166" formatCode="¥#,##0;[Red](¥#,##0);-"/>
    <numFmt numFmtId="167" formatCode="0.0%"/>
  </numFmts>
  <fonts count="5">
    <font><sz val="10"/><name val="Microsoft YaHei"/><color rgb="FF172033"/></font>
    <font><b/><sz val="16"/><name val="Microsoft YaHei"/><color rgb="FFFFFFFF"/></font>
    <font><b/><sz val="10"/><name val="Microsoft YaHei"/><color rgb="FFFFFFFF"/></font>
    <font><sz val="10"/><name val="Microsoft YaHei"/><color rgb="FF0000FF"/></font>
    <font><b/><sz val="10"/><name val="Microsoft YaHei"/><color rgb="FF172033"/></font>
  </fonts>
  <fills count="6">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF17324D"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF0F766E"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFF7CC"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFDFF3EE"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FFD8E0E8"/></left><right style="thin"><color rgb="FFD8E0E8"/></right><top style="thin"><color rgb="FFD8E0E8"/></top><bottom style="thin"><color rgb="FFD8E0E8"/></bottom><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="10">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="166" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>
    <xf numFmtId="167" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>
    <xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>
    <xf numFmtId="165" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="3" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="166" fontId="3" fillId="4" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="0" fillId="5" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment wrapText="1" vertical="top"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>
'@
Set-Content -LiteralPath (Join-Path $BuildDir "xl\styles.xml") -Value $styles -Encoding UTF8

$dashboardRows = @(
  @((Cell "一人公司利润体检冲刺 Dashboard - 目标：14 天收款 5000 元以上；默认 4 单 × 1299 元" "s" 1)),
  @(""),
  @((Cell "指标" "s" 2),(Cell "当前值" "s" 2),"",(Cell "漏斗指标" "s" 2),(Cell "当前值" "s" 2),"",(Cell "状态色" "s" 2),(Cell "含义" "s" 2)),
  @("收款目标",(Cell 5000 "n" 3),"","回复率",(Cell "=IF(B7=0,0,B8/B7)" "f" 4),"","OK","达标"),
  @("已收款",(Cell "=SUM(CRM!L4:L703)" "f" 3),"","清单领取率",(Cell "=IF(B8=0,0,B9/B8)" "f" 4),"","继续冲刺","未到终点"),
  @("距离目标",(Cell "=MAX(0,B4-B5)" "f" 3),"","深聊率",(Cell "=IF(B7=0,0,B10/B7)" "f" 4),"","改价/改人群","触达策略需调整"),
  @("有效触达",(Cell "=COUNTA(CRM!B4:B703)" "f" 0),"","付款转化率",(Cell "=IF(B7=0,0,B11/B7)" "f" 4),"","需要首个交付","缺少样板反馈"),
  @("回复数",(Cell '=COUNTIF(CRM!F4:F703,"<>未回")-COUNTIF(CRM!F4:F703,"无效")' "f" 0),"","平均客单价",(Cell "=IF(B11=0,0,B5/B11)" "f" 3),"","",""),
  @("领取清单",(Cell '=COUNTIF(CRM!G4:G703,"是")' "f" 0),"","Day 4 状态",(Cell '=IF(AND(SUM(Daily_KPI!E4:E7)>=200,SUM(Daily_KPI!F4:F7)>=15,OR(B11>=1,COUNTIF(CRM!F4:F703,"已报价")>=3)),"OK","改价/改人群")' "f" 0),"","注意","客户数据请手动录入 CRM"),
  @("深聊/报价/付款",(Cell '=COUNTIF(CRM!F4:F703,"已深聊")+COUNTIF(CRM!F4:F703,"已报价")+COUNTIF(CRM!F4:F703,"已付款")+COUNTIF(CRM!F4:F703,"已交付")' "f" 0),"","Day 7 状态",(Cell '=IF(COUNTIF(CRM!N4:N703,"已交付")>=1,"OK","需要首个交付")' "f" 0),"","",""),
  @("付款单数",(Cell '=COUNTIF(CRM!F4:F703,"已付款")+COUNTIF(CRM!F4:F703,"已交付")' "f" 0),"","最终状态",(Cell '=IF(B5>=5000,"OK","继续冲刺")' "f" 0),"","",""),
  @(""),
  @((Cell "执行提醒" "s" 2)),
  @((Cell "每天 50 个有效触达；有回复先发自查清单，再问 3 个诊断问题。" "s" 9)),
  @((Cell "Day 4 没有 1 个付款或 3 个明确问价，就把主服务临时降到 999 元。" "s" 9)),
  @((Cell "服务只做经营财务/报价诊断，不做税务、审计、投资建议。" "s" 9)),
  @((Cell "两周目标以实际收款为准，不以意向计算。" "s" 9))
)

$crmRows = @()
$crmRows += ,@((Cell "一人公司利润体检 CRM - 每天录入 50 个有效触达对象" "s" 1))
$crmRows += ,@("")
$crmRows += ,@("ID","触达日期","渠道","昵称/账号","业务类型","状态","是否发清单","核心痛点","下一步","跟进日期","报价类型","收款金额","收款日期","交付状态","备注" | ForEach-Object { Cell $_ "s" 2 })
$samples = @(
  @("","2026-06-17","小红书","样板客户A","咨询/陪跑","已付款","是","报价低，交付重","48小时交付","2026-06-18","1299利润体检",1299,"2026-06-17","诊断中","示例，可删除"),
  @("","2026-06-17","即刻","样板客户B","自由职业设计","已报价","是","低价项目太多","明晚跟进","2026-06-18","1299利润体检","","","未开始","示例，可删除"),
  @("","2026-06-17","微信社群","样板客户C","知识付费","已深聊","是","现金流紧","发资料清单","2026-06-17","","","","未开始","示例，可删除"),
  @("","2026-06-17","公众号","样板客户D","文案服务","已领清单","是","不敢涨价","问3个筛选问题","2026-06-18","","","","未开始","示例，可删除"),
  @("","2026-06-17","知识星球","样板客户E","代运营","未回","否","","24小时后换话术","2026-06-18","","","","未开始","示例，可删除")
)
for ($i=0; $i -lt 700; $i++) {
  $rowNum = 4 + $i
  if ($i -lt $samples.Count) { $s = $samples[$i] } else { $s = @("","","","","","","","","","","","","","","") }
  $touchDateCell = if ($s[1]) { Cell ([datetime]$s[1]) "d" 5 } else { Cell "" }
  $followDateCell = if ($s[9]) { Cell ([datetime]$s[9]) "d" 5 } else { Cell "" }
  $amountCell = if ($s[11] -ne "") { Cell $s[11] "n" 3 } else { Cell "" }
  $paidDateCell = if ($s[12]) { Cell ([datetime]$s[12]) "d" 5 } else { Cell "" }
  $crmRows += ,@(
    (Cell "=IF(B$rowNum<>`"`",ROW()-3,`"`")" "f" 0),
    $touchDateCell,
    (Cell $s[2]),
    (Cell $s[3]),
    (Cell $s[4]),
    (Cell $s[5]),
    (Cell $s[6]),
    (Cell $s[7]),
    (Cell $s[8]),
    $followDateCell,
    (Cell $s[10]),
    $amountCell,
    $paidDateCell,
    (Cell $s[13]),
    (Cell $s[14])
  )
}

$dailyRows = @()
$dailyRows += ,@((Cell "14 天每日 KPI - Day 4 未达标就改价和改人群" "s" 1))
$dailyRows += ,@("")
$dailyRows += ,@("Day","日期","阶段","触达目标","实际触达","回复数","深聊数","付款数","收款","今日话术优化","复盘备注" | ForEach-Object { Cell $_ "s" 2 })
$phases = @("样板+销售资产","第一轮触达","第一轮触达","第4天校准","成交+交付","成交+交付","第7天校准","案例放大","案例放大","案例放大","案例放大","冲刺跟进","冲刺跟进","最终收款")
for ($i=0; $i -lt 14; $i++) {
  $r = 4 + $i
  $d = [datetime]"2026-06-17"
  $d = $d.AddDays($i)
  $dailyRows += ,@(
    (Cell ($i+1) "n"), (Cell $d "d" 5), (Cell $phases[$i]), (Cell 50 "n"),
    (Cell "=COUNTIFS(CRM!`$B`$4:`$B`$703,B$r)" "f"),
    (Cell "=COUNTIFS(CRM!`$B`$4:`$B`$703,B$r,CRM!`$F`$4:`$F`$703,`"<>未回`",CRM!`$F`$4:`$F`$703,`"<>无效`")" "f"),
    (Cell "=COUNTIFS(CRM!`$B`$4:`$B`$703,B$r,CRM!`$F`$4:`$F`$703,`"已深聊`")+COUNTIFS(CRM!`$B`$4:`$B`$703,B$r,CRM!`$F`$4:`$F`$703,`"已报价`")+COUNTIFS(CRM!`$B`$4:`$B`$703,B$r,CRM!`$F`$4:`$F`$703,`"已付款`")+COUNTIFS(CRM!`$B`$4:`$B`$703,B$r,CRM!`$F`$4:`$F`$703,`"已交付`")" "f"),
    (Cell "=COUNTIFS(CRM!`$M`$4:`$M`$703,B$r)" "f"),
    (Cell "=SUMIFS(CRM!`$L`$4:`$L`$703,CRM!`$M`$4:`$M`$703,B$r)" "f" 3),
    (Cell ""), (Cell "")
  )
}

$diagnosticRows = @(
  @((Cell "利润体检模板 - 填写客户最近 30 天收入与成本，自动计算利润、利润率和本人时薪" "s" 1)),
  @(""),
  @((Cell "收入项" "s" 2),(Cell "单价" "s" 2),(Cell "数量" "s" 2),(Cell "收入" "s" 2),"",(Cell "成本项" "s" 2),(Cell "金额" "s" 2),(Cell "类型" "s" 2)),
  @("单次咨询",(Cell 599 "n" 8),(Cell 20 "n" 7),(Cell "=IF(OR(B4=`"`",C4=`"`"),`"`",B4*C4)" "f" 3),"","软件/工具",(Cell 1200 "n" 8),"固定"),
  @("月度陪跑",(Cell 3999 "n" 8),(Cell 3 "n" 7),(Cell "=IF(OR(B5=`"`",C5=`"`"),`"`",B5*C5)" "f" 3),"","社群/学习",(Cell 1000 "n" 8),"固定"),
  @("资料包",(Cell 99 "n" 8),(Cell 61 "n" 7),(Cell "=IF(OR(B6=`"`",C6=`"`"),`"`",B6*C6)" "f" 3),"","办公/设备",(Cell 1600 "n" 8),"固定"),
  @("",(Cell ""),(Cell ""),(Cell "=IF(OR(B7=`"`",C7=`"`"),`"`",B7*C7)" "f" 3),"","外包整理",(Cell 3000 "n" 8),"变动"),
  @("",(Cell ""),(Cell ""),(Cell "=IF(OR(B8=`"`",C8=`"`"),`"`",B8*C8)" "f" 3),"","平台手续费",(Cell 1200 "n" 8),"变动"),
  @("",(Cell ""),(Cell ""),(Cell "=IF(OR(B9=`"`",C9=`"`"),`"`",B9*C9)" "f" 3),"","材料/交付",(Cell 1000 "n" 8),"变动"),
  @("",(Cell ""),(Cell ""),(Cell "=IF(OR(B10=`"`",C10=`"`"),`"`",B10*C10)" "f" 3),"","",(Cell ""),""),
  @("",(Cell ""),(Cell ""),(Cell "=IF(OR(B11=`"`",C11=`"`"),`"`",B11*C11)" "f" 3),"","",(Cell ""),""),
  @("",(Cell ""),(Cell ""),(Cell "=IF(OR(B12=`"`",C12=`"`"),`"`",B12*C12)" "f" 3),"","",(Cell ""),""),
  @("收入合计","","",(Cell "=SUM(D4:D12)" "f" 3),"","成本合计",(Cell "=SUM(G4:G12)" "f" 3),""),
  @(""),
  @((Cell "经营快照" "s" 2),(Cell "当前值" "s" 2),"",(Cell "3 个利润漏洞" "s" 2),"","","",""),
  @("总收入",(Cell "=D13" "f" 3),"","漏洞 1","单次咨询交付碎片化，吃掉注意力。","","",""),
  @("总成本",(Cell "=G13" "f" 3),"","证据","收入不低，但需要大量零散沟通。","","",""),
  @("估算利润",(Cell "=B16-B17" "f" 3),"","动作","把单次咨询降级为筛选入口。","","",""),
  @("估算利润率",(Cell "=IF(B16=0,0,B18/B16)" "f" 4),"","漏洞 2","资料包成交多，但没有升单路径。","","",""),
  @("本人交付小时",(Cell 95 "n" 7),"","动作","资料包购买后 24 小时内引导轻诊断。","","",""),
  @("估算本人时薪",(Cell "=IF(B20=0,0,B18/B20)" "f" 3),"","漏洞 3","高利润陪跑没有成为主推入口。","","",""),
  @("最赚钱收入项",(Cell "=INDEX(A4:A12,MATCH(MAX(D4:D12),D4:D12,0))" "f"),"","30 天动作","把 3999 元陪跑改为核心报价。","","",""),
  @("最大成本项",(Cell "=INDEX(F4:F12,MATCH(MAX(G4:G12),G4:G12,0))" "f"),"","","","","","")
)

$pricingRows = @(
  @((Cell "报价/套餐测算 - 输入价格、预计成交和交付小时，判断哪个服务最值得主推" "s" 1)),
  @(""),
  @("套餐","价格","预计月销量","月收入","每单交付小时","总小时","收入/小时","建议" | ForEach-Object { Cell $_ "s" 2 }),
  @("499 轻诊断",(Cell 499 "n" 8),(Cell 6 "n" 7),(Cell "=IF(OR(B4=`"`",C4=`"`"),`"`",B4*C4)" "f" 3),(Cell 1.0 "n" 7),(Cell "=IF(OR(C4=`"`",E4=`"`"),`"`",C4*E4)" "f"),(Cell "=IF(F4=0,`"`",D4/F4)" "f" 3),"获客/筛选入口"),
  @("1299 利润体检",(Cell 1299 "n" 8),(Cell 4 "n" 7),(Cell "=IF(OR(B5=`"`",C5=`"`"),`"`",B5*C5)" "f" 3),(Cell 3.0 "n" 7),(Cell "=IF(OR(C5=`"`",E5=`"`"),`"`",C5*E5)" "f"),(Cell "=IF(F5=0,`"`",D5/F5)" "f" 3),"两周主推"),
  @("3999 月度陪跑",(Cell 3999 "n" 8),(Cell 2 "n" 7),(Cell "=IF(OR(B6=`"`",C6=`"`"),`"`",B6*C6)" "f" 3),(Cell 8.0 "n" 7),(Cell "=IF(OR(C6=`"`",E6=`"`"),`"`",C6*E6)" "f"),(Cell "=IF(F6=0,`"`",D6/F6)" "f" 3),"高利润核心"),
  @("6999 深度陪跑",(Cell 6999 "n" 8),(Cell 1 "n" 7),(Cell "=IF(OR(B7=`"`",C7=`"`"),`"`",B7*C7)" "f" 3),(Cell 14.0 "n" 7),(Cell "=IF(OR(C7=`"`",E7=`"`"),`"`",C7*E7)" "f"),(Cell "=IF(F7=0,`"`",D7/F7)" "f" 3),"限量高阶"),
  @("合计","","",(Cell "=SUM(D4:D7)" "f" 3),"",(Cell "=SUM(F4:F7)" "f"),(Cell "=IF(F8=0,`"`",D8/F8)" "f" 3),"")
)

$cashRows = @(
  @((Cell "未来 8 周现金流预警 - 输入每周确定收款和支出，自动标记风险周" "s" 1)),
  @(""),
  @("项目","Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8","合计" | ForEach-Object { Cell $_ "s" 2 }),
  @("期初现金",(Cell 5000 "n" 8),(Cell "=B8" "f" 3),(Cell "=C8" "f" 3),(Cell "=D8" "f" 3),(Cell "=E8" "f" 3),(Cell "=F8" "f" 3),(Cell "=G8" "f" 3),(Cell "=H8" "f" 3),""),
  @("确定收款",(Cell 1299 "n" 8),(Cell 1299 "n" 8),(Cell 0 "n" 8),(Cell 1299 "n" 8),(Cell 0 "n" 8),(Cell 0 "n" 8),(Cell 1299 "n" 8),(Cell 0 "n" 8),(Cell "=SUM(B5:I5)" "f" 3)),
  @("确定支出",(Cell 1800 "n" 8),(Cell 1200 "n" 8),(Cell 1600 "n" 8),(Cell 1200 "n" 8),(Cell 2800 "n" 8),(Cell 1200 "n" 8),(Cell 1200 "n" 8),(Cell 1600 "n" 8),(Cell "=SUM(B6:I6)" "f" 3)),
  @("净现金流",(Cell "=B5-B6" "f" 3),(Cell "=C5-C6" "f" 3),(Cell "=D5-D6" "f" 3),(Cell "=E5-E6" "f" 3),(Cell "=F5-F6" "f" 3),(Cell "=G5-G6" "f" 3),(Cell "=H5-H6" "f" 3),(Cell "=I5-I6" "f" 3),(Cell "=SUM(B7:I7)" "f" 3)),
  @("期末现金",(Cell "=B4+B7" "f" 3),(Cell "=C4+C7" "f" 3),(Cell "=D4+D7" "f" 3),(Cell "=E4+E7" "f" 3),(Cell "=F4+F7" "f" 3),(Cell "=G4+G7" "f" 3),(Cell "=H4+H7" "f" 3),(Cell "=I4+I7" "f" 3),(Cell "=I8" "f" 3)),
  @("最低安全现金",(Cell 3000 "n" 8),(Cell 3000 "n" 8),(Cell 3000 "n" 8),(Cell 3000 "n" 8),(Cell 3000 "n" 8),(Cell 3000 "n" 8),(Cell 3000 "n" 8),(Cell 3000 "n" 8),""),
  @("风险状态",(Cell '=IF(B8<B9,"风险",IF(B8<B9*1.5,"关注","OK"))' "f"),(Cell '=IF(C8<C9,"风险",IF(C8<C9*1.5,"关注","OK"))' "f"),(Cell '=IF(D8<D9,"风险",IF(D8<D9*1.5,"关注","OK"))' "f"),(Cell '=IF(E8<E9,"风险",IF(E8<E9*1.5,"关注","OK"))' "f"),(Cell '=IF(F8<F9,"风险",IF(F8<F9*1.5,"关注","OK"))' "f"),(Cell '=IF(G8<G9,"风险",IF(G8<G9*1.5,"关注","OK"))' "f"),(Cell '=IF(H8<H9,"风险",IF(H8<H9*1.5,"关注","OK"))' "f"),(Cell '=IF(I8<I9,"风险",IF(I8<I9*1.5,"关注","OK"))' "f"),""),
  @("建议动作",(Cell '=IF(B10="风险","提前收款/砍支出",IF(B10="关注","跟进应收款","维持"))' "f"),(Cell '=IF(C10="风险","提前收款/砍支出",IF(C10="关注","跟进应收款","维持"))' "f"),(Cell '=IF(D10="风险","提前收款/砍支出",IF(D10="关注","跟进应收款","维持"))' "f"),(Cell '=IF(E10="风险","提前收款/砍支出",IF(E10="关注","跟进应收款","维持"))' "f"),(Cell '=IF(F10="风险","提前收款/砍支出",IF(F10="关注","跟进应收款","维持"))' "f"),(Cell '=IF(G10="风险","提前收款/砍支出",IF(G10="关注","跟进应收款","维持"))' "f"),(Cell '=IF(H10="风险","提前收款/砍支出",IF(H10="关注","跟进应收款","维持"))' "f"),(Cell '=IF(I10="风险","提前收款/砍支出",IF(I10="关注","跟进应收款","维持"))' "f"),"")
)

$deliveryRows = @(
  @((Cell "交付检查表 - 每个已付款客户都复制一组检查，保证 48 小时内交付完整" "s" 1)),
  @(""),
  @("阶段","任务","负责人","截止时间","状态","备注" | ForEach-Object { Cell $_ "s" 2 }),
  @("收集","确认付款并锁定 48 小时交付时间","我","","未开始",""),
  @("收集","收集最近 30 天收入明细","客户","","未开始",""),
  @("收集","收集最近 30 天成本明细","客户","","未开始",""),
  @("收集","收集当前报价和交付小时","客户","","未开始",""),
  @("收集","收集未来 8 周确定收支","客户","","未开始",""),
  @("诊断","填写利润体检模板","我","","未开始",""),
  @("诊断","找出 3 个利润漏洞","我","","未开始",""),
  @("诊断","完成报价/套餐测算","我","","未开始",""),
  @("诊断","完成 8 周现金流预警","我","","未开始",""),
  @("交付","输出 30 天唯一优先动作","我","","未开始",""),
  @("交付","写 3 条客户沟通话术","我","","未开始",""),
  @("交付","发送表格、文档和语音讲解","我","","未开始",""),
  @("复盘","确认是否需要 30 分钟补充复盘","我","","未开始","")
)

$scriptRows = @(
  @((Cell "话术库 - 复制到私信/微信后按客户行业微调" "s" 1)),
  @(""),
  @("场景","目标","话术","下一步" | ForEach-Object { Cell $_ "s" 2 }),
  @("冷触达","领取自查清单","你好，我看到你在做一人公司/咨询/陪跑类业务。我整理了一份免费「利润漏洞自查清单」，能快速看报价、交付和现金流有没有漏钱点。你要的话我发你。","对方回复后发清单"),
  @("清单后跟进","拿到3个关键信息","你可以先回答 3 个：最近30天收入大概多少？主要成本或最耗时间的交付是什么？最焦虑的是利润低、现金流紧，还是报价不敢涨？","判断是否推进体检"),
  @("推进主服务","报价1299","我有一个48小时一人公司利润体检，会整理收入、成本、利润、报价和未来8周现金流，最后给你3个利润漏洞和1个30天动作。前4个样板名额1299元。","发资料清单并收款"),
  @("嫌贵","保留主服务，给降阶","理解。如果现在不想做完整体检，可以先做499元迷你诊断：只看一个最明显利润漏洞，并给一个7天动作。完整体检更适合已有稳定成交但利润不清楚的情况。","二选一成交"),
  @("考虑一下","制造合理截止","可以。你只看一个问题：如果这次能帮你找到一个30天内多赚或少亏1299元以上的动作，就值得做。前4个1299名额满了恢复1999元。","约定跟进时间"),
  @("成交","收款并锁定交付","确认的话我给你锁一个1299元样板名额。付款后我发资料清单，从资料完整时开始计48小时交付。","收款"),
  @("边界声明","控制风险","这是经营财务和报价诊断，不包含税务申报、代理记账、审计、法律、投资或理财建议。","写入每次交付")
)

$validationsCRM = @(
  @{ Range = "C4:C703"; Values = @("小红书","即刻","微信社群","知识星球","公众号","朋友转介绍","其他") },
  @{ Range = "F4:F703"; Values = @("未回","已回复","已领清单","已深聊","已报价","已付款","已交付","无效") },
  @{ Range = "G4:G703"; Values = @("否","是") },
  @{ Range = "K4:K703"; Values = @("1299利润体检","999限时体检","499迷你诊断","1999恢复价") },
  @{ Range = "N4:N703"; Values = @("未开始","资料待收","诊断中","已交付","需复盘") }
)
$validationsDelivery = @(@{ Range = "E4:E16"; Values = @("未开始","进行中","已完成","卡住") })

$sheets = @(
  @{ Name="Dashboard"; Rows=$dashboardRows; Widths=@(26,16,4,22,18,4,18,32); Validations=@() },
  @{ Name="CRM"; Rows=$crmRows; Widths=@(7,12,14,20,18,14,12,28,24,12,16,13,12,14,28); Validations=$validationsCRM },
  @{ Name="Daily_KPI"; Rows=$dailyRows; Widths=@(8,12,16,10,10,10,10,10,13,28,32); Validations=@() },
  @{ Name="Profit_Diagnostic"; Rows=$diagnosticRows; Widths=@(18,14,10,14,4,18,14,12); Validations=@(@{ Range="H4:H12"; Values=@("固定","变动") }) },
  @{ Name="Pricing_Calculator"; Rows=$pricingRows; Widths=@(18,12,12,14,14,12,14,20); Validations=@() },
  @{ Name="Cashflow_8W"; Rows=$cashRows; Widths=@(16,12,12,12,12,12,12,12,12,12); Validations=@() },
  @{ Name="Delivery_Checklist"; Rows=$deliveryRows; Widths=@(10,34,10,18,12,28); Validations=$validationsDelivery },
  @{ Name="Script_Library"; Rows=$scriptRows; Widths=@(12,18,70,22); Validations=@() }
)

for ($i=0; $i -lt $sheets.Count; $i++) {
  $xml = SheetXml $sheets[$i].Rows $sheets[$i].Widths $sheets[$i].Validations
  Set-Content -LiteralPath (Join-Path $BuildDir "xl\worksheets\sheet$($i+1).xml") -Value $xml -Encoding UTF8
}

if (Test-Path -LiteralPath $WorkbookPath) {
  Remove-Item -LiteralPath $WorkbookPath -Force
}

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::Open($WorkbookPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  Get-ChildItem -LiteralPath $BuildDir -Recurse -File | ForEach-Object {
    $relative = $_.FullName.Substring($BuildDir.Length + 1).Replace("\", "/")
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $relative, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally {
  $zip.Dispose()
}

$allXml = Get-ChildItem -LiteralPath (Join-Path $BuildDir "xl\worksheets") -Filter *.xml | Get-Content -Raw
if ($allXml -match "#REF!|#DIV/0!|#VALUE!|#NAME\?|#N/A") {
  throw "Formula error token found in worksheet XML."
}

Remove-Item -LiteralPath $BuildDir -Recurse -Force
Write-Host "Saved $WorkbookPath"
