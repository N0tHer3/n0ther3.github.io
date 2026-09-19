<div align="center">

# 汤圆_N0tHer3 · 网络安全博客

**终端风格 · 纯前端 · 零框架的个人博客**

[在线访问](https://n0ther3.github.io/) · [报告问题](https://github.com/N0tHer3/n0ther3.github.io/issues) · [联系我](https://github.com/N0tHer3)

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7.x-purple?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-yellow?style=flat-square&logo=javascript)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=flat-square&logo=github)

</div>

---

一个面向网络安全从业者的终端风纯前端博客：Vite + 原生 JavaScript，零框架、零后端，构建产物为纯静态文件，GitHub Pages / Cloudflare Pages / 任意静态服务器均可直接托管。

## ✨ 特性

**界面**

- 暗色终端风 UI：字符雨背景、macOS 风终端窗口、滚动进度条、明暗主题平滑切换
- 全站衬线标题 + 等宽代码字体的排版组合，中文渲染适配

**虚拟终端**

- 可交互仿真终端：`ls` / `cat` / `grep` / 管道 / 命令历史 / Tab 补全
- 藏了一个小彩蛋，试试看能不能找到 😏

**文章系统**

- 往 `src/articles/` 丢 `.md` 文件即自动发布，无需注册路由
- 分类筛选、标签筛选、全文搜索、阅读时长估算
- Markdown 渲染（代码块 / 表格 / 引用 / 图片）、代码一键复制、图片点击放大、上一篇 / 下一篇
- 构建期自动生成 `rss.xml` / `sitemap.xml` / `robots.txt`

**其他**

- 留言板：表单经 FormSubmit 免后端转发到邮箱，带蜜罐防垃圾
- 关于页：成长时间线、研究方向、常用装备
- SEO 基础：路由级标题、OG 分享标签、终端风 404 页面

## 🚀 快速开始

```bash
git clone https://github.com/N0tHer3/n0ther3.github.io
cd n0ther3.github.io
npm install
npm run dev     # 开发服务器（默认 http://localhost:5173）
npm run build   # 构建静态文件，输出在 dist/
```

## ✍️ 发布文章

把 Markdown 文件放进 `src/articles/` 即可，front-matter 支持以下字段：

```markdown
---
title: 文章标题
date: 2026-09-19
category: 渗透测试
tags: [标签1, 标签2]
summary: 显示在列表里的一句话摘要
---

正文支持标准 Markdown，图片放进 `src/articles/images/`，
用 `![说明](./images/xxx.png)` 引用。
```

以下划线 `_` 开头的文件会被忽略（可用作写作模板）。

## 📦 部署

仓库已内置 GitHub Actions 工作流（`.github/workflows/deploy.yml`），push 到 `main` 分支自动构建并部署。

使用时注意：

1. 仓库 **Settings → Pages → Source 必须选择 `GitHub Actions`**（不要选 "Deploy from a branch"，否则源码会被当作站点直接发布）
2. 构建使用相对路径（`base: './'`）， fork 后部署到任意子路径都能正常工作
3. 站点地址在 `vite.config.js` 的 `SITE_URL` 常量中配置，影响 RSS / Sitemap 里的链接

## 🗂 目录结构

```
├── .github/workflows/    # 自动部署工作流
├── src/
│   ├── articles/         # 文章（Markdown），images/ 为文章配图
│   ├── data.js           # 站点配置：昵称、简介、时间线、项目、友链
│   ├── main.js           # 路由、页面渲染、虚拟终端
│   └── styles.css        # 全部样式（主题变量在 :root）
├── index.html
└── vite.config.js        # 构建配置 + RSS/Sitemap 生成插件
```

## 🎨 自定义

改 `src/data.js` 就能把博客换成你自己的内容：昵称、头像、简介、统计数据、时间线、项目、友链……留空的字段会自动隐藏。配色与字体在 `src/styles.css` 的 `:root` 变量区集中管理。

## 📄 License

- **代码**：基于 [MIT License](LICENSE) 开源，欢迎学习、自用与二次开发（保留版权声明即可）
- **文章内容**：[`src/articles/`](src/articles/) 下的全部文章与配图版权归 **汤圆_N0tHer3** 所有，未经本人授权，**禁止转载、搬运、摘编至其他平台或用于任何商业用途**。如需转载，请通过博客留言板或 GitHub Issues 联系我获得书面授权。
