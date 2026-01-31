<script src="https://cdn.jsdelivr.net/npm/china-id-card@latest/dist/index.umd.js"></script>

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

<script>
(function() {
  const input = document.getElementById('provinceInput')
  const btn = document.getElementById('provinceBtn')
  const result = document.getElementById('provinceResult')

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
    const valid = chinaIdCard.checkProvince(input.value)
    result.value = valid ? '省份编码有效' : '省份编码无效'
    result.classList.remove('success', 'error')
    result.classList.add(valid ? 'success' : 'error')
  })

  input.value = generateRandomId()
})()
</script>
