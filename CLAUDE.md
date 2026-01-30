# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Chinese Citizen ID Card validation library implementing GB 11643-1999 national standard. Validates both 15-digit and 18-digit ID card numbers using weighted checksum algorithm.

## Commands

```bash
# Build all formats (CJS, AMD, minified)
npm run build

# Run Jest tests
npm run test

# Run ESLint
npm run lint

# Build specific format
npm run rollup:cjs      # CommonJS
npm run rollup:amd      # AMD (browser)
npm run rollup:cjs-min  # Minified CJS
npm run rollup:amd-min  # Minified AMD
```

## Architecture

Single-file utility library with functional helpers and a validation class:

- **Constants**: `CHECK_CODE_MAP`, `WEIGHTING_MAP` (GB 11643-1999 algorithm)
- **Helpers**: `checkBaseFormat`, `checkProvince`, `checkBirthday`, `getCheckCode`, `tranformEighteen`
- **Main export**: `IDCard` class - validates ID and exposes `isVerified`, `getMasterCode()`, `getCheckCode()`

Output formats: ES6, CommonJS, AMD (via Rollup).

## Code Style

- ES6+ JavaScript (no TypeScript)
- ESLint with airbnb-base config + Prettier
- JSDoc comments for functions
- Commit messages via `cz-conventional-changelog` (run `git cz` instead of `git commit`)
