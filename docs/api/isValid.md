# isValid(id)

快速验证身份证是否有效。

## 函数签名

```typescript
function isValid(id: string): boolean;
```

## 参数

| 参数 | 类型   | 说明       |
| ---- | ------ | ---------- |
| id   | string | 身份证号码 |

## 返回值

返回 `true` 表示身份证格式有效，否则返回 `false`。

## 在线演示

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="isValidInput" placeholder="输入身份证号码">
    <button class="demo-btn demo-btn-primary" id="isValidBtn">验证</button>
  </div>
  <div id="isValidResult" style="display: none;">
    <div class="demo-info-card" style="display: flex;">
      <div class="demo-info-label">结果</div>：
      <div class="demo-info-value" id="isValidValue">-</div>
    </div>
  </div>
</div>

## 代码示例

```typescript
import { isValid } from 'china-id-card';

isValid('622922197808118498'); // → true
isValid('123456789012345678'); // → false
```
