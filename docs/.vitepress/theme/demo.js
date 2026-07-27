// Demo utilities for China ID Card Validator

const TEXTS = {
  zh: {
    valid: '有效',
    invalid: '无效',
    male: '男',
    female: '女',
    invalidFifteen: '无效的15位身份证',
    needSeventeen: '需要17位数字',
    provinceValid: '省份编码有效',
    provinceInvalid: '省份编码无效',
    formatValid: '格式正确',
    formatInvalid: '格式错误',
    pgStatusValid: '✓ 有效的身份证号码',
    pgStatusInvalid: '✗ 无效的身份证号码',
    copy: '复制',
    copied: '已复制'
  },
  en: {
    valid: 'Valid',
    invalid: 'Invalid',
    male: 'Male',
    female: 'Female',
    invalidFifteen: 'Invalid 15-digit ID',
    needSeventeen: 'Requires 17 digits',
    provinceValid: 'Valid province code',
    provinceInvalid: 'Invalid province code',
    formatValid: 'Valid format',
    formatInvalid: 'Invalid format',
    pgStatusValid: '✓ Valid ID number',
    pgStatusInvalid: '✗ Invalid ID number',
    copy: 'Copy',
    copied: 'Copied'
  }
}

function t(lang) {
  return TEXTS[lang] || TEXTS.zh
}

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

export function initIsValidDemo(lang) {
  const texts = t(lang)
  const input = document.getElementById('isValidInput')
  const btn = document.getElementById('isValidBtn')
  const result = document.getElementById('isValidResult')
  const value = document.getElementById('isValidValue')

  if (!input || !btn) return

  btn.addEventListener('click', () => {
    const valid = chinaIdCard.isValid(input.value)
    result.style.display = 'block'
    value.textContent = valid ? texts.valid : texts.invalid
    value.style.color = valid ? '#0fa336' : '#e22718'
  })

  input.value = generateRandomId()
}

export function initParseDemo(lang) {
  const texts = t(lang)
  const input = document.getElementById('parseInput')
  const btn = document.getElementById('parseBtn')
  const info = document.getElementById('parseInfo')

  if (!input || !btn) return

  btn.addEventListener('click', () => {
    const result = chinaIdCard.parse(input.value)
    info.style.display = 'grid'
    document.getElementById('infoProvince').textContent = result.province || '-'
    document.getElementById('infoBirthDate').textContent = result.birthDate || '-'
    document.getElementById('infoGender').textContent = result.gender === 'male' ? texts.male : texts.female
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

export function initToEighteenDemo(lang) {
  const texts = t(lang)
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
      result.value = texts.invalidFifteen
      result.classList.remove('success')
      result.classList.add('error')
    }
  })

  input.value = '110101900101001'
}

export function initGetCheckCodeDemo(lang) {
  const texts = t(lang)
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
      result.value = texts.needSeventeen
      result.classList.remove('success')
      result.classList.add('error')
    }
  })

  input.value = generateSeventeen()
}

export function initCheckProvinceDemo(lang) {
  const texts = t(lang)
  const input = document.getElementById('provinceInput')
  const btn = document.getElementById('provinceBtn')
  const result = document.getElementById('provinceResult')

  if (!input || !btn) return

  btn.addEventListener('click', () => {
    const valid = chinaIdCard.checkProvince(input.value)
    result.value = valid ? texts.provinceValid : texts.provinceInvalid
    result.classList.remove('success', 'error')
    result.classList.add(valid ? 'success' : 'error')
  })

  input.value = generateRandomId()
}

export function initCheckBaseFormatDemo(lang) {
  const texts = t(lang)
  const input = document.getElementById('formatInput')
  const btn = document.getElementById('formatBtn')
  const result = document.getElementById('formatResult')

  if (!input || !btn) return

  btn.addEventListener('click', () => {
    const valid = chinaIdCard.checkBaseFormat(input.value)
    result.value = valid ? texts.formatValid : texts.formatInvalid
    result.classList.remove('success', 'error')
    result.classList.add(valid ? 'success' : 'error')
  })

  input.value = generateRandomId()
}

export function initPlaygroundDemo(lang) {
  const texts = t(lang)
  const input = document.getElementById('pgInput')
  const status = document.getElementById('pgStatus')
  if (!input || !status || input.dataset.inited) return
  input.dataset.inited = '1'

  const fields = {
    province: document.getElementById('pgProvince'),
    birthDate: document.getElementById('pgBirthDate'),
    gender: document.getElementById('pgGender'),
    age: document.getElementById('pgAge'),
    fifteen: document.getElementById('pgFifteen'),
    eighteen: document.getElementById('pgEighteen'),
    masked: document.getElementById('pgMasked')
  }

  function setText(el, text) {
    if (el) el.textContent = text || '-'
  }

  function render() {
    const id = input.value.trim()
    if (!id) {
      status.textContent = ''
      status.className = 'pg-status'
      Object.values(fields).forEach((el) => setText(el, '-'))
      return
    }

    const result = chinaIdCard.parse(id)
    const isEmpty = !result.province && !result.birthDate

    status.textContent = result.isValid ? texts.pgStatusValid : texts.pgStatusInvalid
    status.className = 'pg-status ' + (result.isValid ? 'pg-valid' : 'pg-invalid')

    setText(fields.province, result.province)
    setText(fields.birthDate, result.birthDate)
    setText(fields.gender, isEmpty ? '-' : result.gender === 'male' ? texts.male : texts.female)
    setText(fields.age, isEmpty ? '-' : String(result.age))
    setText(fields.fifteen, result.fifteenDigit)
    setText(fields.eighteen, result.eighteenDigit)
    setText(fields.masked, result.isValid ? chinaIdCard.mask(id) : '-')
  }

  input.addEventListener('input', render)

  const randomBtn = document.getElementById('pgRandomBtn')
  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      input.value = generateRandomId()
      render()
    })
  }

  const copyBtn = document.getElementById('pgCopyBtn')
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(input.value)
      } catch {
        input.select()
        document.execCommand('copy')
      }
      copyBtn.textContent = texts.copied
      setTimeout(() => {
        copyBtn.textContent = texts.copy
      }, 1500)
    })
  }

  document.querySelectorAll('.pg-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.id
      render()
      input.focus()
    })
  })

  input.value = generateRandomId()
  render()
}
