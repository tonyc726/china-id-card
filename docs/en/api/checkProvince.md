---
title: checkProvince
description: checkProvince(id) — verify whether the province code of a Chinese ID number is valid
---

# checkProvince(id)

Verify whether the province code of an ID number is valid.

## Signature

```typescript
function checkProvince(id: string): boolean
```

## Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | string | ID number   |

## Returns

Returns `true` if the province code is valid, `false` otherwise.

## Live Demo

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="provinceInput" placeholder="Enter an ID number">
    <button class="demo-btn demo-btn-primary" id="provinceBtn">Validate</button>
  </div>
  <input type="text" class="demo-result-input" id="provinceResult" placeholder="Province validation result" readonly>
</div>

## Example

```typescript
import { checkProvince } from 'china-id-card'

checkProvince('622922197808118498') // → true (Gansu Province)
checkProvince('999922197808118498') // → false
```
