---
title: toEighteen
description: toEighteen(id) — convert a 15-digit Chinese ID number to the 18-digit format
---

# toEighteen(id)

Convert a 15-digit ID number to 18 digits.

## Signature

```typescript
function toEighteen(id: string): string | null
```

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| id        | string | 15-digit ID number |

## Returns

Returns the converted 18-digit ID number. Returns `null` if the input is not a valid 15-digit ID.

## Live Demo

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="toEighteenInput" placeholder="Enter a 15-digit ID number">
    <button class="demo-btn demo-btn-primary" id="toEighteenBtn">Convert</button>
  </div>
  <input type="text" class="demo-result-input" id="toEighteenResult" placeholder="18-digit result" readonly>
</div>

## Example

```typescript
import { toEighteen } from 'china-id-card'

toEighteen('110101900101001')  // → '110101199001010018'
```
