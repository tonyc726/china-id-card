# china-id-card Logo 重设计 Spec

- 日期：2026-07-28
- 状态：已批准（概念/形态/风格/黄金比例/README 同步均已确认）
- 设计系统：`DESIGN.md`（Cursor design system）

## 1. 背景与目标

现有 `logo.png`（256×139，蓝金交织图形 + "ID18 Verify SDK" 文字）存在三个问题：

1. 文案 "ID18 Verify SDK" 与项目名 `china-id-card` 不符
2. 蓝金配色与 Cursor 设计系统（`#f7f7f4` / `#26251e` / `#f54e00`）脱节
3. 横版比例不适合 favicon；PNG 位图无暗色模式适配能力

目标：重新设计一个符合项目特性（身份证验证）与 Cursor 设计系统的 SVG logo，覆盖 favicon、VitePress 导航 logo、og:image、README 四处使用场景。

## 2. 已确认的决策

| 维度 | 决策 |
|---|---|
| 概念 | 证件卡片 + 校验对勾（身份证剪影 + Cursor Orange 对勾徽章） |
| 形态 | 纯方形图标，单一 SVG 服务 favicon / 导航 / og 中心图形 |
| 风格 | 徽章式：ink 深底圆角方块 + cream 卡片 + orange 对勾，light/dark 双模式单文件通吃 |
| 比例 | 全部尺寸按黄金比例 φ ≈ 1.618 从 64px 画布推导 |
| README | `README.md` 与 `README_EN.md` 同步更新为新 SVG |

## 3. 视觉设计

### 3.1 结构

```
┌────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ① 底色: ink #26251e, 圆角方块
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░┌──────────────┐░░░░░░░ │  ② 卡片: cream #f7f7f4, φ:1 比例
│ ░░░│ ▓▓           │░░░░░░░ │     照片位 + 号码行×2 (ink 透明度层级)
│ ░░░│ ▓▓  ──────   │░░░░░░░ │
│ ░░░│     ──── ┌──┐│░░░░░░░ │  ③ 对勾徽章: orange #f54e00 圆形
│ ░░░└─────────┤ ✓ ├┘░░░░░░░ │     cream 描边, cream 对勾
│ ░░░░░░░░░░░░░└──┘░░░░░░░░░░ │
└────────────────────────────┘
```

### 3.2 黄金比例几何系统（viewBox `0 0 64 64`，φ = 1.6180339887）

| 元素 | 推导 | 坐标 / 尺寸（px） |
|---|---|---|
| 徽章底 | 64×64，rx = 64/φ³ | `rect(0,0,64,64)` rx **15.11** |
| 卡片 | 宽 38，高 = 38/φ | `rect(10,16,38,23.49)` rx **5.54**（= 高/φ³） |
| 照片位 | 宽 = 内容高/φ，通高 | `rect(15.5,21.5,7.72,12.49)` rx 1.5，fill ink 24% |
| 号码行 1 | 长 = 剩余内容宽 | `(26.7,25) → (42.5,25)` stroke ink 60%, w2, 圆头 |
| 号码行 2 | 长 = 行 1/φ | `(26.7,31) → (36.5,31)` stroke ink 45%, w2, 圆头 |
| 对勾徽章 | Ø = 卡高/φ | 圆心 **(51.92, 43.41)**，r **7.26**，stroke cream 2.2 |
| 对勾 | 相对圆心 φ 比例偏移 | `(-3.7,0) → (-1.0,2.7) → (3.7,-2.7)` stroke cream 2, 圆头圆角 |

**布局规则**：

- 卡片左上角锚定 `(10,16)`；对勾徽章圆心 = 卡片右下顶点 `(48, 39.49)` 沿 45° 对角线外移 `Ø/φ² ÷ √2 ≈ 3.92`，即 `(51.92, 43.41)`
- 徽章最远点 `(59.18, 50.67)`，距画布右/下边缘 ≥ 4.8px，不裁切
- 整体视觉重心落在画布黄金分割区域（约 64/φ ≈ 39.6 处）
- 16px favicon 下可辨识为「奶油卡片 + 橙色圆点」两个色块

### 3.3 颜色（严格使用 DESIGN.md token）

- 底：`#26251e`（ink）
- 卡片 / 徽章描边 / 对勾：`#f7f7f4`（canvas cream）
- 徽章：`#f54e00`（Cursor Orange）
- 卡片内部元素：`#26251e` 透明度层级（24% / 60% / 45%）
- 无渐变、无阴影、无第四种颜色

## 4. 产出文件

| 文件 | 说明 |
|---|---|
| `logo.svg`（仓库根，canonical） | 主图标，64 viewBox，内联全部样式，无外部依赖 |
| `docs/public/logo.svg` | 与根目录完全一致的副本（VitePress 静态服务要求位于 public；两文件须保持同步，验证步骤含 diff） |
| `docs/public/favicon.png` | 64×64 PNG 回退（Safari 不支持 SVG favicon） |
| `docs/public/apple-touch-icon.png` | 180×180 PNG |
| `docs/public/social-card.png` | 1200×630 og:image：cream 画布 + 居中徽章（约 180px）+ "China ID Card Validator"（Inter 600, ink）+ 副标题（muted） |
| 删除 `logo.png`、`docs/public/logo.png` | 旧 logo 废弃 |

**PNG 渲染管道**：一次性临时 HTML（引用 `logo.svg` + Google Fonts Inter），用本机 headless Chrome（`--headless --screenshot --window-size`）截图生成，PNG 提交入库；不引入新的构建依赖。

## 5. 配置与引用变更

### `docs/.vitepress/config.ts`

- favicon：
  - `['link', { rel: 'icon', type: 'image/svg+xml', href: ${BASE}logo.svg }]`
  - `['link', { rel: 'icon', type: 'image/png', href: ${BASE}favicon.png }]`
  - `['link', { rel: 'apple-touch-icon', href: ${BASE}apple-touch-icon.png }]`
- `themeConfig.logo`: `'/logo.png'` → `'/logo.svg'`
- og:image / twitter:image：`logo.png` → `social-card.png`
- `twitter:card`: `'summary'` → `'summary_large_image'`

### `README.md` / `README_EN.md`

- 第 2 行 `<img src="logo.png">` → `<img src="https://raw.githubusercontent.com/tonyc726/china-id-card/master/logo.svg" alt="China ID Card" width="120" />`
- 使用绝对 URL：npm 页面无法解析仓库相对路径

## 6. 验证

1. `logo.svg` 通过 XML 校验（`xmllint --noout`）
2. `diff logo.svg docs/public/logo.svg` 为空
3. `npm run docs:build` 通过
4. `npm run docs:dev` 启动后目测：导航 logo（light/dark 切换）、favicon 显示
5. README 在 GitHub 预览渲染正常

## 7. 非目标（YAGNI）

- 不做横版字标 logo
- 不做动画 / 交互变体
- 不引入 SVG→PNG 的持久构建工具链（一次性脚本即可）
- 不修改 og:image 以外的社交 meta 结构
