<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import {
  initIsValidDemo,
  initParseDemo,
  initMaskDemo,
  initToEighteenDemo,
  initGetCheckCodeDemo,
  initCheckProvinceDemo,
  initCheckBaseFormatDemo,
  initPlaygroundDemo
} from './demo'

const route = useRoute()

function currentLang() {
  return route.path.startsWith('/en/') ? 'en' : 'zh'
}

function loadChinaIdCardCDN() {
  if (!document.getElementById('china-id-card-cdn')) {
    const script = document.createElement('script')
    script.id = 'china-id-card-cdn'
    script.src = 'https://cdn.jsdelivr.net/npm/china-id-card@latest/dist/index.umd.js'
    script.onload = initAllDemos
    document.head.appendChild(script)
  } else {
    initAllDemos()
  }
}

function initAllDemos() {
  if (typeof chinaIdCard === 'undefined') return
  const lang = currentLang()
  initIsValidDemo(lang)
  initParseDemo(lang)
  initMaskDemo()
  initToEighteenDemo(lang)
  initGetCheckCodeDemo(lang)
  initCheckProvinceDemo(lang)
  initCheckBaseFormatDemo(lang)
  initPlaygroundDemo(lang)
}

onMounted(() => {
  loadChinaIdCardCDN()
})

watch(() => route.path, () => {
  setTimeout(loadChinaIdCardCDN, 100)
})
</script>

<template>
  <DefaultTheme.Layout />
</template>
