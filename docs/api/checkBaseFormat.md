# checkBaseFormat(id)

验证身份证的基本格式（长度和字符）。

## 函数签名

```typescript
function checkBaseFormat(id: string): boolean
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 身份证号码 |

## 返回值

返回 `true` 表示格式正确（15位纯数字 或 17位数字+最后一位X），否则返回 `false`。

## 在线演示

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="formatInput" placeholder="输入身份证号码">
    <button class="demo-btn demo-btn-primary" id="formatBtn">验证</button>
  </div>
  <input type="text" class="demo-result-input" id="formatResult" placeholder="格式验证结果" readonly>
</div>

## 代码示例

```typescript
import { checkBaseFormat } from 'china-id-card'

checkBaseFormat('622922197808118498') // → true
checkBaseFormat('110101900101001')   // → true (15位)
checkBaseFormat('12345')             // → false
```
