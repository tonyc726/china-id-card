# China ID Card Validator

<div align="center">
  <img height="100" src="./logo.png">

  基于 GB 11643-1999 标准的中华人民共和国公民身份证号码验证工具库

  [![NPM version][npm-image]][npm-url]
  [![Build Status][ci-image]][ci-url]
  [![Coverage Status][codecov-image]][codecov-url]
  [![NPM downloads][download-image]][download-url]
  [![Size][bundlephobia-image]][bundlephobia-url]
  [![license][license-image]][license-url]

  [English](./README.md) · [在线文档](https://tonyc726.github.io/china-id-card) · [国内访问](https://cdn.jsdelivr.net/gh/tonyc726/china-id-card@gh-pages/) · [更新日志](./CHANGELOG.md) · [标准 PDF](/docs/GB_11643-1999_公民身份号码.pdf)
</div>

## ✨ 特性

- ⚡ **0 依赖** - 无任何第三方依赖，安全可靠
- ✅ **格式验证** - 检查身份证基本格式
- 🏙️ **省份校验** - 验证省份代码有效性
- 🎂 **生日校验** - 验证出生日期合法性
- 🔐 **校验码验证** - 使用加权算法验证校验位
- 🔄 **15/18位转换** - 支持相互转换
- 📊 **信息解析** - 解析省份、出生日期、性别、年龄
- 🔒 **脱敏处理** - 隐藏部分身份证号码

## 🖥 环境支持

- Node.js 18+
- 现代浏览器
- Deno / Bun

## 📦 安装

```bash
pnpm add china-id-card
```

```bash
npm install china-id-card
```

```bash
bun add china-id-card
```

## 🔨 使用

```typescript
import { isValid, parse, mask } from 'china-id-card'

const info = parse('622922197808118498')
// → { isValid: true, province: '甘肃省', birthDate: '1978-08-11', gender: 'male', age: 46, ... }

isValid('622922197808118498')  // → true
mask('622922197808118498')     // → '622***********8498'
```

## API

### isValid(id: string): boolean

快速验证身份证是否有效。

```ts
import { isValid } from 'china-id-card';
isValid('110101199001011001'); // true
```

### parse(id: string): IDCardInfo

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

### mask(id: string): string

对身份证进行脱敏处理，显示前3位和后4位。

### toEighteen(id: string): string | null

将15位身份证转换为18位。

### getCheckCode(id: string): string | null

计算18位身份证的校验码。

### checkBaseFormat(id: string): boolean

检验身份证基本格式（长度和字符规则）。

### checkProvince(id: string): boolean

检验省份代码是否有效。

## 📖 文档

- [在线文档](https://tonyc726.github.io/china-id-card)
- [API 参考](/docs/api)
- [GB 11643-1999 标准](/docs/GB_11643-1999_公民身份号码.pdf)

## 🤝 贡献

欢迎提交 Pull Request 和 Issue！

## 📄 许可证

MIT License

---

Made by [Tony](https://itony.net)

[npm-image]: https://img.shields.io/npm/v/china-id-card?style=flat-square
[npm-url]: https://npmjs.org/package/china-id-card
[ci-image]: https://img.shields.io/github/actions/workflow/status/tonyc726/china-id-card/ci.yml?style=flat-square&branch=master
[ci-url]: https://github.com/tonyc726/china-id-card/actions/workflows/ci.yml
[codecov-image]: https://codecov.io/gh/tonyc726/china-id-card/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/tonyc726/china-id-card
[download-image]: https://img.shields.io/npm/dm/china-id-card?style=flat-square
[download-url]: https://npmjs.org/package/china-id-card
[bundlephobia-image]: https://img.shields.io/bundlephobia/minzip/china-id-card?style=flat-square
[bundlephobia-url]: https://bundlephobia.com/package/china-id-card
[license-image]: https://img.shields.io/github/license/tonyc726/china-id-card?style=flat-square
[license-url]: https://github.com/tonyc726/china-id-card/blob/master/LICENSE
