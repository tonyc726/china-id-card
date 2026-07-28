import { defineConfig } from 'vitepress'

const HOSTNAME = 'https://tonyc726.github.io'
const BASE = '/china-id-card/'
const SITE_URL = `${HOSTNAME}${BASE}`
const DEFAULT_TITLE = 'China ID Card Validator'
const DESC_ZH =
  '基于 GB 11643-1999 标准的中华人民共和国公民身份证号码验证工具库 — 0 依赖、TypeScript、15/18 位全兼容'
const DESC_EN =
  'A Chinese citizen ID number validation library based on GB 11643-1999 — zero dependencies, TypeScript, 15/18-digit support'

export default defineConfig({
  title: DEFAULT_TITLE,
  titleTemplate: ':title | China ID Card',
  description: DESC_ZH,
  lang: 'zh-CN',
  lastUpdated: true,
  appearance: 'light',
  base: BASE,
  outDir: '../pages',
  sitemap: {
    hostname: SITE_URL
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}logo.svg` }],
    ['link', { rel: 'icon', type: 'image/png', href: `${BASE}favicon.png` }],
    ['link', { rel: 'apple-touch-icon', href: `${BASE}apple-touch-icon.png` }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
      }
    ],
    ['meta', { name: 'keywords', content: '身份证号码,身份证验证,GB 11643,china id card,id card validation,身份证脱敏,15位身份证转18位' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: DEFAULT_TITLE }],
    ['meta', { property: 'og:image', content: `${SITE_URL}social-card.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${SITE_URL}social-card.png` }]
  ],
  transformHead({ pageData }) {
    const isEn = pageData.relativePath.startsWith('en/')
    const isHome = pageData.frontmatter.layout === 'home'
    const title = isHome
      ? isEn
        ? `${DEFAULT_TITLE} - Chinese ID Number Validation Library`
        : `${DEFAULT_TITLE} - 中国身份证号码验证工具库`
      : `${pageData.title} | ${DEFAULT_TITLE}`
    const desc = pageData.frontmatter.description || (isEn ? DESC_EN : DESC_ZH)
    const canonical = `${SITE_URL}${pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')}`

    return [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: desc }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:locale', content: isEn ? 'en_US' : 'zh_CN' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: desc }],
      ['link', { rel: 'canonical', href: canonical }]
    ]
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: DEFAULT_TITLE,
      titleTemplate: ':title | China ID Card',
      description: DESC_EN,
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Playground', link: '/en/playground' },
          { text: 'API', link: '/en/api/isValid' },
          {
            text: 'More',
            items: [
              { text: 'GitHub', link: 'https://github.com/tonyc726/china-id-card' },
              { text: 'npm', link: 'https://www.npmjs.com/package/china-id-card' },
              { text: 'Issues', link: 'https://github.com/tonyc726/china-id-card/issues' }
            ]
          }
        ],
        sidebar: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Guide', link: '/en/guide/' },
              { text: 'Playground', link: '/en/playground' },
              { text: 'FAQ', link: '/en/guide/faq' }
            ]
          },
          {
            text: 'Functions',
            items: [
              { text: 'isValid()', link: '/en/api/isValid' },
              { text: 'parse()', link: '/en/api/parse' },
              { text: 'mask()', link: '/en/api/mask' },
              { text: 'toEighteen()', link: '/en/api/toEighteen' },
              { text: 'getCheckCode()', link: '/en/api/getCheckCode' },
              { text: 'checkProvince()', link: '/en/api/checkProvince' },
              { text: 'checkBaseFormat()', link: '/en/api/checkBaseFormat' }
            ]
          }
        ]
      }
    }
  },
  themeConfig: {
    siteTitle: 'China ID Card Validator',
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '在线体验', link: '/playground' },
      { text: 'API', link: '/api/isValid' },
      {
        text: '更多',
        items: [
          { text: 'GitHub', link: 'https://github.com/tonyc726/china-id-card' },
          { text: 'npm', link: 'https://www.npmjs.com/package/china-id-card' },
          { text: '问题反馈', link: 'https://github.com/tonyc726/china-id-card/issues' }
        ]
      }
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '指南', link: '/guide/' },
          { text: '在线体验', link: '/playground' },
          { text: '常见问题', link: '/guide/faq' }
        ]
      },
      {
        text: '函数列表',
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
      { icon: 'github', link: 'https://github.com/tonyc726/china-id-card' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/china-id-card' }
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
