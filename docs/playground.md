---
title: 在线体验
description: 在线验证和解析中国身份证号码 — 实时校验、信息解析、脱敏预览，所有计算均在浏览器本地完成
---

# 在线体验

输入身份证号码，实时验证并解析全部信息。**所有计算均在浏览器本地完成，不会上传任何数据。**

<div class="demo-container pg-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="pgInput" placeholder="输入 15 位或 18 位身份证号码" maxlength="18" autocomplete="off">
    <button class="demo-btn demo-btn-secondary" id="pgRandomBtn">随机生成</button>
    <button class="demo-btn demo-btn-secondary" id="pgCopyBtn">复制</button>
  </div>
  <div class="pg-status" id="pgStatus"></div>
  <div class="pg-grid" id="pgGrid">
    <div class="demo-info-card">
      <div class="demo-info-label">省份</div>
      <div class="demo-info-value" id="pgProvince">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">出生日期</div>
      <div class="demo-info-value" id="pgBirthDate">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">性别</div>
      <div class="demo-info-value" id="pgGender">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">年龄</div>
      <div class="demo-info-value" id="pgAge">-</div>
    </div>
    <div class="demo-info-card pg-wide-2">
      <div class="demo-info-label">15 位号码</div>
      <div class="demo-info-value pg-mono" id="pgFifteen">-</div>
    </div>
    <div class="demo-info-card pg-wide-2">
      <div class="demo-info-label">18 位号码</div>
      <div class="demo-info-value pg-mono" id="pgEighteen">-</div>
    </div>
    <div class="demo-info-card pg-wide">
      <div class="demo-info-label">脱敏显示 (mask)</div>
      <div class="demo-info-value pg-mono" id="pgMasked">-</div>
    </div>
  </div>
</div>

## 测试号码

点击下方号码快速填入（均为随机生成的合法测试数据，非真实身份信息）：

<div class="pg-chips">
  <button class="pg-chip" data-id="622922197808118498">622922197808118498</button>
  <button class="pg-chip" data-id="37012519790112881X">37012519790112881X</button>
  <button class="pg-chip" data-id="510726198609245808">510726198609245808</button>
  <button class="pg-chip" data-id="31000019850412412X">31000019850412412X</button>
  <button class="pg-chip" data-id="110101900101001">110101900101001 (15位)</button>
  <button class="pg-chip" data-id="123456789012345678">123456789012345678 (无效)</button>
</div>

## 对应代码

```typescript
import { parse, mask } from 'china-id-card';

const info = parse('622922197808118498');
// → { isValid, province, birthDate, gender, age, fifteenDigit, eighteenDigit }

mask('622922197808118498'); // → '622***********8498'
```

::: tip 在项目中使用
`pnpm add china-id-card` 即可将同样的能力集成到你的项目，详见[快速开始](/guide/)。
:::
