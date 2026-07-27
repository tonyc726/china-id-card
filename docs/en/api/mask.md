---
title: mask
description: mask(id) — mask a Chinese ID number for privacy-compliant display (first 3 + last 4 digits)
---

# mask(id)

Mask an ID number for privacy.

## Signature

```typescript
function mask(id: string): string
```

## Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | string | ID number   |

## Returns

Returns the masked ID in the format `first 3 digits + *********** + last 4 digits`.

## Live Demo

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="maskInput" placeholder="Enter an ID number">
    <button class="demo-btn demo-btn-primary" id="maskBtn">Mask</button>
  </div>
  <input type="text" class="demo-result-input" id="maskResult" placeholder="Masked result" readonly>
</div>

## Example

```typescript
import { mask } from 'china-id-card'

mask('622922197808118498')  // → '622***********8498'
mask('110101900101001')    // → '110***********1001'
```
