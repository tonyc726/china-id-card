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
  initCheckBaseFormatDemo
} from './demo'

const route = useRoute()

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
  initIsValidDemo()
  initParseDemo()
  initMaskDemo()
  initToEighteenDemo()
  initGetCheckCodeDemo()
  initCheckProvinceDemo()
  initCheckBaseFormatDemo()
}

onMounted(() => {
  loadChinaIdCardCDN()
})

watch(() => route.path, () => {
  setTimeout(initAllDemos, 100)
})
</script>

<template>
  <DefaultTheme.Layout />
</template>
