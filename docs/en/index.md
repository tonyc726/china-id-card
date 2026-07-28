---
layout: home

title: China ID Card Validator
titleTemplate: ':title - Chinese ID Number Validation Library'
description: A Chinese citizen ID number validation library based on GB 11643-1999 — zero dependencies, TypeScript, 15/18-digit validation, parsing, conversion and masking

hero:
  name: China ID Card
  text: Chinese ID Number Validation
  tagline: Based on GB 11643-1999 · Zero dependencies · TypeScript · 15/18-digit compatible
  image:
    light: /hero-card-en.svg
    dark: /hero-card-en-dark.svg
    alt: China ID Card Validator
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/
    - theme: alt
      text: Playground
      link: /en/playground
    - theme: alt
      text: GitHub
      link: https://github.com/tonyc726/china-id-card

features:
  - icon:
      src: /icons/package.svg
      alt: Zero Dependencies
      width: 28
      height: 28
    title: Zero Dependencies
    details: No third-party dependencies, under 2KB minzip — secure with zero supply-chain risk
  - icon:
      src: /icons/shield-check.svg
      alt: Strict Validation
      width: 28
      height: 28
    title: Strict Validation
    details: ISO 7064:1983 MOD 11-2 weighted check digit + province code + birth date legality
  - icon:
      src: /icons/scan-search.svg
      alt: Info Parsing
      width: 28
      height: 28
    title: Info Parsing
    details: Parse province, birth date, gender and age in one call — with 15→18 digit upgrade
  - icon:
      src: /icons/eye-off.svg
      alt: Masking Built-in
      width: 28
      height: 28
    title: Masking Built-in
    details: mask() shows first 3 and last 4 digits — ready for privacy-compliant display
  - icon:
      src: /icons/file-code-2.svg
      alt: TypeScript Native
      width: 28
      height: 28
    title: TypeScript Native
    details: Full type definitions out of the box, developed in strict mode — API docs via types
  - icon:
      src: /icons/monitor-smartphone.svg
      alt: Works Everywhere
      width: 28
      height: 28
    title: Works Everywhere
    details: Ships ES / CJS / UMD builds — runs in Node.js and browsers alike
---

## Up and running in 30 seconds

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

// Quick validation
isValid('622922197808118498'); // → true

// Parse full info
const info = parse('622922197808118498');
// → { isValid: true, province: '甘肃省', birthDate: '1978-08-11',
//     gender: 'male', age: 46, ... }

// Mask sensitive digits
mask('622922197808118498'); // → '622***********8498'
```

Don't want to install anything? Try every feature in your browser on the [Playground](/en/playground).
