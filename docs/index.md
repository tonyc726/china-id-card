---
layout: home

title: China ID Card Validator
titleTemplate: ':title - 中国身份证号码验证工具库'
description: 基于 GB 11643-1999 标准的中国身份证号码验证工具库 — 0 依赖、TypeScript、支持 15/18 位验证、解析、转换与脱敏

hero:
  name: China ID Card
  text: 中国身份证号码<wbr>验证工具库
  tagline: 基于 GB 11643-1999 国家标准 · 0 依赖 · TypeScript&nbsp;·&nbsp;15/18 位全兼容
  image:
    light: /hero-card.svg
    dark: /hero-card-dark.svg
    alt: China ID Card Validator
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/
    - theme: alt
      text: 在线体验
      link: /playground
    - theme: alt
      text: GitHub
      link: https://github.com/tonyc726/china-id-card

features:
  - icon:
      src: /icons/package.svg
      alt: 0 依赖
      width: 28
      height: 28
    title: 0 依赖
    details: 无任何第三方依赖，minzip 体积不足 2KB，安全可靠，无供应链风险
  - icon:
      src: /icons/shield-check.svg
      alt: 严格校验
      width: 28
      height: 28
    title: 严格校验
    details: ISO 7064:1983 MOD 11-2 加权校验码 + 省份代码 + 出生日期合法性多重验证
  - icon:
      src: /icons/scan-search.svg
      alt: 信息解析
      width: 28
      height: 28
    title: 信息解析
    details: 一行代码解析省份、出生日期、性别、年龄，支持 15 位升 18 位转换
  - icon:
      src: /icons/eye-off.svg
      alt: 脱敏处理
      width: 28
      height: 28
    title: 脱敏处理
    details: 内置 mask() 脱敏函数，显示前 3 后 4 位，满足隐私合规展示需求
  - icon:
      src: /icons/file-code-2.svg
      alt: TypeScript 原生
      width: 28
      height: 28
    title: TypeScript 原生
    details: 完整类型定义，strict 模式开发，接口即文档，IDE 智能提示开箱即用
  - icon:
      src: /icons/monitor-smartphone.svg
      alt: 全端兼容
      width: 28
      height: 28
    title: 全端兼容
    details: 同时输出 ES / CJS / UMD 三种格式，Node.js 与浏览器环境通吃
---

## 30 秒上手

::: code-group

```bash [pnpm]
pnpm add china-id-card
```

```bash [npm]
npm install china-id-card
```

```bash [yarn]
yarn add china-id-card
```

:::

```typescript
import { isValid, parse, mask } from 'china-id-card';

// 快速验证
isValid('622922197808118498'); // → true

// 解析完整信息
const info = parse('622922197808118498');
// → { isValid: true, province: '甘肃省', birthDate: '1978-08-11',
//     gender: 'male', age: 46, ... }

// 脱敏处理
mask('622922197808118498'); // → '622***********8498'
```

不想安装？直接进入[在线体验](/playground)，在浏览器里试用全部功能。
