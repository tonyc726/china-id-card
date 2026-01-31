// Demo utilities for China ID Card Validator

export function generateRandomId() {
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

export function generateSeventeen() {
  const provinces = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82']
  const provinceCode = provinces[Math.floor(Math.random() * provinces.length)]
  const year = 1970 + Math.floor(Math.random() * 40)
  const month = 1 + Math.floor(Math.random() * 12)
  const day = 1 + Math.floor(Math.random() * 28)
  const seq = 100 + Math.floor(Math.random() * 900)
  return provinceCode + String(10 + Math.floor(Math.random() * 90)).padStart(2, '0') + String(10 + Math.floor(Math.random() * 90)).padStart(2, '0') + year + String(month).padStart(2, '0') + String(day).padStart(2, '0') + String(seq).padStart(3, '0')
}

export function initIsValidDemo() {
  const input = document.getElementById('isValidInput')
  const btn = document.getElementById('isValidBtn')
  const result = document.getElementById('isValidResult')
  const value = document.getElementById('isValidValue')

  if (!input || !btn) return

  btn.addEventListener('click', () => {
    const valid = chinaIdCard.isValid(input.value)
    result.style.display = 'block'
    value.textContent = valid ? '有效' : '无效'
    value.style.color = valid ? '#0d9488' : '#f43f5e'
  })

  input.value = generateRandomId()
}

export function initParseDemo() {
  const input = document.getElementById('parseInput')
  const btn = document.getElementById('parseBtn')
  const info = document.getElementById('parseInfo')

  if (!input || !btn) return

  btn.addEventListener('click', () => {
    const result = chinaIdCard.parse(input.value)
    info.style.display = 'grid'
    document.getElementById('infoProvince').textContent = result.province || '-'
    document.getElementById('infoBirthDate').textContent = result.birthDate || '-'
    document.getElementById('infoGender').textContent = result.gender === 'male' ? '男' : '女'
    document.getElementById('infoAge').textContent = result.age || '-'
  })

  input.value = generateRandomId()
}

export function initMaskDemo() {
  const input = document.getElementById('maskInput')
  const btn = document.getElementById('maskBtn')
  const result = document.getElementById('maskResult')

  if (!input || !btn) return

  btn.addEventListener('click', () => {
    const masked = chinaIdCard.mask(input.value)
    result.value = masked
    result.classList.remove('success', 'error')
    result.classList.add(masked !== 'Invalid ID' ? 'success' : 'error')
  })

  input.value = generateRandomId()
}

export function initToEighteenDemo() {
  const input = document.getElementById('toEighteenInput')
  const btn = document.getElementById('toEighteenBtn')
  const result = document.getElementById('toEighteenResult')

  if (!input || !btn) return

  btn.addEventListener('click', () => {
    const eighteen = chinaIdCard.toEighteen(input.value)
    if (eighteen) {
      result.value = eighteen
      result.classList.remove('error')
      result.classList.add('success')
    } else {
      result.value = '无效的15位身份证'
      result.classList.remove('success')
      result.classList.add('error')
    }
  })

  input.value = '110101900101001'
}

export function initGetCheckCodeDemo() {
  const input = document.getElementById('checkCodeInput')
  const btn = document.getElementById('checkCodeBtn')
  const result = document.getElementById('checkCodeResult')

  if (!input || !btn) return

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

  input.value = generateSeventeen()
}

export function initCheckProvinceDemo() {
  const input = document.getElementById('provinceInput')
  const btn = document.getElementById('provinceBtn')
  const result = document.getElementById('provinceResult')

  if (!input || !btn) return

  btn.addEventListener('click', () => {
    const valid = chinaIdCard.checkProvince(input.value)
    result.value = valid ? '省份编码有效' : '省份编码无效'
    result.classList.remove('success', 'error')
    result.classList.add(valid ? 'success' : 'error')
  })

  input.value = generateRandomId()
}

export function initCheckBaseFormatDemo() {
  const input = document.getElementById('formatInput')
  const btn = document.getElementById('formatBtn')
  const result = document.getElementById('formatResult')

  if (!input || !btn) return

  btn.addEventListener('click', () => {
    const valid = chinaIdCard.checkBaseFormat(input.value)
    result.value = valid ? '格式正确' : '格式错误'
    result.classList.remove('success', 'error')
    result.classList.add(valid ? 'success' : 'error')
  })

  input.value = generateRandomId()
}
