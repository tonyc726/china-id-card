# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Chinese Citizen ID Card validation library implementing GB 11643-1999 (Citizen identification number) national standard. Validates both 15-digit and 18-digit ID card numbers using weighted checksum algorithm.

## Commands

```bash
# Build all formats (ES, CJS, UMD) + TypeScript declarations
npm run build

# Run Vitest tests
npm run test

# Run ESLint
npm run lint

# Type check
npm run typecheck

# Format with Prettier
npm run format

# Run tests with coverage
npm run test

# Documentation
npm run docs:dev     # VitePress dev server
npm run docs:build   # Build VitePress docs
```

## Architecture

Single-file utility library at `src/index.ts` with functional exports:

**Constants:**
- `CHECK_CODE_MAP` - Check code result mapping
- `WEIGHTING_MAP` - GB 11643-1999 weighting factors
- `PROVINCE_MAP` - Province code to name mapping

**Exports:**
- `isValid(id)` - Quick validation
- `parse(id)` - Full ID info (isValid, province, birthDate, gender, age, etc.)
- `mask(id)` - Mask sensitive ID (shows first 3 and last 4 digits)
- `toEighteen(id)` - Convert 15-digit to 18-digit
- `getCheckCode(id)` - Calculate check digit
- `checkBaseFormat(id)` - Validate format (length, characters)
- `checkProvince(id)` - Validate province code

**Build Output:**
- ES module: `dist/index.es.js`
- CommonJS: `dist/index.cjs.js`
- UMD: `dist/index.umd.js`
- Types: `dist/index.d.ts`

## Code Style

- TypeScript with strict mode
- ESLint with typescript-eslint + Prettier
- JSDoc comments for functions
- 0 dependencies

## Release

- Semantic-release for automated releases
- Husky pre-commit (lint-staged) and pre-push (lint + typecheck) hooks
