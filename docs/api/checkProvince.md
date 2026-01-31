# checkProvince(id)

验证身份证的省份编码是否有效。

## 函数签名

```typescript
function checkProvince(id: string): boolean
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 身份证号码 |

## 返回值

返回 `true` 表示省份编码有效，否则返回 `false`。

## 在线演示

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="provinceInput" placeholder="输入身份证号码">
    <button class="demo-btn demo-btn-primary" id="provinceBtn">验证</button>
  </div>
  <input type="text" class="demo-result-input" id="provinceResult" placeholder="省份验证结果" readonly>
</div>

## 代码示例

```typescript
import { checkProvince } from 'china-id-card'

checkProvince('622922197808118498') // → true (甘肃省)
checkProvince('999922197808118498') // → false
```
