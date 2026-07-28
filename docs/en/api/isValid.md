---
title: isValid
description: isValid(id) — quickly check whether a Chinese ID number is valid
---

# isValid(id)

Quickly check whether an ID number is valid.

## Signature

```typescript
function isValid(id: string): boolean;
```

## Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | string | ID number   |

## Returns

Returns `true` if the ID number format is valid, `false` otherwise.

## Live Demo

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="isValidInput" placeholder="Enter an ID number">
    <button class="demo-btn demo-btn-primary" id="isValidBtn">Validate</button>
  </div>
  <div id="isValidResult" style="display: none;">
    <div class="demo-info-card" style="display: flex;">
      <div class="demo-info-label">Result</div>:
      <div class="demo-info-value" id="isValidValue">-</div>
    </div>
  </div>
</div>

## Example

```typescript
import { isValid } from 'china-id-card';

isValid('622922197808118498'); // → true
isValid('123456789012345678'); // → false
```
