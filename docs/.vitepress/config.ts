import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'China ID Card Validator',
  description: '基于 GB 11643-1999 标准的中华人民共和国公民身份证号码验证工具库',
  lang: 'zh-CN',
  lastUpdated: true,
  outDir: '../pages',
  themeConfig: {
    siteTitle: 'China ID Card Validator',
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: 'API', link: '/api/isValid' },
      { text: 'GitHub', link: 'https://github.com/tonyc726/china-id-card' }
    ],
    sidebar: [
      {
        text: 'API 参考',
        items: [
          { text: 'isValid()', link: '/api/isValid' },
          { text: 'parse()', link: '/api/parse' },
          { text: 'mask()', link: '/api/mask' },
          { text: 'toEighteen()', link: '/api/toEighteen' },
          { text: 'getCheckCode()', link: '/api/getCheckCode' },
          { text: 'checkProvince()', link: '/api/checkProvince' },
          { text: 'checkBaseFormat()', link: '/api/checkBaseFormat' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tonyc726/china-id-card' }
    ],
    footer: {
      message: '基于 GB 11643-1999 标准',
      copyright: 'Powered by iTony.net'
    }
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  }
})
