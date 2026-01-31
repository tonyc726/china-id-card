# China ID Card Validator

基于 GB 11643-1999 标准的中华人民共和国公民身份证号码验证工具库。支持 15 位和 18 位身份证号码的验证、解析和转换。

[![npm version](https://img.shields.io/npm/v/china-id-card?style=flat-square)](https://www.npmjs.com/package/china-id-card) [![Coverage Status](https://codecov.io/gh/tonyc726/china-id-card/branch/master/graph/badge.svg)](https://codecov.io/gh/tonyc726/china-id-card) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/mashape/apistatus)

## 身份证号码结构

公民身份号码是特征组合码，由十七位数字本体码和一位校验码组成。

### 18位身份证格式

```
┌───────┬──────────┬───────┬───────┐
│ 地址码 │  出生日期 │ 顺序码 │ 校验码 │
│  6位  │    8位   │  3位  │  1位  │
└───────┴──────────┴───────┴───────┘
```

| 字段           | 长度 | 说明                                                                     |
| -------------- | ---- | ------------------------------------------------------------------------ |
| **地址码**     | 6位  | 常住户口所在县（市、旗、区）的行政区划代码，按 GB/T 2260 执行            |
| **出生日期码** | 8位  | 出生年、月、日，格式 YYYYMMDD                                            |
| **顺序码**     | 3位  | 同一地址码区域内，对同年同月同日出生的人编定的顺序号。奇数男性，偶数女性 |
| **校验码**     | 1位  | 根据 ISO 7064:1983 MOD 11-2 算法计算                                     |

### 15位身份证格式

15位身份证是早期版本，格式为：

- 地址码（6位）+ 出生日期码（6位 YYMMDD）+ 顺序码（3位）

## 功能特性

- **0 依赖** - 无任何第三方依赖，安全可靠
- **格式验证** - 检查身份证基本格式
- **省份校验** - 验证省份代码有效性
- **生日校验** - 验证出生日期合法性
- **校验码验证** - 使用加权算法验证身份证校验位
- **15/18位转换** - 支持 15 位身份证转 18 位
- **信息解析** - 解析省份、出生日期、性别、年龄等信息
- **脱敏处理** - 隐藏部分身份证号码

## 快速开始

### 安装

```bash
pnpm add china-id-card
```

### 使用

```typescript
import { isValid, parse, mask } from 'china-id-card';

// 验证身份证
isValid('622922197808118498'); // → true

// 解析身份证信息
const info = parse('622922197808118498');
// → { isValid: true, province: '甘肃省', birthDate: '1978-08-11', gender: 'male', ... }

// 脱敏处理
mask('622922197808118498'); // → '622***********8498'
```

### CommonJS

```javascript
const { isValid, parse } = require('china-id-card');
isValid('622922197808118498'); // → true
```

### 浏览器 (UMD)

```html
<script src="https://cdn.jsdelivr.net/npm/china-id-card/dist/index.umd.js"></script>
<script>
  const { isValid, parse } = window.ChinaIdCard;
  console.log(isValid('622922197808118498'));
</script>
```

## 在线演示

请查看各函数的在线演示页面。

## API 参考

### isValid(id)

快速验证身份证是否有效。

```typescript
import { isValid } from 'china-id-card';
isValid('622922197808118498'); // → true
isValid('622922197808118499'); // → false
```

### parse(id)

解析身份证详细信息，返回对象包含以下字段：

| 字段            | 类型               | 说明                  |
| --------------- | ------------------ | --------------------- |
| `isValid`       | boolean            | 身份证是否有效        |
| `provinceCode`  | string             | 省份代码              |
| `province`      | string             | 省份名称              |
| `birthDate`     | string             | 出生日期 (YYYY-MM-DD) |
| `gender`        | 'male' \| 'female' | 性别                  |
| `age`           | number             | 年龄                  |
| `fifteenDigit`  | string \| null     | 15位身份证号码        |
| `eighteenDigit` | string \| null     | 18位身份证号码        |

```typescript
import { parse } from 'china-id-card';
parse('622922197808118498');
// → { isValid: true, province: '甘肃省', birthDate: '1978-08-11', gender: 'male', ... }
```

### mask(id)

对身份证进行脱敏处理，显示前3位和后4位。

```typescript
import { mask } from 'china-id-card';
mask('622922197808118498'); // → '622***********8498'
```

### toEighteen(id)

将15位身份证转换为18位。

```typescript
import { toEighteen } from 'china-id-card';
toEighteen('110101900101101'); // → '110101199001011001'
```

### getCheckCode(id)

计算18位身份证的校验码。

```typescript
import { getCheckCode } from 'china-id-card';
getCheckCode('11010119900101100'); // → '1'
```

### checkBaseFormat(id)

检验身份证基本格式（长度和字符规则）。

```typescript
import { checkBaseFormat } from 'china-id-card';
checkBaseFormat('622922197808118498'); // → true
```

### checkProvince(id)

检验省份代码是否有效。

```typescript
import { checkProvince } from 'china-id-card';
checkProvince('622922197808118498'); // → true
```

## 更多信息

- [GitHub 源码](https://github.com/tonyc726/china-id-card)
- [问题反馈](https://github.com/tonyc726/china-id-card/issues)

## 测试数据

```typescript
[
  '622922197808118498', // 甘肃省
  '37012519790112881X', // 山东省
  '510726198609245808', // 四川省
  '530629198901284967', // 云南省
  '31000019850412412X', // 上海市
  '110101900101001', // 15位北京市
  '810000199012305532', // 香港特别行政区
  '820000199012305521', // 澳门特别行政区
];
```

## 相关资源

- [GB 11643-1999 标准全文](/GB_11643-1999_公民身份号码.pdf)
- [国家标准全文公开系统](https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=080D6FBF2BB468F9007657F26D60013E)
