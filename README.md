# china-id-card - 中国公民身份证验证工具

[![npm version](https://img.shields.io/npm/v/china-id-card?style=flat-square)](https://www.npmjs.com/package/china-id-card)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/tonyc726/china-id-card)
[![Build Status](https://travis-ci.org/tonyc726/china-id-card.svg?style=flat-square&branch=master)](https://travis-ci.org/tonyc726/china-id-card)
[![tested with vitest](https://img.shields.io/badge/tested_with-vitest-6.9?style=flat-square)](https://github.com/vitest-dev/vitest)
[![Coverage Status](https://codecov.io/gh/tonyc726/china-id-card/branch/master/graph/badge.svg)](https://codecov.io/gh/tonyc726/china-id-card)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/mashape/apistatus)

基于 GB 11643-1999 国家标准的中国公民身份证号码验证工具库，支持 15 位和 18 位身份证号码验证。

[NPM](https://www.npmjs.com/package/china-id-card) | [在线文档](https://tonyc726.github.io/china-id-card) | [标准 PDF](/docs/GB_11643-1999_公民身份号码.pdf)

## 身份证号码结构

公民身份号码是特征组合码，由十七位数字本体码和一位校验码组成。

```
┌────────┬────────┬────────┬────────┐
│ 地址码  │ 出生日期 │ 顺序码  │ 校验码  │
│  6位   │   8位  │   3位  │  1位  │
└────────┴────────┴────────┴────────┘
```

| 字段 | 长度 | 说明 |
|------|------|------|
| 地址码 | 6位 | 常住户口所在县（市、旗、区）的行政区划代码 |
| 出生日期码 | 8位 | 格式 YYYYMMDD |
| 顺序码 | 3位 | 奇数男性，偶数女性 |
| 校验码 | 1位 | ISO 7064:1983 MOD 11-2 算法 |

## 功能特性

- **0 依赖** - 无任何第三方依赖
- **格式验证** - 检查身份证基本格式
- **省份校验** - 验证省份代码有效性
- **生日校验** - 验证出生日期合法性
- **校验码验证** - 使用加权算法验证校验位
- **15/18位转换** - 支持相互转换
- **信息解析** - 解析省份、出生日期、性别、年龄
- **脱敏处理** - 隐藏部分身份证号码

## 安装

```bash
pnpm add china-id-card
```

## 使用方法

### ES Modules

```ts
import { isValid, parse, mask } from 'china-id-card';

console.log(isValid('110101199001011001')); // true

const info = parse('110101199001011001');
console.log(info);
/*
{
  isValid: true,
  provinceCode: '11',
  province: '北京市',
  birthDate: '1990-01-01',
  gender: 'male',
  age: 35,
  fifteenDigit: null,
  eighteenDigit: '110101199001011001'
}
*/

console.log(mask('110101199001011001')); // 110***********1001
```

### CommonJS

```js
const { isValid, parse } = require('china-id-card');
console.log(isValid('110101199001011001')); // true
```

### 浏览器 (UMD)

```html
<script src="https://unpkg.com/china-id-card/dist/index.umd.js"></script>
<script>
  const { isValid, parse } = window.ChinaIdCard;
  console.log(isValid('110101199001011001'));
</script>
```

## API

### isValid(id: string): boolean

快速验证身份证是否有效。

```ts
import { isValid } from 'china-id-card';
isValid('110101199001011001'); // true
isValid('11010119900101100X'); // false
```

### parse(id: string): IDCardInfo

解析身份证详细信息，返回对象包含以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `isValid` | boolean | 身份证是否有效 |
| `provinceCode` | string | 省份代码 |
| `province` | string | 省份名称 |
| `birthDate` | string | 出生日期 (YYYY-MM-DD) |
| `gender` | 'male' \| 'female' | 性别 |
| `age` | number | 年龄 |
| `fifteenDigit` | string \| null | 15位身份证号码 |
| `eighteenDigit` | string \| null | 18位身份证号码 |

```ts
import { parse } from 'china-id-card';
parse('110101199001011001');
// { isValid: true, province: '北京市', birthDate: '1990-01-01', gender: 'male', ... }
```

### mask(id: string): string

对身份证进行脱敏处理，显示前3位和后4位。

```ts
import { mask } from 'china-id-card';
mask('110101199001011001'); // '110***********1001'
```

### toEighteen(id: string): string | null

将15位身份证转换为18位。

```ts
import { toEighteen } from 'china-id-card';
toEighteen('110101900101101'); // '110101199001011001'
```

### getCheckCode(id: string): string | null

计算18位身份证的校验码。

```ts
import { getCheckCode } from 'china-id-card';
getCheckCode('11010119900101100'); // '1'
```

### checkBaseFormat(id: string): boolean

检验身份证基本格式（长度和字符规则）。

```ts
import { checkBaseFormat } from 'china-id-card';
checkBaseFormat('110101199001011001'); // true
```

### checkProvince(id: string): boolean

检验省份代码是否有效。

```ts
import { checkProvince } from 'china-id-card';
checkProvince('110101199001011001'); // true
```

## 许可证

Copyright © 2017-present. Licensed under MIT license.

---

Made by Tony ([blog](https://itony.net))
