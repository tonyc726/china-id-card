---
title: parse
description: parse(id) — parse a Chinese ID number into province, birth date, gender, age and more
---

# parse(id)

Fully parse ID card information.

## Signature

```typescript
interface IDCardInfo {
  isValid: boolean            // whether the ID is valid
  provinceCode: string        // province code
  province: string            // province name
  birthDate: string           // birth date (YYYY-MM-DD)
  gender: 'male' | 'female'   // gender
  age: number                 // age
  fifteenDigit: string | null // 15-digit ID
  eighteenDigit: string | null // 18-digit ID
}

function parse(id: string): IDCardInfo
```

## Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | string | ID number   |

## Returns

Returns an `IDCardInfo` object with the parsed result.

## Live Demo

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="parseInput" placeholder="Enter an ID number">
    <button class="demo-btn demo-btn-primary" id="parseBtn">Parse</button>
  </div>
  <div class="demo-info-grid" id="parseInfo" style="display: none;">
    <div class="demo-info-card">
      <div class="demo-info-label">Province</div>
      <div class="demo-info-value" id="infoProvince">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">Birth Date</div>
      <div class="demo-info-value" id="infoBirthDate">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">Gender</div>
      <div class="demo-info-value" id="infoGender">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">Age</div>
      <div class="demo-info-value" id="infoAge">-</div>
    </div>
  </div>
</div>

## Example

```typescript
import { parse } from 'china-id-card'

const result = parse('622922197808118498')
// {
//   isValid: true,
//   province: '甘肃省',
//   birthDate: '1978-08-11',
//   gender: 'male',
//   age: 47,
//   eighteenDigit: '622922197808118498',
//   fifteenDigit: null
// }
```
