<script src="https://cdn.jsdelivr.net/npm/china-id-card@latest/dist/index.umd.js"></script>

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

<script>
(function() {
  const input = document.getElementById('checkCodeInput')
  const btn = document.getElementById('checkCodeBtn')
  const result = document.getElementById('checkCodeResult')

  function generateRandomId() {
    const provinces = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82']
    const provinceCode = provinces[Math.floor(Math.random() * provinces.length)]
    const year = 1970 + Math.floor(Math.random() * 40)
    const month = 1 + Math.floor(Math.random() * 12)
    const day = 1 + Math.floor(Math.random() * 28)
    const seq = 100 + Math.floor(Math.random() * 900)
    const seventeen = provinceCode + String(10 + Math.floor(Math.random() * 90)).padStart(2, '0') + String(10 + Math.floor(Math.random() * 90)).padStart(2, '0') + year + String(month).padStart(2, '0') + String(day).padStart(2, '0') + String(seq).padStart(3, '0')
    return seventeen
  }

  btn.addEventListener('click', () => {
    const code = chinaIdCard.getCheckCode(input.value)
    if (code) {
      result.value = code
      result.classList.remove('error')
      result.classList.add('success')
    } else {
      result.value = '需要17位数字'
      result.classList.remove('success')
      result.classList.add('error')
    }
  })

  input.value = generateRandomId()
})()
</script>
