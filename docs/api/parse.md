# parse(id)

完整解析身份证信息。

## 函数签名

```typescript
interface IDCardInfo {
  isValid: boolean           // 是否有效
  provinceCode: string       // 省份编码
  province: string           // 省份名称
  birthDate: string          // 出生日期 (YYYY-MM-DD)
  gender: 'male' | 'female'  // 性别
  age: number                // 年龄
  fifteenDigit: string | null // 15位身份证
  eighteenDigit: string | null // 18位身份证
}

function parse(id: string): IDCardInfo
```

## 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 身份证号码 |

## 返回值

返回 `IDCardInfo` 对象，包含解析结果。

## 在线演示

<div class="demo-container">
  <div class="demo-input-group">
    <input type="text" class="demo-input" id="parseInput" placeholder="输入身份证号码">
    <button class="demo-btn demo-btn-primary" id="parseBtn">解析</button>
  </div>
  <div class="demo-info-grid" id="parseInfo" style="display: none;">
    <div class="demo-info-card">
      <div class="demo-info-label">省份</div>
      <div class="demo-info-value" id="infoProvince">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">出生日期</div>
      <div class="demo-info-value" id="infoBirthDate">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">性别</div>
      <div class="demo-info-value" id="infoGender">-</div>
    </div>
    <div class="demo-info-card">
      <div class="demo-info-label">年龄</div>
      <div class="demo-info-value" id="infoAge">-</div>
    </div>
  </div>
</div>

## 代码示例

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
