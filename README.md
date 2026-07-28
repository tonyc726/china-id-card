<div align="center">
  <img src="https://raw.githubusercontent.com/tonyc726/china-id-card/master/logo.svg" alt="China ID Card" width="120" />
  <h1><a href="https://tonyc726.github.io/china-id-card">China ID Card</a></h1>
  <p>基于 GB 11643-1999 标准的中华人民共和国公民身份号码验证工具库</p>
  <p>0 依赖 · TypeScript · 15/18 位全兼容 · 全端可用</p>

[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Coverage Status][codecov-image]][codecov-url]
[![NPM downloads][download-image]][npm-url]
[![Size][bundlephobia-image]][bundlephobia-url]
[![license][license-image]][license-url]

**[📖 文档](https://tonyc726.github.io/china-id-card)** · **[🎯 在线体验](https://tonyc726.github.io/china-id-card/playground)** · **[🐛 问题反馈](https://github.com/tonyc726/china-id-card/issues)**

简体中文 | [English](README_EN.md)

</div>

## 特性

| 特性            | 说明                           |
| --------------- | ------------------------------ |
| **0 依赖**      | 无任何第三方依赖，安全可靠     |
| **格式验证**    | 检查身份证基本格式（15/18位）  |
| **省份校验**    | 验证省份代码有效性             |
| **校验码验证**  | 使用加权算法验证校验位         |
| **15/18位转换** | 支持相互转换                   |
| **信息解析**    | 解析省份、出生日期、性别、年龄 |
| **脱敏处理**    | 隐藏部分身份证号码             |

## 安装

```bash
# pnpm
pnpm add china-id-card

# npm
npm install china-id-card

# yarn
yarn add china-id-card
```

## 快速开始

```typescript
import { isValid, parse, mask } from 'china-id-card';

// 解析身份证信息
const info = parse('622922197808118498');
// → { isValid: true, province: '甘肃省', birthDate: '1978-08-11', gender: 'male', age: 46, ... }

// 快速验证
isValid('622922197808118498'); // → true

// 脱敏处理
mask('622922197808118498'); // → '622***********8498'
```

浏览器直接使用（UMD）：

```html
<script src="https://cdn.jsdelivr.net/npm/china-id-card/dist/index.umd.js"></script>
<script>
  window.chinaIdCard.isValid('622922197808118498'); // → true
</script>
```

## 在线体验

无需安装，直接在浏览器中验证和解析身份证号码（所有计算均在本地完成）：

👉 **<https://tonyc726.github.io/china-id-card/playground>**

## API 参考

### 核心函数

| 函数               | 返回类型         | 说明                     |
| ------------------ | ---------------- | ------------------------ |
| `isValid(id)`      | `boolean`        | 快速验证身份证是否有效   |
| `parse(id)`        | `IDCardInfo`     | 解析完整身份证信息       |
| `mask(id)`         | `string`         | 脱敏处理（显示前3后4位） |
| `toEighteen(id)`   | `string \| null` | 15位转18位               |
| `getCheckCode(id)` | `string \| null` | 计算校验码               |

### 校验函数

| 函数                  | 返回类型  | 说明         |
| --------------------- | --------- | ------------ |
| `checkBaseFormat(id)` | `boolean` | 检验基本格式 |
| `checkProvince(id)`   | `boolean` | 检验省份代码 |

### IDCardInfo 类型

```typescript
interface IDCardInfo {
  isValid: boolean; // 身份证是否有效
  provinceCode: string; // 省份代码 (如: '62')
  province: string; // 省份名称 (如: '甘肃省')
  birthDate: string; // 出生日期 (YYYY-MM-DD)
  gender: 'male' | 'female'; // 性别
  age: number; // 年龄
  fifteenDigit: string | null; // 15位身份证
  eighteenDigit: string | null; // 18位身份证
}
```

完整 API 文档与交互式演示：<https://tonyc726.github.io/china-id-card/api/isValid>

## 许可证

MIT License

---

Made by [tonyc726](https://itony.net)

[npm-image]: https://img.shields.io/npm/v/china-id-card?style=flat-square
[npm-url]: https://npmjs.org/package/china-id-card
[ci-image]: https://img.shields.io/github/actions/workflow/status/tonyc726/china-id-card/ci.yml?style=flat-square&branch=master
[ci-url]: https://github.com/tonyc726/china-id-card/actions/workflows/ci.yml
[codecov-image]: https://codecov.io/gh/tonyc726/china-id-card/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/tonyc726/china-id-card
[download-image]: https://img.shields.io/npm/dm/china-id-card?style=flat-square
[bundlephobia-image]: https://img.shields.io/bundlephobia/minzip/china-id-card?style=flat-square
[bundlephobia-url]: https://bundlephobia.com/package/china-id-card
[license-image]: https://img.shields.io/github/license/tonyc726/china-id-card?style=flat-square
[license-url]: https://github.com/tonyc726/china-id-card/blob/master/LICENSE
