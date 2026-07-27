---
title: Playground
description: Validate and parse Chinese ID numbers online — real-time check, info parsing and masking preview. All computation runs locally in your browser
---

# Playground

Enter an ID number to validate and parse it in real time. **All computation runs locally in your browser — nothing is uploaded.**

<div class="demo-container pg-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="pgInput" placeholder="Enter a 15 or 18-digit ID number" maxlength="18" autocomplete="off">
    <button class="demo-btn demo-btn-secondary" id="pgRandomBtn">Random</button>
    <button class="demo-btn demo-btn-secondary" id="pgCopyBtn">Copy</button>
  </div>
  <div class="pg-status" id="pgStatus"></div>
  <div class="pg-grid" id="pgGrid">
    <div class="demo-info-card">
      <div class="demo-info-label">Province</div>
      <div class="demo-info-value" id="pgProvince">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">Birth Date</div>
      <div class="demo-info-value" id="pgBirthDate">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">Gender</div>
      <div class="demo-info-value" id="pgGender">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">Age</div>
      <div class="demo-info-value" id="pgAge">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">15-digit</div>
      <div class="demo-info-value pg-mono" id="pgFifteen">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">18-digit</div>
      <div class="demo-info-value pg-mono" id="pgEighteen">-</div>
    </div>
    <div class="demo-info-card pg-wide">
      <div class="demo-info-label">Masked (mask)</div>
      <div class="demo-info-value pg-mono" id="pgMasked">-</div>
    </div>
  </div>
</div>

## Test Numbers

Click a number to fill it in (all are randomly generated valid test data, not real identities):

<div class="pg-chips">
  <button class="pg-chip" data-id="622922197808118498">622922197808118498</button>
  <button class="pg-chip" data-id="37012519790112881X">37012519790112881X</button>
  <button class="pg-chip" data-id="510726198609245808">510726198609245808</button>
  <button class="pg-chip" data-id="31000019850412412X">31000019850412412X</button>
  <button class="pg-chip" data-id="110101900101001">110101900101001 (15-digit)</button>
  <button class="pg-chip" data-id="123456789012345678">123456789012345678 (invalid)</button>
</div>

## Equivalent Code

```typescript
import { parse, mask } from 'china-id-card';

const info = parse('622922197808118498');
// → { isValid, province, birthDate, gender, age, fifteenDigit, eighteenDigit }

mask('622922197808118498'); // → '622***********8498'
```

::: tip Use it in your project
`pnpm add china-id-card` brings the same capabilities to your codebase. See [Getting Started](/en/guide/).
:::
