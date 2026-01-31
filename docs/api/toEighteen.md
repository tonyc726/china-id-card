# toEighteen(id)

将 15 位身份证转换为 18 位。

## 函数签名

```typescript
function toEighteen(id: string): string | null
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 15 位身份证号码 |

## 返回值

返回转换后的 18 位身份证号码。如果输入不是有效的 15 位身份证，返回 `null`。

## 在线演示

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="toEighteenInput" placeholder="输入15位身份证号码">
    <button class="demo-btn demo-btn-primary" id="toEighteenBtn">转换</button>
  </div>
  <input type="text" class="demo-result-input" id="toEighteenResult" placeholder="18位结果" readonly>
</div>

## 代码示例

```typescript
import { toEighteen } from 'china-id-card'

toEighteen('110101900101001')  // → '110101199001010018'
```
