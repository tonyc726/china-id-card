---
title: FAQ
description: Frequently asked questions about Chinese ID number validation — the X check digit, 15 to 18 digit conversion, algorithm details and privacy
---

# Frequently Asked Questions

## What does the X at the end of an ID number mean?

X is one of the 11 possible check digit values. The check digit is computed from the first 17 digits using the ISO 7064:1983 MOD 11-2 weighted algorithm, yielding 0–10. When the result is 10, the Roman numeral **X** is used to keep the total length at 18 digits.

This library compares check digits case-insensitively, so a lowercase `x` is also accepted:

```typescript
isValid('37012519790112881x'); // → true (lowercase x works too)
```

## What's the difference between 15-digit and 18-digit IDs?

The 15-digit format is the legacy version issued before 1999; the 18-digit format is defined by GB 11643-1999. Two differences:

1. **Birth year**: 15-digit uses a 2-digit year (`YYMMDD`, assumed 19xx); 18-digit uses the full 4-digit year (`YYYYMMDD`)
2. **Check digit**: 15-digit has none; the 18-digit format ends with a weighted check digit

`toEighteen()` upgrades per the standard: prepends `19` to the year and appends the computed check digit:

```typescript
toEighteen('110101900101001'); // → '110101199001011001'
```

## Does a passing validation mean the ID number actually exists?

**No.** This library performs **offline format validation** only:

- Length and character rules (`checkBaseFormat`)
- Province administrative code validity (`checkProvince`)
- Birth date legality (including leap years)
- Check digit consistency (MOD 11-2)

A "valid" result only means the number **follows the encoding rules** — it cannot confirm the number was actually issued or belongs to a real person. Real-name verification requires official channels; no client-side library can do that.

## Are Hong Kong, Macao and Taiwan codes supported?

Yes. The first two address digits are validated against GB/T 2260 extended codes:

| Code | Region             |
| ---- | ------------------ |
| `71` | Taiwan Province    |
| `81` | Hong Kong SAR      |
| `82` | Macao SAR          |

## What are the birth date validation rules?

Strictly per the Gregorian calendar:

- Month must be between 1 and 12
- Day must not exceed the actual days in that month (30 for Apr/Jun/Sep/Nov, 31 otherwise)
- **February follows leap-year rules**: 29 days in leap years, 28 otherwise (divisible by 4 but not 100, or divisible by 400)

So `20000229` (2000 was a leap year) is legal, while `19000229` (1900 was not) is rejected.

## How is the age returned by parse() calculated?

As full years (周岁): current year minus birth year, minus 1 if this year's birthday hasn't passed yet.

Note that age is a **dynamic value at call time** — calling on different dates may return different results.

## Will my ID number be uploaded anywhere?

**No.** This library makes zero network requests. All computation (including the [Playground](/en/playground)) happens locally in your browser. The library has no dependencies — you can audit every line of the [source code](https://github.com/tonyc726/china-id-card).

## TypeScript import errors?

The library ships its own type declarations (`dist/index.d.ts`) — no `@types/*` package needed. If you hit issues, check that:

1. `tsconfig.json` uses `moduleResolution: "bundler"` (or `node16`/`nodenext`)
2. You import as an ES module: `import { isValid } from 'china-id-card'`

## More questions?

Ask on [GitHub Issues](https://github.com/tonyc726/china-id-card/issues).
