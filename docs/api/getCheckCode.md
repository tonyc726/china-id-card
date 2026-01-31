# getCheckCode(id)

计算身份证的校验码（最后一位）。

## 函数签名

```typescript
function getCheckCode(id: string): string | null
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 身份证号码（前17位） |

## 返回值

返回计算出的校验码（0-9 或 X），如果输入格式无效返回 `null`。

## 在线演示

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="checkCodeInput" placeholder="输入身份证号码（前17位）">
    <button class="demo-btn demo-btn-primary" id="checkCodeBtn">计算</button>
  </div>
  <input type="text" class="demo-result-input" id="checkCodeResult" placeholder="校验码" readonly>
</div>

## 代码示例

```typescript
import { getCheckCode } from 'china-id-card'

getCheckCode('62292219780811849')  // → '8'
getCheckCode('31000019810227632')  // → '3'
```
