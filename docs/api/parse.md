<script src="https://cdn.jsdelivr.net/npm/china-id-card@latest/dist/index.umd.js"></script>

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

<script>
(function() {
  const input = document.getElementById('parseInput')
  const btn = document.getElementById('parseBtn')
  const info = document.getElementById('parseInfo')

  function generateRandomId() {
    const provinces = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82']
    const provinceCode = provinces[Math.floor(Math.random() * provinces.length)]
    const year = 1970 + Math.floor(Math.random() * 40)
    const month = 1 + Math.floor(Math.random() * 12)
    const day = 1 + Math.floor(Math.random() * 28)
    const seq = 100 + Math.floor(Math.random() * 900)
    const seventeen = provinceCode + String(10 + Math.floor(Math.random() * 90)).padStart(2, '0') + String(10 + Math.floor(Math.random() * 90)).padStart(2, '0') + year + String(month).padStart(2, '0') + String(day).padStart(2, '0') + String(seq).padStart(3, '0')
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let sum = 0
    for (let i = 0; i < 17; i++) sum += parseInt(seventeen[i]) * weights[i]
    return seventeen + checkCodes[sum % 11]
  }

  btn.addEventListener('click', () => {
    const result = chinaIdCard.parse(input.value)
    info.style.display = 'grid'
    document.getElementById('infoProvince').textContent = result.province || '-'
    document.getElementById('infoBirthDate').textContent = result.birthDate || '-'
    document.getElementById('infoGender').textContent = result.gender === 'male' ? '男' : '女'
    document.getElementById('infoAge').textContent = result.age || '-'
  })

  input.value = generateRandomId()
})()
</script>
