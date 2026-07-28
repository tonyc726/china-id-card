---
title: Guide
description: Get started with the Chinese ID card validation library based on GB 11643-1999 — installation, usage and API reference
---

# China ID Card Validator

A Chinese citizen identification number validation library based on the GB 11643-1999 national standard. Supports validation, parsing and conversion of both 15-digit and 18-digit ID numbers.

<div class="badge-row">
  <a href="https://www.npmjs.com/package/china-id-card" target="_blank" rel="noreferrer"><img src="https://img.shields.io/npm/v/china-id-card?style=flat-square" alt="npm version"></a>
  <a href="https://codecov.io/gh/tonyc726/china-id-card" target="_blank" rel="noreferrer"><img src="https://codecov.io/gh/tonyc726/china-id-card/branch/master/graph/badge.svg" alt="Coverage Status"></a>
  <a href="https://github.com/tonyc726/china-id-card/blob/master/LICENSE" target="_blank" rel="noreferrer"><img src="https://img.shields.io/github/license/tonyc726/china-id-card?style=flat-square" alt="license"></a>
</div>

## ID Number Structure

The citizen ID number is a composite code consisting of a 17-digit body code and a 1-digit check code.

### 18-digit Format

```
┌─────────┬────────────┬──────────┬────────┐
│ Address │ Birth Date │ Sequence │ Check  │
│ 6 digits│  8 digits  │ 3 digits │ 1 digit│
└─────────┴────────────┴──────────┴────────┘
```

| Field        | Length   | Description                                                                      |
| ------------ | -------- | -------------------------------------------------------------------------------- |
| **Address**  | 6 digits | Administrative division code of the registered residence, per GB/T 2260          |
| **Birth Date** | 8 digits | Year, month and day of birth, format YYYYMMDD                                    |
| **Sequence** | 3 digits | Sequence number for people born on the same day in the same area. Odd = male, even = female |
| **Check**    | 1 digit  | Calculated per ISO 7064:1983 MOD 11-2                                            |

### 15-digit Format

The 15-digit ID is the legacy (pre-1999) format:

- Address code (6 digits) + birth date code (6 digits, YYMMDD) + sequence code (3 digits)

## Features

- **Zero dependencies** — no third-party code, secure and reliable
- **Format validation** — basic ID format checks
- **Province validation** — verifies province codes
- **Birth date validation** — verifies date legality (including leap years)
- **Check digit validation** — weighted algorithm per the national standard
- **15↔18 conversion** — upgrade 15-digit IDs to 18 digits
- **Info parsing** — province, birth date, gender, age
- **Masking** — hide sensitive digits

## Quick Start

### Installation

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

### Usage

```typescript
import { isValid, parse, mask } from 'china-id-card';

// Validate an ID number
isValid('622922197808118498'); // → true

// Parse full info
const info = parse('622922197808118498');
// → { isValid: true, province: '甘肃省', birthDate: '1978-08-11', gender: 'male', ... }

// Mask sensitive digits
mask('622922197808118498'); // → '622***********8498'
```

### CommonJS

```javascript
const { isValid, parse } = require('china-id-card');
isValid('622922197808118498'); // → true
```

### Browser (UMD)

```html
<script src="https://cdn.jsdelivr.net/npm/china-id-card/dist/index.umd.js"></script>
<script>
  const { isValid, parse } = window.chinaIdCard;
  console.log(isValid('622922197808118498'));
</script>
```

## Playground

- [Online Playground](/en/playground) — parse every field of an ID number in real time
- Each function also has its own interactive demo on its API page

## API Reference

### isValid(id)

Quickly check whether an ID number is valid.

```typescript
import { isValid } from 'china-id-card';
isValid('622922197808118498'); // → true
isValid('622922197808118499'); // → false
```

### parse(id)

Parse detailed ID information. Returns an object with the following fields:

| Field           | Type               | Description             |
| --------------- | ------------------ | ----------------------- |
| `isValid`       | boolean            | Whether the ID is valid |
| `provinceCode`  | string             | Province code           |
| `province`      | string             | Province name           |
| `birthDate`     | string             | Birth date (YYYY-MM-DD) |
| `gender`        | 'male' \| 'female' | Gender                  |
| `age`           | number             | Age                     |
| `fifteenDigit`  | string \| null     | 15-digit ID number      |
| `eighteenDigit` | string \| null     | 18-digit ID number      |

```typescript
import { parse } from 'china-id-card';
parse('622922197808118498');
// → { isValid: true, province: '甘肃省', birthDate: '1978-08-11', gender: 'male', ... }
```

### mask(id)

Mask an ID number, showing the first 3 and last 4 digits.

```typescript
import { mask } from 'china-id-card';
mask('622922197808118498'); // → '622***********8498'
```

### toEighteen(id)

Convert a 15-digit ID to 18 digits.

```typescript
import { toEighteen } from 'china-id-card';
toEighteen('110101900101101'); // → '110101199001011001'
```

### getCheckCode(id)

Calculate the check digit of an 18-digit ID.

```typescript
import { getCheckCode } from 'china-id-card';
getCheckCode('11010119900101100'); // → '1'
```

### checkBaseFormat(id)

Check the basic format (length and character rules).

```typescript
import { checkBaseFormat } from 'china-id-card';
checkBaseFormat('622922197808118498'); // → true
```

### checkProvince(id)

Check whether the province code is valid.

```typescript
import { checkProvince } from 'china-id-card';
checkProvince('622922197808118498'); // → true
```

## More

- [GitHub](https://github.com/tonyc726/china-id-card)
- [Issue Tracker](https://github.com/tonyc726/china-id-card/issues)

## Test Data

```typescript
[
  '622922197808118498', // Gansu Province
  '37012519790112881X', // Shandong Province
  '510726198609245808', // Sichuan Province
  '530629198901284967', // Yunnan Province
  '31000019850412412X', // Shanghai
  '110101900101001', // 15-digit, Beijing
  '810000199012305532', // Hong Kong SAR
  '820000199012305521', // Macao SAR
];
```

## Resources

- [GB 11643-1999 Full Text (PDF, Chinese)](/GB_11643-1999_公民身份号码.pdf)
- [National Standards Portal](https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=080D6FBF2BB468F9007657F26D60013E)
