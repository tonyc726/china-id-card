---
title: getCheckCode
description: getCheckCode(id) — calculate the check digit (last digit) of a Chinese ID number
---

# getCheckCode(id)

Calculate the check digit (last digit) of an ID number.

## Signature

```typescript
function getCheckCode(id: string): string | null
```

## Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| id        | string | ID number (first 17 digits) |

## Returns

Returns the computed check digit (0-9 or X). Returns `null` if the input format is invalid.

## Live Demo

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="checkCodeInput" placeholder="Enter first 17 digits of an ID number">
    <button class="demo-btn demo-btn-primary" id="checkCodeBtn">Calculate</button>
  </div>
  <input type="text" class="demo-result-input" id="checkCodeResult" placeholder="Check digit" readonly>
</div>

## Example

```typescript
import { getCheckCode } from 'china-id-card'

getCheckCode('62292219780811849')  // → '8'
getCheckCode('31000019810227632')  // → '3'
```
