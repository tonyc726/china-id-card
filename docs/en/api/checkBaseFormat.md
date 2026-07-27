---
title: checkBaseFormat
description: checkBaseFormat(id) — validate the basic format (length and characters) of a Chinese ID number
---

# checkBaseFormat(id)

Validate the basic format of an ID number (length and characters).

## Signature

```typescript
function checkBaseFormat(id: string): boolean
```

## Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | string | ID number   |

## Returns

Returns `true` if the format is correct (15 digits, or 17 digits + an optional trailing X), `false` otherwise.

## Live Demo

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="formatInput" placeholder="Enter an ID number">
    <button class="demo-btn demo-btn-primary" id="formatBtn">Validate</button>
  </div>
  <input type="text" class="demo-result-input" id="formatResult" placeholder="Format validation result" readonly>
</div>

## Example

```typescript
import { checkBaseFormat } from 'china-id-card'

checkBaseFormat('622922197808118498') // → true
checkBaseFormat('110101900101001')   // → true (15-digit)
checkBaseFormat('12345')             // → false
```
