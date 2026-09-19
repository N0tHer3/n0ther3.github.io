# N0tHer3-blog

一个面向网络安全从业者的终端风纯前端博客模板。Vite + 原生 JavaScript，零框架、零后端，构建产物为纯静态文件，GitHub Pages / Cloudflare Pages / 任意静态服务器均可直接托管。

## 特性

- **暗色终端风 UI**：字符雨背景、macOS 风终端窗口、滚动进度条、明暗主题切换
- **可交互虚拟终端**：`ls` / `cat` / `grep` / 管道 / 命令历史 / Tab 补全，藏了一个小彩蛋
- **文章系统**：往 `src/articles/` 丢 `.md` 文件即自动发布，支持分类筛选、标签筛选、全文搜索
- **阅读体验**：Markdown 渲染（代码块 / 表格 / 引用 / 图片）、代码一键复制、图片点击放大、上一篇 / 下一篇
- **留言板**：表单经 FormSubmit 免后端转发到你的邮箱，带蜜罐防垃圾
- **关于页**：成长时间线、研究方向、常用装备
- **SEO 基础**：路由级标题、OG 分享标签、终端风 404 页面

## 快速开始

```bash
git clone https://github.com/N0tHer3/N0tHer3-blog
cd N0tHer3-blog
npm install
npm run dev
```

打开终端显示的本地地址（默认 http://localhost:5173）。构建静态文件：`npm run build`，输出在 `dist/`。

## 换成你的博客

1. **站点信息**：编辑 [`src/data.js`](src/data.js) —— 名称、头像、简介、社交链接、数据统计、项目、时间线都在这里，留空的模块自动隐藏。
2. **写文章**：把 `.md` 文件放进 `src/articles/`，写作模板见 [`src/articles/_TEMPLATE.md`](src/articles/_TEMPLATE.md)。front-matter 支持：

   ```yaml
   ---
   title: 文章标题
   date: 2026-01-01
   category: 渗透测试
   tags: [小程序, 实战]
   summary: 显示在文章列表里的摘要。
   ---
   ```

   文章配图放进 `src/articles/images/`，正文里用 `![说明](./images/xxx.png)` 引用。填 `link: https://...` 则点击跳转外部。

3. **留言板邮箱**：在 [`src/main.js`](src/main.js) 里把 `formsubmit.co/ajax/你的邮箱` 换成自己的邮箱，首次提交后去邮箱点击 FormSubmit 的激活邮件。

## 部署到 GitHub Pages

仓库已带自动部署工作流 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)：

1. 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**
2. push 到 `main` 分支即自动构建发布，地址为 `https://<用户名>.github.io/<仓库名>/`

也可用 `npm run build` 后把 `dist/` 上传到任意静态托管。

## 目录结构

```
├── index.html                  # 入口 HTML（meta 分享标签在这里改）
├── vite.config.js              # Vite 配置（base: './' 适配子路径部署）
├── .github/workflows/deploy.yml# GitHub Pages 自动部署
└── src/
    ├── main.js                 # 渲染、路由、终端、阅读弹窗
    ├── styles.css              # 全部样式（明暗主题 CSS 变量在顶部）
    ├── data.js                 # 站点配置，改这里换内容
    └── articles/               # Markdown 文章 + 图片
```

## 自定义主题色

编辑 [`src/styles.css`](src/styles.css) 顶部的 CSS 变量（`--accent`、`--bg` 等），同时把 `src/data.js` 里的 `accentColor` 一并修改即可。

## License

- **代码**：基于 [MIT License](LICENSE) 开源，欢迎学习、自用与二次开发（保留版权声明即可）。
- **文章内容**：[`src/articles/`](src/articles/) 下的全部文章与配图版权归 [N0tHer3](https://github.com/N0tHer3) 所有，未经本人授权，**禁止转载、搬运、摘编至其他平台或用于任何商业用途**。如需转载，请通过博客留言板或 GitHub Issues 联系我获得书面授权。
