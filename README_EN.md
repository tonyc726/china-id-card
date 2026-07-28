<div align="center">
  <img src="https://raw.githubusercontent.com/tonyc726/china-id-card/master/logo.svg" alt="China ID Card" width="120" />
  <h1><a href="https://tonyc726.github.io/china-id-card">China ID Card</a></h1>
  <p>A Chinese citizen identification number validation library based on GB 11643-1999</p>
  <p>0 dependencies · TypeScript · 15/18-digit compatible · Works everywhere</p>

[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Coverage Status][codecov-image]][codecov-url]
[![NPM downloads][download-image]][npm-url]
[![Size][bundlephobia-image]][bundlephobia-url]
[![license][license-image]][license-url]

**[📖 Documentation](https://tonyc726.github.io/china-id-card)** · **[🎯 Live Demo](https://tonyc726.github.io/china-id-card/playground)** · **[🐛 Issues](https://github.com/tonyc726/china-id-card/issues)**

[简体中文](README.md) | English

</div>

## Features

| Feature                    | Description                                      |
| -------------------------- | ------------------------------------------------ |
| **0 Dependencies**         | No third-party dependencies, secure and reliable |
| **Format Validation**      | Validate ID format (15/18 digits)                |
| **Province Validation**    | Validate province code                           |
| **Check Code Validation**  | Verify check digit using weighted algorithm      |
| **15/18 Digit Conversion** | Convert between formats                          |
| **Info Parsing**           | Parse province, birthdate, gender, age           |
| **Masking**                | Hide partial ID numbers                          |

## Installation

```bash
# pnpm
pnpm add china-id-card

# npm
npm install china-id-card

# yarn
yarn add china-id-card
```

## Quick Start

```typescript
import { isValid, parse, mask } from 'china-id-card';

// Parse ID card information
const info = parse('622922197808118498');
// → { isValid: true, province: '甘肃省', birthDate: '1978-08-11', gender: 'male', age: 46, ... }

// Quick validation
isValid('622922197808118498'); // → true

// Mask sensitive data
mask('622922197808118498'); // → '622***********8498'
```

Use directly in the browser (UMD):

```html
<script src="https://cdn.jsdelivr.net/npm/china-id-card/dist/index.umd.js"></script>
<script>
  window.chinaIdCard.isValid('622922197808118498'); // → true
</script>
```

## Live Demo

Validate and parse Chinese ID numbers right in your browser — all computation stays local:

👉 **<https://tonyc726.github.io/china-id-card/playground>**

## API Reference

### Core Functions

| Function           | Return Type      | Description                     |
| ------------------ | ---------------- | ------------------------------- |
| `isValid(id)`      | `boolean`        | Quick ID validation             |
| `parse(id)`        | `IDCardInfo`     | Parse full ID information       |
| `mask(id)`         | `string`         | Mask ID (show first 3 + last 4) |
| `toEighteen(id)`   | `string \| null` | Convert 15-digit to 18-digit    |
| `getCheckCode(id)` | `string \| null` | Calculate check digit           |

### Validation Functions

| Function              | Return Type | Description            |
| --------------------- | ----------- | ---------------------- |
| `checkBaseFormat(id)` | `boolean`   | Validate basic format  |
| `checkProvince(id)`   | `boolean`   | Validate province code |

### IDCardInfo Type

```typescript
interface IDCardInfo {
  isValid: boolean; // Whether the ID is valid
  provinceCode: string; // Province code (e.g., '62')
  province: string; // Province name (e.g., '甘肃省')
  birthDate: string; // Birth date (YYYY-MM-DD)
  gender: 'male' | 'female'; // Gender
  age: number; // Age
  fifteenDigit: string | null; // 15-digit ID
  eighteenDigit: string | null; // 18-digit ID
}
```

Full API documentation with interactive demos: <https://tonyc726.github.io/china-id-card/api/isValid>

## License

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
