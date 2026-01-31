# mask(id)

对身份证号进行隐私脱敏处理。

## 函数签名

```typescript
function mask(id: string): string
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 身份证号码 |

## 返回值

返回脱敏后的身份证号，格式为 `前3位 + *********** + 后4位`。

## 在线演示

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="maskInput" placeholder="输入身份证号码">
    <button class="demo-btn demo-btn-primary" id="maskBtn">脱敏</button>
  </div>
  <input type="text" class="demo-result-input" id="maskResult" placeholder="脱敏结果" readonly>
</div>

## 代码示例

```typescript
import { mask } from 'china-id-card'

mask('622922197808118498')  // → '622***********8498'
mask('110101900101001')    // → '110***********1001'
```
