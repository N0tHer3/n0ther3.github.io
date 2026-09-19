import { site, asset } from './data.js';

/* ============================================================
   基础工具
   ============================================================ */
const icons = {
  // GitHub 官方 mark（单色剪影，跟随文字颜色）
  github: '<path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>',
  // CSDN 品牌红方块 + 白 C
  csdn: '<rect x="2.5" y="4.5" width="19" height="15" rx="3" fill="#fc5531"/><text x="12" y="15.6" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="9" font-weight="700" fill="#fff">C</text>',
  // EduSRC 盾形（交大蓝）+ 白 E
  edusrc: '<path fill="#1f5faa" d="M12 2 4 5v6c0 4.9 3.4 9.4 8 11 4.6-1.6 8-6.1 8-11V5l-8-3Z"/><text x="12" y="14.8" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="8" font-weight="700" fill="#fff">E</text>',
  mail: '<rect x="2.5" y="4" width="19" height="16" rx="1"/><path d="m3 5 9 8 9-8"/>',
  message: '<path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-3-.4-4.2-1.1L3 21l1.6-4.6A8.5 8.5 0 1 1 21 12Z"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3.2-3.2a4 4 0 1 0-5.7-5.7L11.6 6.7"/><path d="M14 10a4 4 0 0 0-5.7 0l-3.2 3.2a4 4 0 1 0 5.7 5.7l1.6-1.6"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  arrowUp: '<path d="M12 19V5m-6 6 6-6 6 6"/>',
  terminal: '<path d="m4 6 6 6-6 6m9 0h7"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  shield: '<path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  check: '<path d="m4 12.5 5 5L20 6.5"/>'
};
// 品牌 icon（github/csdn/edusrc）自带填充色，不能用描边样式渲染
const brandIcons = new Set(['github', 'csdn', 'edusrc']);
// 有官方 favicon 的直接引用官方 ico，保证与官网一致
const brandImgSrc = {
  edusrc: 'https://src.sjtu.edu.cn/static/img/main.ico',
  csdn: 'https://g.csdnimg.cn/static/logo/favicon32.ico'
};
const svg = (name, className = '') => {
  if (brandImgSrc[name]) return `<img class="brand-img ${className}" src="${brandImgSrc[name]}" alt="" aria-hidden="true">`;
  const isBrand = brandIcons.has(name);
  return `<svg class="${className}" viewBox="0 0 24 24" ${isBrand ? '' : 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"'} aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
};
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const safeUrl = (url) => /^(https?:\/\/|mailto:|\/|#)/i.test(url || '') ? url : '#';
const external = (url) => /^https?:\/\//i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : '';
const link = (item, content, cls = '') => `<a class="${cls}" href="${escapeHtml(safeUrl(item.url))}"${external(item.url)}>${content}</a>`;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
/* 动态更新页面标题与分享 meta（切换路由 / 打开文章时调用） */
const setDocMeta = (title, desc) => {
  document.title = title;
  const set = (sel, val) => { const el = document.querySelector(sel); if (el && val) el.setAttribute('content', val); };
  set('meta[name="description"]', desc);
  set('meta[property="og:title"]', title);
  set('meta[property="og:description"]', desc);
};

/* ============================================================
   迷你 Markdown 渲染器（站内阅读弹窗）
   ============================================================ */
const renderMarkdown = (md) => {
  // 图片：本地图片（./images/xxx.png）经 asset() 解析为打包后的真实地址
  // 注意：阅读器是弹窗滚动容器，lazy 在部分内核里不触发，这里用立即加载
  const mdImg = (alt, src) => `<img src="${escapeHtml(asset(src))}" alt="${escapeHtml(alt)}">`;
  const inline = (s) => {
    // 先把图片语法占位，避免 URL 被 escapeHtml 破坏
    const imgs = [];
    const tmp = String(s).replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => {
      imgs.push(`<img class="md-inline-img" src="${escapeHtml(asset(src))}" alt="${escapeHtml(alt)}">`);
      return `\u0000${imgs.length - 1}\u0000`;
    });
    return escapeHtml(tmp)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${escapeHtml(safeUrl(u))}"${external(u)}>${t}</a>`)
      .replace(/\u0000(\d+)\u0000/g, (_, i) => imgs[Number(i)] || '');
  };

  const lines = String(md).split('\n');
  const out = [];
  let para = [], list = null, code = null, table = null;

  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`<ul>${list.map(i => `<li>${inline(i)}</li>`).join('')}</ul>`); list = null; } };
  const flushCode = () => {
    if (code) {
      out.push(`<div class="md-code"><pre${code.lang ? ` data-lang="${escapeHtml(code.lang)}"` : ''}><code>${escapeHtml(code.body.join('\n'))}</code></pre><button class="md-copy" type="button" aria-label="复制代码" title="复制代码">${svg('copy')}</button></div>`);
      code = null;
    }
  };
  const flushTable = () => {
    if (table && table.length) {
      const [head, ...rows] = table;
      out.push(`<div class="md-table"><table><thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      table = null;
    }
  };
  const flushAll = () => { flushPara(); flushList(); flushCode(); flushTable(); };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (line.trim().startsWith('```')) {
      if (code) flushCode();
      else { flushAll(); code = { lang: line.trim().slice(3).trim(), body: [] }; }
      continue;
    }
    if (code) { code.body.push(raw); continue; }

    if (/^\s*\|.*\|\s*$/.test(line)) {
      const cells = line.trim().slice(1, -1).split('|').map(c => c.trim());
      if (table && cells.every(c => /^:?-{2,}:?$/.test(c))) continue;
      flushPara(); flushList();
      if (!table) table = [];
      table.push(cells);
      continue;
    } else if (table) flushTable();

    // 独立成行的图片：渲染为 figure，alt 文字作为图注
    const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (imgMatch) {
      flushAll();
      out.push(`<figure class="md-img">${mdImg(imgMatch[1], imgMatch[2])}${imgMatch[1] ? `<figcaption>${escapeHtml(imgMatch[1])}</figcaption>` : ''}</figure>`);
      continue;
    }

    if (/^###\s+/.test(line)) { flushAll(); out.push(`<h3>${inline(line.replace(/^###\s+/, ''))}</h3>`); continue; }
    if (/^##?\s+/.test(line)) { flushAll(); out.push(`<h2>${inline(line.replace(/^##?\s+/, ''))}</h2>`); continue; }
    if (/^>\s?/.test(line)) { flushPara(); flushList(); out.push(`<blockquote>${inline(line.replace(/^>\s?/, ''))}</blockquote>`); continue; }
    if (/^[-*]\s+/.test(line)) { flushPara(); if (!list) list = []; list.push(line.replace(/^[-*]\s+/, '')); continue; }
    if (/^\d+\.\s+/.test(line)) { flushPara(); if (!list) list = []; list.push(line.replace(/^\d+\.\s+/, '')); continue; }
    if (!line.trim()) { flushPara(); flushList(); continue; }
    flushList();
    para.push(line.trim());
  }
  flushAll();
  return out.join('');
};

/* ============================================================
   文章公共逻辑
   ============================================================ */
const readingMinutes = (a) => a.minutes || (a.content ? Math.max(1, Math.round(a.content.length / 450)) : 0);
const articleMeta = (a) => {
  const mins = readingMinutes(a);
  return [escapeHtml(a.category || ''), mins ? `约 ${mins} 分钟` : '', ...(a.tags || []).map(t => `#${escapeHtml(t)}`)].filter(Boolean).join('<span class="meta-sep">·</span>');
};
const articleRow = (a, i) => `
  <article class="article-row reveal" data-index="${i}" tabindex="0" role="link" aria-label="${escapeHtml(a.title)}">
    <div class="article-meta">
      <span class="article-date">${escapeHtml(a.date)}</span>
      <span class="article-cat">${escapeHtml(a.category || '')}</span>
    </div>
    <div class="article-copy">
      <strong>${escapeHtml(a.title)}</strong>
      <small>${escapeHtml(a.summary)}</small>
      <span class="article-meta-line">${articleMeta(a)}</span>
    </div>
    <span class="article-arrow">${svg('arrow')}</span>
  </article>`;

const bindArticleRows = (container) => {
  container.querySelectorAll('.article-row').forEach(row => {
    const a = site.articles[Number(row.dataset.index)];
    const activate = () => {
      if (a.content) openReader(a);
      else if (a.url) window.open(safeUrl(a.url), '_blank', 'noopener');
    };
    row.addEventListener('click', activate);
    row.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
  });
};

/* ============================================================
   站内阅读弹窗
   ============================================================ */
let lastFocus = null;
/* 相邻文章：按列表顺序（date 倒序）取上/下一篇，跳过无正文的外链文章 */
const neighborArticle = (a, dir) => {
  let i = site.articles.indexOf(a) + dir;
  while (i >= 0 && i < site.articles.length) {
    if (site.articles[i].content) return site.articles[i];
    i += dir;
  }
  return null;
};
const readerNavHtml = (a) => {
  const prev = neighborArticle(a, -1);
  const next = neighborArticle(a, 1);
  if (!prev && !next) return '';
  const item = (n, dir, label) => n
    ? `<button class="reader-nav-item ${dir < 0 ? 'prev' : 'next'}" type="button" data-dir="${dir}">
        <span class="rn-label">${label}</span>
        <strong>${escapeHtml(n.title)}</strong>
      </button>`
    : `<span class="reader-nav-item is-empty" aria-hidden="true"></span>`;
  return `<nav class="reader-nav">${item(prev, -1, '← 上一篇')}${item(next, 1, '下一篇 →')}</nav>`;
};
const openReader = (a) => {
  const reader = document.querySelector('.reader');
  if (!reader) return;
  lastFocus = document.activeElement;
  reader.querySelector('.reader-title').textContent = a.title;
  reader.querySelector('.reader-meta').innerHTML =
    `<span>${escapeHtml(a.date)}</span><span class="meta-sep">·</span><span>${escapeHtml(a.category || '')}</span><span class="meta-sep">·</span><span>约 ${readingMinutes(a)} 分钟</span>` +
    ((a.tags || []).length ? `<div class="reader-tags">${a.tags.map(t => `<span class="tag">#${escapeHtml(t)}</span>`).join('')}</div>` : '');
  const bodyEl = reader.querySelector('.reader-body');
  bodyEl.innerHTML = renderMarkdown(a.content) + readerNavHtml(a);
  bodyEl.scrollTop = 0;
  // 上一篇 / 下一篇：原地切换内容
  reader.querySelectorAll('.reader-nav-item[data-dir]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = neighborArticle(a, Number(btn.dataset.dir));
      if (target) openReader(target);
    });
  });
  reader.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  // 浏览器标签标题跟随文章，分享出去带文章名
  setDocMeta(`${a.title} · ${site.name}`, a.summary || site.bio);
  reader.querySelector('.reader-close').focus();
};
const closeReader = () => {
  const reader = document.querySelector('.reader');
  if (!reader) return;
  reader.classList.remove('is-open');
  document.body.style.overflow = '';
  setDocMeta(routeTitle(currentPath()), site.bio);
  if (lastFocus) lastFocus.focus();
};

/* ---------- 代码块复制 ---------- */
const copyText = (text) => {
  // 非安全上下文或 clipboard API 被拒（如部分浏览器设置）时的降级方案
  const fallback = () => new Promise((resolve, reject) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy') ? resolve() : reject(new Error('copy failed')); }
    catch (e) { reject(e); }
    finally { ta.remove(); }
  });
  if (navigator.clipboard && window.isSecureContext) {
    // 部分 environment 下 writeText 可能永久挂起（权限不弹也不给），500ms 未返回就走降级
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('clipboard timeout')), 500));
    return Promise.race([navigator.clipboard.writeText(text), timeout]).catch(fallback);
  }
  return fallback();
};
const copyCode = (btn) => {
  const codeEl = btn.parentElement?.querySelector('pre code');
  if (!codeEl) return;
  copyText(codeEl.textContent)
    .then(() => {
      btn.classList.add('copied');
      btn.innerHTML = svg('check');
      setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = svg('copy'); }, 1600);
    })
    .catch(() => showToast('复制失败，请手动选择复制', 'error'));
};

/* ---------- 图片灯箱 ---------- */
const lightboxIsOpen = () => !!document.querySelector('.lightbox.is-open');
const openLightbox = (img) => {
  const lb = document.querySelector('.lightbox');
  if (!lb) return;
  lb.querySelector('.lightbox-img').src = img.currentSrc || img.src;
  lb.querySelector('.lightbox-caption').textContent = img.alt || '';
  lb.classList.add('is-open');
  document.body.style.overflow = 'hidden';
};
const closeLightbox = () => {
  const lb = document.querySelector('.lightbox');
  if (!lb || !lightboxIsOpen()) return;
  lb.classList.remove('is-open');
  // 阅读弹窗还开着时保持页面锁定
  if (!document.querySelector('.reader')?.classList.contains('is-open')) document.body.style.overflow = '';
};

/* ============================================================
   主题（暗色 / 浅色）
   ============================================================ */
const getTheme = () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
const setTheme = (theme, persist = true) => {
  document.documentElement.dataset.theme = theme;
  if (persist) { try { localStorage.setItem('theme', theme); } catch { /* 忽略 */ } }
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.innerHTML = svg(theme === 'light' ? 'moon' : 'sun');
    btn.setAttribute('aria-label', theme === 'light' ? '切换到暗色主题' : '切换到浅色主题');
    btn.title = theme === 'light' ? '切换到暗色主题' : '切换到浅色主题';
  });
};
const toggleTheme = () => setTheme(getTheme() === 'light' ? 'dark' : 'light');

/* ============================================================
   背景字符雨（颜色跟随主题）
   ============================================================ */
const initBgCanvas = () => {
  const canvas = document.querySelector('.bg-canvas');
  if (!canvas || reducedMotion()) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const chars = '01<>/{}[]#$%&*+=?;:~^';
  let w, h, cols, drops;
  const FONT = 13, GAP = 26;
  const palette = () => getTheme() === 'light'
    ? { bg: '#f2f5ef', fade: 'rgba(242,245,239,.2)', char: 'rgba(90,120,75,.06)', bright: 'rgba(71,121,43,.16)' }
    : { bg: '#0d100f', fade: 'rgba(13,16,15,.18)', char: 'rgba(170,200,160,.05)', bright: 'rgba(201,232,148,.14)' };
  const resize = () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    cols = Math.ceil(w / GAP);
    drops = Array.from({ length: cols }, () => Math.floor(Math.random() * h / FONT));
    ctx.fillStyle = palette().bg;
    ctx.fillRect(0, 0, w, h);
  };
  resize();
  addEventListener('resize', resize);
  let last = 0;
  const step = (t) => {
    requestAnimationFrame(step);
    if (t - last < 90) return;
    last = t;
    const p = palette();
    ctx.fillStyle = p.fade;
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${FONT}px "JetBrains Mono",monospace`;
    for (let i = 0; i < cols; i++) {
      ctx.fillStyle = Math.random() > .985 ? p.bright : p.char;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * GAP, drops[i] * FONT);
      if (drops[i] * FONT > h && Math.random() > .976) drops[i] = 0;
      drops[i]++;
    }
  };
  requestAnimationFrame(step);
};

/* ============================================================
   可交互终端 — 虚拟 Ubuntu Shell（HexVoidOS）
   命令集贴近原生 Ubuntu，外加少量博客功能命令。
   安全说明：所有用户输入回显前都经过 escapeHtml 转义，
   不存在 innerHTML 注入；rm 对根目录等危险目标做了拦截。
   ============================================================ */
const termState = { history: [], histIdx: -1, booted: false };
const esc = escapeHtml;
const TERM = site.terminal || { user: 'tangyuan', host: 'HexVoidOS' };
const PS1 = `${TERM.user}@${TERM.host}`;

/* ---------- 虚拟文件系统 ---------- */
const F = (content) => ({ type: 'file', content });
const D = (children = {}) => ({ type: 'dir', children });
const slug = (s) => s.replace(/[\\/:*?"<>|\s]/g, '-').slice(0, 28);
const HOME = ['home', TERM.user];

const buildFs = () => D({
  home: D({
    [TERM.user]: D({
      'README.md': F(`# ${site.name}\n\n${site.bio}\n\n## 快速上手\n\n  help       查看全部命令\n  articles   列出文章\n  neofetch   看看这台机器\n\nPowered by curiosity.`),
      'interests.txt': F((site.interests || []).join('\n')),
      'about.txt': F(site.about.join('\n\n')),
      'contact.txt': F(site.links.map(l => `${l.label}: ${l.url}`).join('\n')),
      'flag.txt': F(`flag{ty_security_2018451280}

恭喜你，找到了我的联系方式 :)

这是联系作者的暗号：
QQ:    2018451280
邮箱:  TY_security@163.com
GitHub: https://github.com/N0tHer3

添加好友时备注「来自终端 flag」即可通过验证。`),
      'secrets.txt': F('flag{try_reading_data_js_instead}\n\n好吧，这个文件里其实什么都没有。\n有趣的是，你居然真的来 cat 了。 Stay curious. :)'),
      '.bashrc': F(`# ~/.bashrc\nexport PS1="\\u@\\h:\\w\\$ "\nalias ll="ls -la"\nalias la="ls -a"\n\n# Powered by curiosity\n`),
      articles: D(Object.fromEntries(site.articles.map((a, i) => [
        `${String(i + 1).padStart(2, '0')}-${slug(a.title)}.md`,
        F(`# ${a.title}\n\n> ${a.date} · ${a.category || ''} · ${(a.tags || []).join(' / ')}\n\n${a.content || `${a.summary}\n\n(完整排版请运行: open ${i})`}`)
      ]))),
      projects: D(Object.fromEntries(site.projects.map(p => [
        `${p.name}.txt`,
        F(`${p.name} (${p.year || 'WIP'})\n${'='.repeat(36)}\n${p.description}\n\n${p.detail}\n\n${p.url}`)
      ])))
    })
  }),
  etc: D({
    hostname: F(TERM.host),
    os: D({ release: F('Ubuntu 24.04 LTS (HexVoidOS edition)') }),
    motd: F(`Welcome to ${TERM.host}.\nUnauthorized curiosity is encouraged.`),
    passwd: F(`root:x:0:0:root:/root:/bin/bash\n${TERM.user}:x:1000:1000:${TERM.user},,,:/home/${TERM.user}:/bin/bash`)
  }),
  var: D({
    log: D({
      'blog.log': F('[INFO] system boot ok\n[INFO] visitor from 127.0.0.1\n[WARN] curiosity level overflow\n[INFO] serving blog content')
    })
  }),
  usr: D({
    bin: D(Object.fromEntries(['ls', 'cat', 'grep', 'echo', 'cd', 'pwd', 'open', 'theme', 'goto', 'neofetch'].map(c => [c, F('<binary>')])))
  })
});

let vfs = buildFs();
let cwd = [...HOME];

/* ---------- 路径解析 ---------- */
const resolvePath = (input) => {
  let segs;
  if (!input || input === '~') segs = [...HOME];
  else if (input.startsWith('~')) segs = [...HOME, ...input.slice(1).split('/').filter(Boolean)];
  else if (input.startsWith('/')) segs = input.split('/').filter(Boolean);
  else segs = [...cwd, ...input.split('/').filter(Boolean)];
  const out = [];
  for (const s of segs) {
    if (s === '.') continue;
    else if (s === '..') out.pop();
    else out.push(s);
  }
  return out;
};
const getNode = (segs) => {
  let node = vfs;
  for (const s of segs) {
    if (node.type !== 'dir' || !node.children[s]) return null;
    node = node.children[s];
  }
  return node;
};
const cwdLabel = () => {
  if (cwd.length >= HOME.length && HOME.every((h, i) => cwd[i] === h)) {
    const rest = cwd.slice(HOME.length);
    return rest.length ? '~/' + rest.join('/') : '~';
  }
  return '/' + cwd.join('/');
};
const promptHtml = () => `<span class="t-user">${esc(PS1)}</span><span class="t-psep">:</span><span class="t-path">${esc(cwdLabel())}</span><span class="t-psep">$</span>`;

/* ---------- 命令实现 ----------
   返回 { lines: string[](html), text: string(纯文本,供管道), code: number, clear?: bool } */
const ok = (lines, text = lines.map(l => l.replace(/<[^>]+>/g, '')).join('\n'), code = 0) => ({ lines, text, code });
const err = (line, code = 1) => ({ lines: [`<span class="t-err">${esc(line)}</span>`], text: '', code });

const commands = {
  /* ---- 文件系统 ---- */
  ls: (args) => {
    const flags = args.filter(a => a.startsWith('-'));
    const paths = args.filter(a => !a.startsWith('-'));
    const showAll = flags.some(f => f.includes('a'));
    const long = flags.some(f => f.includes('l'));
    const target = paths[0] || '.';
    const node = getNode(resolvePath(target));
    if (!node) return err(`ls: cannot access '${target}': No such file or directory`);
    if (node.type === 'file') return ok([esc(target)], target);
    let names = Object.keys(node.children).filter(n => showAll || !n.startsWith('.'));
    if (showAll) names = ['.', '..', ...names];
    const fmt = (n) => node.children[n] && node.children[n].type === 'dir' ? `<span class="t-dir">${esc(n)}</span>` : esc(n);
    if (long) {
      const lines = [`<span class="t-dim">total ${names.length}</span>`];
      names.forEach(n => {
        const child = node.children[n];
        const isDir = child && child.type === 'dir';
        const size = child && child.type === 'file' ? String(child.content.length).padStart(6) : '   4096';
        lines.push(`${isDir ? 'drwxr-xr-x' : '-rw-r--r--'} 1 ${TERM.user} ${TERM.user} ${size} Sep 17 12:00 ${fmt(n)}`);
      });
      return ok(lines, names.join('\n'));
    }
    return ok([names.map(fmt).join('  ')], names.join('\n'));
  },
  cd: (args) => {
    const target = args[0] || '~';
    const segs = resolvePath(target);
    const node = getNode(segs);
    if (!node) return err(`cd: ${target}: No such file or directory`);
    if (node.type !== 'dir') return err(`cd: ${target}: Not a directory`);
    cwd = segs;
    return { lines: [], text: '', code: 0, syncPrompt: true };
  },
  pwd: () => ok(['/' + cwd.join('/')], '/' + cwd.join('/')),
  cat: (args) => {
    if (!args.length) return err('usage: cat <file>...');
    const out = [], errs = [], texts = [];
    for (const p of args) {
      const node = getNode(resolvePath(p));
      if (!node) errs.push(`cat: ${p}: No such file or directory`);
      else if (node.type === 'dir') errs.push(`cat: ${p}: Is a directory`);
      else { out.push(...node.content.split('\n').map(esc)); texts.push(node.content); }
    }
    return ok([...out, ...errs.map(e => `<span class="t-err">${esc(e)}</span>`)], texts.join('\n'), errs.length ? 1 : 0);
  },
  /* ---- 只读文件系统：出于安全考虑不提供增删改命令（mkdir/touch/rm/cp/mv） ---- */

  /* ---- 文本处理 ---- */
  grep: (args, stdin) => {
    const flags = args.filter(a => a.startsWith('-'));
    const rest = args.filter(a => !a.startsWith('-'));
    const ic = flags.some(f => f.includes('i'));
    if (!rest.length) return err('usage: grep [-i] PATTERN [FILE]');
    const pattern = rest[0];
    let source;
    if (rest[1]) {
      const node = getNode(resolvePath(rest[1]));
      if (!node || node.type === 'dir') return err(`grep: ${rest[1]}: No such file or directory`, 2);
      source = node.content;
    } else source = stdin;
    const safe = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rx = new RegExp(safe, ic ? 'i' : '');
    const hits = source.split('\n').filter(l => rx.test(l));
    const lines = hits.map(l => esc(l).replace(new RegExp(`(${safe})`, ic ? 'gi' : 'g'), '<span class="t-hl">$1</span>'));
    return ok(lines, hits.join('\n'), hits.length ? 0 : 1);
  },
  head: (args, stdin) => {
    const nIdx = args.indexOf('-n');
    const n = nIdx >= 0 ? Number(args[nIdx + 1]) || 10 : 10;
    const rest = args.filter(a => !a.startsWith('-') && a !== String(n));
    let source = stdin;
    if (rest.length) {
      const node = getNode(resolvePath(rest[0]));
      if (!node || node.type === 'dir') return err(`head: ${rest[0]}: No such file or directory`);
      source = node.content;
    }
    const lines = source.split('\n').slice(0, n).map(esc);
    return ok(lines, lines.map(l => l).join('\n'));
  },
  tail: (args, stdin) => {
    const nIdx = args.indexOf('-n');
    const n = nIdx >= 0 ? Number(args[nIdx + 1]) || 10 : 10;
    const rest = args.filter(a => !a.startsWith('-') && a !== String(n));
    let source = stdin;
    if (rest.length) {
      const node = getNode(resolvePath(rest[0]));
      if (!node || node.type === 'dir') return err(`tail: ${rest[0]}: No such file or directory`);
      source = node.content;
    }
    const lines = source.split('\n').slice(-n).map(esc);
    return ok(lines, lines.join('\n'));
  },
  wc: (args, stdin) => {
    const lFlag = args.some(a => a.includes('l'));
    const rest = args.filter(a => !a.startsWith('-'));
    let source = stdin;
    if (rest.length) {
      const node = getNode(resolvePath(rest[0]));
      if (!node || node.type === 'dir') return err(`wc: ${rest[0]}: No such file or directory`);
      source = node.content;
    }
    const lineCount = source ? source.split('\n').length : 0;
    const wordCount = source ? source.split(/\s+/).filter(Boolean).length : 0;
    const text = lFlag ? String(lineCount) : `${lineCount} ${wordCount} ${source.length}`;
    return ok([esc(text)], text);
  },
  echo: (args) => {
    const env = { USER: TERM.user, HOME: `/home/${TERM.user}`, SHELL: '/bin/bash', PWD: '/' + cwd.join('/'), HOSTNAME: TERM.host, BLOG: site.name };
    const text = args.join(' ').replace(/\$\{?(\w+)\}?/g, (_, k) => env[k] ?? '');
    return ok([esc(text)], text);
  },

  /* ---- 系统信息 ---- */
  whoami: () => ok([TERM.user], TERM.user),
  id: () => ok([`uid=1000(${TERM.user}) gid=1000(${TERM.user}) groups=1000(${TERM.user}),27(sudo)`], `uid=1000(${TERM.user})`),
  hostname: () => ok([TERM.host], TERM.host),
  uname: (args) => {
    const text = args.some(a => /a/.test(a))
      ? `Linux ${TERM.host} 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`
      : 'Linux';
    return ok([esc(text)], text);
  },
  date: () => {
    const text = new Date().toLocaleString('zh-CN', { hour12: false });
    return ok([esc(text)], text);
  },
  uptime: () => {
    const text = ` 12:00:00 up 1461 days,  1 user,  load average: 0.42, 0.13, 0.07`;
    return ok([esc(text)], text);
  },
  ps: (args) => {
    const text = ['  PID TTY          TIME CMD', ' 1001 pts/0    00:00:00 zsh', ' 1337 pts/0    00:00:00 blog', ' 2026 pts/0    00:00:00 ps'].join('\n');
    return ok(text.split('\n').map(esc), text);
  },
  free: () => {
    const text = ['               total        used        free', 'Mem:            16Gi       8.2Gi       7.8Gi', 'Swap:           8Gi          0B       8Gi'].join('\n');
    return ok(text.split('\n').map(l => `<span class="t-dim">${esc(l)}</span>`), text);
  },
  df: () => {
    const text = ['Filesystem      Size  Used Avail Use% Mounted on', '/dev/sda1       512G  128G  384G  25% /', 'tmpfs           7.8G  1.2M  7.8G   1% /dev/shm'].join('\n');
    return ok(text.split('\n').map(esc), text);
  },
  env: () => ok([`USER=${TERM.user}`, `HOME=/home/${TERM.user}`, `SHELL=/bin/bash`, `PWD=/${cwd.join('/')}`, `BLOG=${site.name}`].map(esc), ''),
  history: () => ok(termState.history.map((h, i) => `  ${String(i + 1).padStart(4)}  ${esc(h)}`), ''),
  clear: () => ({ lines: [], text: '', code: 0, clear: true }),
  man: (args) => {
    // 通俗版手册：说人话
    const pages = {
      ls: 'ls — 看看当前文件夹里有什么\n用法: ls（不需要参数）',
      pwd: 'pwd — 我现在在哪个目录\n用法: pwd',
      whoami: 'whoami — 我是谁\n用法: whoami',
      hostname: 'hostname — 这台机器叫什么\n用法: hostname',
      articles: 'articles — 列出博客全部文章\n用法: articles',
      neofetch: 'neofetch — 看看这台机器的配置卡片\n用法: neofetch',
      sudo: 'sudo — 想借 root 权限？\n这台机器上你永远不在 sudoers 名单里。'
    };
    const name = args[0];
    if (!name || !pages[name]) return err(`man: 没有关于 ${name || ''} 的手册页（试试 man ls）`);
    return ok(pages[name].split('\n').map(esc), pages[name]);
  },
  fortune: () => {
    const quotes = [
      'Stay hungry, stay curious. —— 敲命令也一样。',
      '世界上只有两种系统：已经被攻破的，和还没被发现攻破的。',
      '最好的补丁，是写下那段代码之前的思考。',
      'Trust is a vulnerability. 信任也是一种漏洞。',
      '漏洞报告会过时，但排查思路永远是资产。',
      '凌晨三点的 Burp，比咖啡更提神。',
      '没有删库跑路，只有删库跑不掉。',
      '所谓经验，就是把踩过的坑变成下一个人的路标。'
    ];
    const line = quotes[Math.floor(Math.random() * quotes.length)];
    return ok([`<span class="t-ok">fortune:</span> ${esc(line)}`], '');
  },

  /* ---- 网络 ---- */
  ping: (args) => {
    const host = args.find(a => !a.startsWith('-')) || '127.0.0.1';
    const lines = [`PING ${esc(host)} (${esc(host)}) 56(84) bytes of data.`];
    for (let i = 1; i <= 4; i++) lines.push(`64 bytes from ${esc(host)}: icmp_seq=${i} ttl=64 time=0.0${i * 3} ms`);
    lines.push('', `--- ${esc(host)} ping statistics ---`, '4 packets transmitted, 4 received, 0% packet loss');
    return ok(lines, '');
  },
  ifconfig: () => {
    const text = ['eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
      '        inet 192.168.1.42  netmask 255.255.255.0  broadcast 192.168.1.255',
      '        ether 00:16:3e:xx:xx:xx  txqueuelen 1000  (Ethernet)',
      '',
      'lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536',
      '        inet 127.0.0.1  netmask 255.0.0.0'].join('\n');
    return ok(text.split('\n').map(esc), text);
  },
  sudo: (args) => {
    if (!args.length) return err('usage: sudo <command>');
    return ok([
      `<span class="t-dim">[sudo] password for ${esc(TERM.user)}:</span> ********`,
      `<span class="t-err">${esc(TERM.user)} is not in the sudoers file. This incident will be reported.</span>`
    ], '', 1);
  },
  su: () => err('su: Authentication failure'),
  chmod: () => err('chmod: changing permissions: Operation not permitted'),
  chown: () => err('chown: changing ownership: Operation not permitted'),
  apt: () => ok(['Reading package lists... Done', 'Building dependency tree... Done', `<span class="t-ok">所有软件包都是最新的（这台机器无需安装任何东西）。</span>`], ''),
  exit: () => ok(['exit: 博客不会关闭，学习也不会停止。'], ''),

  /* ---- 博客扩展 ---- */
  open: (args) => {
    const a = site.articles[Number(args[0])];
    if (args[0] === undefined || !/^\d+$/.test(args[0]) || !a) return err(`open: 用法 open <n>，序号见 ls articles/（范围 0-${site.articles.length - 1}）`);
    if (a.content) {
      setTimeout(() => openReader(a), 120);
      return ok([`<span class="t-ok">opening: ${esc(a.title)} ...</span>`], '');
    }
    if (a.url) {
      window.open(safeUrl(a.url), '_blank', 'noopener');
      return ok([`<span class="t-ok">已在浏览器打开: ${esc(a.url)}</span>`], '');
    }
    return err('open: 该文章暂无正文');
  },
  articles: () => {
    const lines = site.articles.map((a, i) => `  [${i}] <span class="t-dir">${a.date}</span>  ${esc(a.title)}`);
    return ok(lines, '');
  },
  projects: () => ok(site.projects.map(p => `▸ <span class="t-ok">${esc(p.name)}</span>（${esc(p.year || 'WIP')}）— ${esc(p.description)}`), ''),
  contact: () => ok(site.links.map(l => `<span class="t-ok">${esc(l.label)}</span>: ${esc(l.url)}`), ''),
  neofetch: () => {
    const logo = [
      '    ▄▄▄▄▄▄▄▄▄    ',
      '  ██▀        ▀██  ',
      ' ██   ▄▄▄▄▄▄   ██ ',
      ' ██  ██    ██  ██ ',
      ' ██   ▀▀▀▀▀▀   ██ ',
      '  ██▄        ▄██  ',
      '    ▀▀▀▀▀▀▀▀▀    '
    ];
    const info = [
      `<span class="t-user">${esc(TERM.user)}</span>@<span class="t-user">${esc(TERM.host)}</span>`,
      `──────────────────────`,
      `<span class="t-ok">OS</span>: Ubuntu 24.04 LTS (HexVoidOS) x86_64`,
      `<span class="t-ok">Host</span>: ${esc(site.name)}`,
      `<span class="t-ok">Kernel</span>: 6.8.0-45-generic`,
      `<span class="t-ok">Uptime</span>: since 2022`,
      `<span class="t-ok">Shell</span>: bash 5.2`,
      `<span class="t-ok">Theme</span>: ${getTheme() === 'light' ? 'paper-light' : 'matrix-dark'}`,
      `<span class="t-ok">Focus</span>: ${esc(site.focus || '')}`
    ];
    const rows = Math.max(logo.length, info.length);
    const lines = [];
    for (let i = 0; i < rows; i++) lines.push(`<span class="t-ok">${(logo[i] || '                 ').replace(/ /g, '&nbsp;')}</span>  ${info[i] || ''}`);
    return ok(lines, '');
  },
  theme: (args) => {
    const t = (args[0] || '').toLowerCase();
    if (t === 'light' || t === 'dark') {
      setTheme(t);
      return ok([`<span class="t-ok">主题已切换为 ${t === 'light' ? '浅色' : '暗色'} 模式</span>`], '');
    }
    return err(`当前主题: ${getTheme() === 'light' ? '浅色 light' : '暗色 dark'}（用法: theme light|dark）`);
  },
  goto: (args) => {
    const map = { home: '/', index: '/', articles: '/articles', blog: '/articles', projects: '/projects', about: '/about', me: '/about', guestbook: '/guestbook', message: '/guestbook' };
    const dest = map[(args[0] || '').toLowerCase()];
    if (!dest) return err('goto: 可以去这些页面 home | articles | projects | about | guestbook');
    location.hash = '#' + dest;
    return ok([`<span class="t-ok">正在跳转 → ${esc(dest)}</span>`], '');
  },
  help: () => {
    // 通俗版帮助：全部是免参数命令，直接输入即可
    const rows = [
      ['文件', [
        ['ls', '看看这里有什么文件'],
        ['cat', '看看文件内容'],
        ['pwd', '我在哪个目录'],
        ['ll', 'ls 的详细版（别名）']
      ]],
      ['系统', [
        ['whoami', '我是谁'],
        ['hostname', '这台机器叫什么'],
        ['uname', '系统信息'],
        ['date', '现在几点'],
        ['ifconfig', '看网卡和 IP'],
        ['history', '我敲过哪些命令']
      ]],
      ['博客', [
        ['articles', '列出全部文章'],
        ['projects', '我的开源项目'],
        ['contact', '找到我的方式'],
        ['neofetch', '这台机器的名片']
      ]],
      ['其他', [
        ['fortune', '随机来一句话'],
        ['clear', '清空屏幕'],
        ['exit', '退出登录（并不会）']
      ]]
    ];
    const lines = [
      `<span class="t-ok">${esc(PS1)} 的命令帮助</span>  —  全部命令免参数，直接输入就行`,
      ''
    ];
    for (const [cat, items] of rows) {
      lines.push(`<span class="t-dir">◆ ${cat}</span>`);
      for (const [cmd, desc] of items) lines.push(`  ${esc(cmd.padEnd(11))}<span class="t-dim">${esc(desc)}</span>`);
      lines.push('');
    }
    lines.push(`<span class="t-dim">小提示：试试 neofetch，看看这台机器的名片</span>`);
    return ok(lines, '');
  }
};
/* 常用别名 */
commands.ll = (args, stdin) => commands.ls(['-la', ...args], stdin);
commands.la = (args, stdin) => commands.ls(['-a', ...args], stdin);
commands.l = (args, stdin) => commands.ls(args, stdin);

/* ---------- 执行器（含管道） ---------- */
const tokenize = (seg) => (seg.match(/"[^"]*"|'[^']*'|\S+/g) || []).map(t => t.replace(/^["']|["']$/g, ''));
const execLine = (input) => {
  // 编码绕过空格过滤：$IFS / %20 / \x20 / \u0020 都当作空格
  // （真实 Linux 里禁空格后的经典绕过手法，比连写 catflag.txt 更有难度）
  const decoded = input
    .replace(/\$IFS/gi, ' ')
    .replace(/%20/gi, ' ')
    .replace(/\\x20/gi, ' ')
    .replace(/\\u0020/gi, ' ');
  const segments = decoded.split('|').map(s => s.trim()).filter(Boolean);
  // 彩蛋：rm -rf / —— 空格已被过滤，必须用 $IFS / %20 等编码绕过才触发
  // （直接敲 sudo rm -rf / 会被空格过滤成 sudorm-rf/，走 command not found）
  if (/^(sudo\s+)?rm\s+-rf\s+\/\*?$/.test(decoded.trim())) {
    return ok([
      `<span class="t-err">[ALERT] 检测到 rm -rf / ，正在评估威胁等级…</span>`,
      `正在删除 /home/${esc(TERM.user)}/flag.txt …… <span class="t-ok">已拒绝（镇站之宝）</span>`,
      `正在删除 /home/${esc(TERM.user)}/secrets.txt …… <span class="t-ok">已拒绝（反正里面也没东西）</span>`,
      `<span class="t-ok">开个玩笑 :) 这台机器以只读方式挂载，删不掉的。好奇心 +1</span>`
    ], '');
  }
  let carry = { text: '', code: 0 }, result = { lines: [], text: '', code: 0 };
  for (let i = 0; i < segments.length; i++) {
    const tokens = tokenize(segments[i]);
    if (!tokens.length) continue;
    const cmd = commands[tokens[0]];
    if (!cmd) {
      result = { lines: [
        `<span class="t-err">zsh: command not found: ${esc(tokens[0])}</span>`,
        `<span class="t-dim">提示： 已被安全策略过滤，试试其他方法</span>`
      ], text: '', code: 127 };
      break;
    }
    result = cmd(tokens.slice(1), carry.text);
    carry = { text: result.text || '', code: result.code || 0 };
    if (result.clear) return { clear: true };
  }
  return result;
};

/* ---------- 终端 UI ---------- */
const termLine = (html, cls = '') => `<div class="term-line${cls ? ' ' + cls : ''}">${html || '&nbsp;'}</div>`;
const scrollTerm = () => {
  const body = document.querySelector('.term-body');
  if (body) body.scrollTop = body.scrollHeight;
};
const syncPrompt = () => {
  const row = document.querySelector('.term-input-row .t-prompt');
  if (row) row.innerHTML = promptHtml();
  const title = document.querySelector('.term-title');
  if (title) title.textContent = `${PS1}: ${cwdLabel()}`;
};

const runCommand = (raw) => {
  const body = document.querySelector('.term-body');
  if (!body) return;
  // 输入行永远固定在底部：回显与输出都插到它前面，命令一行行往下滚
  const inputRow = body.querySelector('.term-input-row');
  const echo = (html) => inputRow
    ? inputRow.insertAdjacentHTML('beforebegin', html)
    : body.insertAdjacentHTML('beforeend', html);
  echo(`<div class="term-line"><span class="t-prompt">${promptHtml()}</span><span class="term-cmd">${esc(raw)}</span></div>`);
  // 安全策略：剔除所有空白字符（防止粘贴绕过空格限制构造参数）
  const input = String(raw).replace(/\s+/g, '');
  if (input) {
    termState.history.push(input);
    const r = execLine(input);
    if (r.clear) {
      body.querySelectorAll('.term-line:not(.term-input-row)').forEach(l => l.remove());
    } else if (r.lines && r.lines.length) {
      echo(r.lines.map(l => termLine(l, 'term-out')).join(''));
    }
  }
  termState.histIdx = termState.history.length;
  syncPrompt();
  scrollTerm();
};

const bootLines = () => {
  const now = new Date().toLocaleString('zh-CN', { hour12: false });
  return [
    `Ubuntu 24.04 LTS ${TERM.host} tty1`,
    ``,
    `<span class="t-dim">Last login: ${esc(now)} from 127.0.0.1</span>`,
    ``,
    `Welcome to <span class="t-ok">${esc(TERM.host)}</span> (Ubuntu 24.04 LTS, kernel 6.8.0-45-generic)`,
    ``,
    ` * Blog:    ${esc(site.name)} 的网络安全博客`,
    ` * Posts:   ${site.articles.length} 篇原创文章 · ${site.projects.length} 个开源项目`,
    ` * Focus:   ${esc((site.interests || []).join(' / '))}`,
    ` * Help:    <span class="t-dir">help</span>      查看全部命令`,
    ` * Tips:    Tab 补全命令 · ↑↓ 翻历史 · <span class="t-dir">fortune</span> 来一句话`,
    ``,
    `> 这台机器上藏着一点小秘密，用 cat 读一读桌面上的文件，也许能发现什么。`,
    ``
  ];
};

const mountTermInput = () => {
  const body = document.querySelector('.term-body');
  if (!body || body.querySelector('.term-input-row')) return;
  body.insertAdjacentHTML('beforeend', `
    <div class="term-line term-input-row">
      <span class="t-prompt">${promptHtml()}</span>
      <input class="term-input" type="text" spellcheck="false" autocomplete="off" maxlength="40" aria-label="终端命令输入" placeholder="">
    </div>`);
  const input = body.querySelector('.term-input');
  const term = body.closest('.terminal');
  term.addEventListener('click', (e) => {
    if (!getSelection().toString()) input.focus();
  });
  // 命令补全：只补命令名（输入已禁空格，无参数）
  const complete = (value) => {
    const prefix = value.toLowerCase();
    return Object.keys(commands).filter(c => c.startsWith(prefix));
  };
  input.addEventListener('keydown', (e) => {
    // 安全策略：禁用空格与所有空白键，输入只能是连续的单个命令词
    if (e.key === ' ' || e.key === 'Tab' && !input.value || /^Space$/.test(e.code)) {
      e.preventDefault();
      return;
    }
    if (e.key === 'Enter') {
      runCommand(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (termState.histIdx > 0) input.value = termState.history[--termState.histIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (termState.histIdx < termState.history.length) input.value = termState.history[++termState.histIdx] || '';
      else { termState.histIdx = termState.history.length; input.value = ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = complete(input.value);
      if (!matches || !matches.length) return;
      if (matches.length === 1) {
        input.value = matches[0];
      } else {
        const row = input.closest('.term-input-row');
        const echoAbove = (html) => row
          ? row.insertAdjacentHTML('beforebegin', html)
          : body.insertAdjacentHTML('beforeend', html);
        runCommand(input.value);
        echoAbove(termLine(esc(matches.join('  ')), 'term-out'));
        scrollTerm();
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      body.querySelectorAll('.term-line:not(.term-input-row)').forEach(l => l.remove());
    } else if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      const row = input.closest('.term-input-row');
      const echoAbove = (html) => row
        ? row.insertAdjacentHTML('beforebegin', html)
        : body.insertAdjacentHTML('beforeend', html);
      echoAbove(`<div class="term-line"><span class="t-prompt">${promptHtml()}</span><span class="term-cmd">${esc(input.value)}</span><span class="t-dim">^C</span></div>`);
      input.value = '';
      termState.histIdx = termState.history.length;
      scrollTerm();
    }
  });
  // 防粘贴绕过：粘贴内容里的空白直接去掉
  input.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text') || '';
    input.value = (input.value + text).replace(/\s+/g, '').slice(0, 40);
  });
  // 兜底：任何原因导致 value 出现空白（如输入法），立即清掉
  input.addEventListener('input', () => {
    if (/\s/.test(input.value)) input.value = input.value.replace(/\s+/g, '');
  });
};

const initTerminal = () => {
  const body = document.querySelector('.term-body');
  if (!body) return;
  body.innerHTML = '';
  const lines = bootLines();
  if (termState.booted || reducedMotion()) {
    body.insertAdjacentHTML('beforeend', lines.map(l => termLine(l, 'term-out')).join(''));
    mountTermInput();
    return;
  }
  lines.forEach((l, i) => {
    setTimeout(() => {
      body.insertAdjacentHTML('beforeend', termLine(l, 'term-out'));
      scrollTerm();
      if (i === lines.length - 1) {
        termState.booted = true;
        mountTermInput();
        scrollTerm();   // 输入行挂载后再滚一次，保证视图沉底
      }
    }, 60 + i * 80);
  });
};

/* ============================================================
   滚动显现 & 数字滚动
   ============================================================ */
const observeReveal = (root = document) => {
  const els = root.querySelectorAll('.reveal:not(.visible)');
  if (!('IntersectionObserver' in window) || reducedMotion()) {
    els.forEach(e => e.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: .06, rootMargin: '0px 0px -36px 0px' });
  els.forEach(e => io.observe(e));
};

const countUp = (el) => {
  const raw = el.dataset.value || '';
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match || reducedMotion()) { el.textContent = raw; return; }
  const target = Number(match[1]);
  const suffix = match[2];
  const t0 = performance.now(), dur = 900;
  const step = (t) => {
    const p = Math.min((t - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

/* ============================================================
   页面模板
   ============================================================ */
const nav = [
  ['首页', '#/'], ['文章', '#/articles'], ['项目', '#/projects'], ['关于', '#/about'], ['留言', '#/guestbook']
];

const renderShell = (page, activePath) => {
  // 右上角品牌链接：只保留 GitHub
  const brandLinks = site.links.filter(x => x.icon === 'github');
  const brandLogo = `<span class="brand-mark">${svg('terminal')}</span><span class="brand-name">${escapeHtml(site.name)}</span>`;
  return `
  <canvas class="bg-canvas" aria-hidden="true"></canvas>
  <div class="bg-glow" aria-hidden="true"></div>
  <div class="scroll-progress" aria-hidden="true"></div>

  <div class="site-shell">
    <header class="site-header wrap">
      <a class="brand" href="#/" aria-label="返回首页">${brandLogo}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="打开菜单"><span></span><span></span></button>
      <nav class="main-nav" id="main-nav" aria-label="主导航">
        ${nav.map(([label, url]) => `<a href="${url}" class="${url === '#' + activePath ? 'active' : ''}">${label}</a>`).join('')}
        <span class="nav-actions">
          <button class="theme-toggle" type="button" aria-label="切换主题">${svg(getTheme() === 'light' ? 'moon' : 'sun')}</button>
          ${brandLinks.map(x => link(x, svg(x.icon), 'nav-github')).join('')}
        </span>
      </nav>
    </header>

    <main class="wrap" id="page">${page}</main>

    <footer class="site-footer wrap">
      <div class="footer-brand">
        <span class="brand">${brandLogo}</span>
        <span>${escapeHtml(site.footerNote)}</span>
      </div>
      <nav aria-label="页脚导航">${nav.map(([label, url]) => `<a href="${url}">${label}</a>`).join('')}<a href="./rss.xml" target="_blank" rel="noopener" title="RSS 订阅源">RSS</a></nav>
      <p><span class="footer-status">SYSTEM STATUS: <b>ONLINE</b></span><br>© ${escapeHtml(site.copyrightYear)} ${escapeHtml(site.name)} · Open source, always.</p>
    </footer>
  </div>

  <div class="reader" role="dialog" aria-modal="true" aria-label="文章阅读">
    <div class="reader-backdrop"></div>
    <div class="reader-panel">
      <header class="reader-header">
        <div class="reader-heading">
          <h3 class="reader-title"></h3>
          <div class="reader-meta"></div>
        </div>
        <button class="reader-close" type="button" aria-label="关闭阅读">${svg('close')}</button>
      </header>
      <div class="reader-body"></div>
      <footer class="reader-footer"><span>// END OF DOCUMENT</span></footer>
    </div>
  </div>

  <div class="lightbox" role="dialog" aria-modal="true" aria-label="查看大图">
    <button class="lightbox-close" type="button" aria-label="关闭大图">${svg('close')}</button>
    <figure>
      <img class="lightbox-img" alt="">
      <figcaption class="lightbox-caption"></figcaption>
    </figure>
  </div>

  <button class="back-top" type="button" aria-label="返回顶部">${svg('arrowUp')}</button>`;
};

/* ---------- 首页 ---------- */
const pageHome = () => {
  // 布局：左侧小头像 + 头像下方社交图标；右侧昵称/简介；终端在最下方
  const entries = [
    { href: '#/articles', icon: 'book', title: '文章', desc: `全部原创研究与实战复盘（${site.articles.length} 篇）` },
    { href: '#/projects', icon: 'layers', title: '项目', desc: `正在做的工具与造物（${site.projects.length} 个）` },
    { href: '#/about', icon: 'shield', title: '关于我', desc: '研究方向、装备与成长时间线' },
    { href: '#/guestbook', icon: 'message', title: '留言板', desc: '路过留个言，或交换友链' }
  ];
  return `
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-info reveal">
      <div class="hero-portrait-frame">
        <img class="hero-portrait" src="${escapeHtml(site.portrait)}" alt="${escapeHtml(site.name)} 的形象" />
      </div>
      <h1 id="hero-title" class="glitch" data-text="${escapeHtml(site.name)}">${escapeHtml(site.name)}</h1>
      <p class="handle">${escapeHtml(site.handle)} <span class="handle-sep">/</span> ${escapeHtml(site.role)}</p>
      <p class="bio">${escapeHtml(site.bio)}</p>
    </div>
    <div class="hero-main reveal">
      <div class="terminal" aria-hidden="true">
        <div class="term-bar"><span class="term-dot term-dot-r"></span><span class="term-dot term-dot-y"></span><span class="term-dot term-dot-g"></span><span class="term-title">${escapeHtml(PS1)}: ~</span></div>
        <div class="term-body"></div>
      </div>
    </div>
  </section>

  ${site.stats && site.stats.length ? `
  <div class="stats-bar reveal" role="list">
    ${site.stats.map(s => `<div class="stat" role="listitem"><span class="stat-value" data-value="${escapeHtml(s.value)}">${escapeHtml(s.value)}</span><span class="stat-label">${escapeHtml(s.label)}</span></div>`).join('')}
  </div>` : ''}

  <section class="home-entries" aria-label="快速入口">
    ${entries.map((e, i) => `
    <a class="home-entry reveal" href="${e.href}" style="transition-delay:${i * 70}ms">
      <span class="home-entry-icon">${svg(e.icon)}</span>
      <span class="home-entry-copy">
        <strong>${escapeHtml(e.title)} ${svg('arrow', 'entry-arrow')}</strong>
        <small>${escapeHtml(e.desc)}</small>
      </span>
    </a>`).join('')}
  </section>

  ${site.quote ? `<blockquote class="closing-quote reveal"><p>「${escapeHtml(site.quote)}」</p><cite>— ${escapeHtml(site.name)}</cite></blockquote>` : ''}`;
};

/* ---------- 文章页 ---------- */
const categories = ['全部', ...new Set(site.articles.map(a => a.category).filter(Boolean))];
const allTags = [...new Set(site.articles.flatMap(a => a.tags || []))];
const postState = { cat: '全部', q: '', tag: '' };
const renderPostList = () => {
  const listEl = document.querySelector('#article-list');
  const countEl = document.querySelector('#article-count');
  if (!listEl) return;
  let items = site.articles.map((a, i) => ({ a, i }));
  if (postState.cat !== '全部') items = items.filter(({ a }) => a.category === postState.cat);
  if (postState.tag) items = items.filter(({ a }) => (a.tags || []).includes(postState.tag));
  if (postState.q.trim()) {
    const q = postState.q.trim().toLowerCase();
    items = items.filter(({ a }) => [a.title, a.summary, a.category, ...(a.tags || [])].join(' ').toLowerCase().includes(q));
  }
  countEl.textContent = items.length ? `共 ${items.length} 篇` : '';
  listEl.innerHTML = items.length
    ? items.map(({ a, i }) => articleRow(a, i)).join('')
    : `<div class="article-empty">${svg('search', 'empty-icon')}<p>没有找到匹配的文章，换个关键词试试。</p></div>`;
  const rows = [...listEl.querySelectorAll('.article-row')];
  rows.forEach((el, n) => { el.style.transitionDelay = `${Math.min(n * 55, 330)}ms`; });
  requestAnimationFrame(() => requestAnimationFrame(() => rows.forEach(el => el.classList.add('visible'))));
  bindArticleRows(listEl);
};
const pagePosts = () => `
  <section class="page-section articles-page" aria-labelledby="articles-title">
    <div class="section-heading">
      <span class="section-number">WRITING / 全部文章</span>
      <h2 id="articles-title">文章</h2>
      ${allTags.length ? `
      <div class="post-tags-side" aria-label="按标签筛选">
        <span class="tags-side-title">TAGS</span>
        ${allTags.map(t => `<button class="side-tag" type="button" data-tag="${escapeHtml(t)}">#${escapeHtml(t)}<em>${site.articles.filter(a => (a.tags || []).includes(t)).length}</em></button>`).join('')}
      </div>` : ''}
    </div>
    <div class="section-body writing-body">
      <div class="article-toolbar reveal">
        <div class="article-tabs" role="tablist" aria-label="文章分类">
          ${categories.map(c => `<button class="tab${c === postState.cat ? ' is-active' : ''}" type="button" role="tab" aria-selected="${c === postState.cat}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('')}
        </div>
        <div class="toolbar-right">
          <span id="article-count"></span>
          <label class="article-search">${svg('search')}<input type="search" placeholder="搜索文章 / 标签…" aria-label="搜索文章"></label>
        </div>
      </div>
      <div class="article-list" id="article-list"></div>
    </div>
  </section>

  ${site.quote ? `<blockquote class="closing-quote reveal"><p>「${escapeHtml(site.quote)}」</p><cite>— ${escapeHtml(site.name)}</cite></blockquote>` : ''}`;

/* ---------- 留言板页（提交表单经 FormSubmit 转发到博主邮箱 + 友情链接） ---------- */
const pageGuestbook = () => `
  <section class="page-section" aria-labelledby="guestbook-title">
    <div class="section-heading"><span class="section-number">GUESTBOOK / 留言板</span><h2 id="guestbook-title">留言板</h2></div>
    <div class="section-body">
      <form class="gb-form reveal" id="gb-form" autocomplete="off" novalidate>
        <input type="text" name="_honey" class="gb-honey" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="gb-field">
          <label for="gb-name">昵称</label>
          <input id="gb-name" name="name" type="text" maxlength="16" placeholder="怎么称呼你？" required>
        </div>
        <div class="gb-field">
          <label for="gb-contact">联系方式</label>
          <input id="gb-contact" name="contact" type="text" maxlength="60" placeholder="QQ / 微信 / 邮箱，方便我回复你（选填）">
        </div>
        <div class="gb-field">
          <label for="gb-text">留言</label>
          <textarea id="gb-text" name="message" maxlength="300" rows="3" placeholder="写点什么…（最多 300 字）" required></textarea>
        </div>
        <button class="gb-submit" type="submit">${svg('arrow')} 发给博主</button>
      </form>
    </div>
  </section>

  ${(site.friends && site.friends.length) ? `
  <section class="page-section" aria-labelledby="friends-title">
    <div class="section-heading"><span class="section-number">FRIENDS / 友情链接</span><h2 id="friends-title">朋友们</h2></div>
    <div class="section-body">
      <div class="friends-grid">
        ${site.friends.map(f => f.url
          ? `<a class="friend-card reveal" href="${escapeHtml(safeUrl(f.url))}"${external(f.url)}>
              <strong>${escapeHtml(f.name)}</strong>
              <small>${escapeHtml(f.desc || '')}</small>
              <span class="friend-link-icon">${svg('link')}</span>
            </a>`
          : `<div class="friend-card friend-card-empty reveal">
              <strong>${escapeHtml(f.name)}</strong>
              <small>${escapeHtml(f.desc || '')}</small>
            </div>`).join('')}
      </div>
      <p class="gb-note">想交换友链？在留言板吱一声，或在 GitHub 找到我。</p>
    </div>
  </section>` : ''}

  ${site.quote ? `<blockquote class="closing-quote reveal"><p>「${escapeHtml(site.quote)}」</p><cite>— ${escapeHtml(site.name)}</cite></blockquote>` : ''}`;


const pageProjects = () => `
  <section class="page-section" aria-labelledby="projects-title">
    <div class="section-heading"><span class="section-number">PROJECTS / 开源造物</span><h2 id="projects-title">项目</h2></div>
    <div class="section-body">
      <div class="project-grid">
        ${site.projects.map((p, i) => `<article class="project-card reveal" style="transition-delay:${i * 80}ms">
          <div class="project-card-top">
            <div class="project-icon">${svg(p.icon)}</div>
            ${p.year ? `<span class="project-year">${escapeHtml(p.year)}</span>` : ''}
          </div>
          <h3>${escapeHtml(p.name)}</h3>
          <p class="project-desc">${escapeHtml(p.description)}</p>
          <p class="project-detail">${escapeHtml(p.detail)}</p>
          <div class="project-meta">${(p.tags || []).map(t => `<span>#${escapeHtml(t)}</span>`).join('')}</div>
          ${link(p, `查看项目 ${svg('arrow')}`, 'text-link')}
        </article>`).join('')}
      </div>
    </div>
  </section>

  ${site.quote ? `<blockquote class="closing-quote reveal"><p>「${escapeHtml(site.quote)}」</p><cite>— ${escapeHtml(site.name)}</cite></blockquote>` : ''}`;

/* ---------- 关于页（成长历史） ---------- */
const pageAbout = () => `
  <section class="page-section" aria-labelledby="about-title">
    <div class="section-heading"><span class="section-number">ABOUT / 关于我</span><h2 id="about-title">关于我</h2></div>
    <div class="section-body about-copy reveal">
      ${site.about.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
    </div>
  </section>

  ${site.timeline && site.timeline.length ? `
  <section class="page-section" aria-labelledby="timeline-title">
    <div class="section-heading"><span class="section-number">HISTORY / 成长历史</span><h2 id="timeline-title">成长时间线</h2></div>
    <div class="section-body">
      <div class="timeline">
        ${site.timeline.map((t, i) => `<div class="timeline-item reveal" style="transition-delay:${Math.min(i * 90, 400)}ms">
          <div class="timeline-node"><span class="timeline-year">${escapeHtml(t.year)}</span><span class="timeline-dot"></span></div>
          <div class="timeline-card">
            <span class="timeline-tag">${escapeHtml(t.tag)}</span>
            <h3>${escapeHtml(t.title)}</h3>
            <p>${escapeHtml(t.desc)}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${site.focusAreas.length ? `<div class="strip strip-page"><span>研究方向</span><ul>${site.focusAreas.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></div>` : ''}
  ${site.toolkit && site.toolkit.length ? `<div class="strip strip-page strip-secondary"><span>常用装备</span><ul>${site.toolkit.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></div>` : ''}
  <blockquote class="closing-quote reveal"><p>「${escapeHtml(site.quote)}」</p><cite>— ${escapeHtml(site.name)}</cite></blockquote>`;

/* ---------- 404 页面 ---------- */
const pageNotFound = (path) => `
  <section class="page-section" aria-labelledby="nf-title">
    <div class="section-heading"><span class="section-number">ERROR / 404</span><h2 id="nf-title">页面未找到</h2></div>
    <div class="section-body">
      <div class="terminal nf-terminal" aria-hidden="true">
        <div class="term-bar"><span class="term-dot term-dot-r"></span><span class="term-dot term-dot-y"></span><span class="term-dot term-dot-g"></span><span class="term-title">${escapeHtml(PS1)}: ~</span></div>
        <div class="term-body">
          <div class="term-line"><span class="t-prompt"><span class="t-user">${esc(PS1)}</span><span class="t-psep">:</span><span class="t-path">~</span><span class="t-psep">$</span></span><span class="term-cmd">cd ${esc(path)}</span></div>
          <div class="term-line term-out"><span class="t-err">cd: no such file or directory: ${esc(path)}</span></div>
          <div class="term-line"><span class="t-prompt"><span class="t-user">${esc(PS1)}</span><span class="t-psep">:</span><span class="t-path">~</span><span class="t-psep">$</span></span><span class="term-cmd">ls</span></div>
          <div class="term-line term-out"><span class="t-dir">home</span>  articles  projects  about  guestbook</div>
          <div class="term-line"><span class="t-prompt"><span class="t-user">${esc(PS1)}</span><span class="t-psep">:</span><span class="t-path">~</span><span class="t-psep">$</span></span><span class="t-dim">█</span></div>
        </div>
      </div>
      <p class="nf-hint">路径 <code>${esc(path)}</code> 不存在。去 <a href="#/">首页</a> 或 <a href="#/articles">文章列表</a> 看看。</p>
    </div>
  </section>`;

/* ============================================================
   路由
   ============================================================ */
const currentPath = () => (location.hash.replace(/^#/, '') || '/').split('?')[0];
const routes = {
  '/': { render: pageHome, bind: bindHome },
  '/articles': { render: pagePosts, bind: bindPosts },
  '/projects': { render: pageProjects, bind: bindCommon },
  '/guestbook': { render: pageGuestbook, bind: bindGuestbook },
  '/about': { render: pageAbout, bind: bindCommon }
};

function bindCommon() { observeReveal(); }
function bindHome() {
  observeReveal();
  initTerminal();
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar && !reducedMotion()) {
    const statsIO = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.stat-value').forEach(countUp);
          statsIO.unobserve(e.target);
        }
      });
    }, { threshold: .4 });
    statsIO.observe(statsBar);
  }
}
/* 轻量弹窗提示（右上角滑入，3 秒自动消失） */
const showToast = (msg, type = 'ok') => {
  let el = document.querySelector('.gb-toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'gb-toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.toggle('error', type === 'error');
  el.classList.remove('show');
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 3200);
};

function bindGuestbook() {
  observeReveal();
  const form = document.querySelector('#gb-form');
  if (!form) return;
  let lastSent = 0;
  // 纯前端无法直接发邮件：表单经 AJAX 提交到 FormSubmit，由其转发到博主邮箱。
  // 成功/失败都不跳转页面，只弹窗提示。
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]');
    const contact = form.querySelector('[name="contact"]');
    const message = form.querySelector('[name="message"]');
    const honey = form.querySelector('[name="_honey"]');
    // 蜜罐被填：判定为机器人，静默丢弃
    if (honey && honey.value) return;
    if (!(name.value || '').trim() || !(message.value || '').trim()) {
      showToast('昵称和留言不能为空', 'error');
      name.focus();
      return;
    }
    // 客户端限频：10 秒内只能发一条
    if (Date.now() - lastSent < 10000) {
      showToast('发送太快啦，稍等 10 秒再试', 'error');
      return;
    }
    const btn = form.querySelector('.gb-submit');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = '发送中…';
    const payload = {
      _subject: `来自博客留言板的新留言（${name.value.trim().slice(0, 16)}）`,
      _template: 'table',
      _captcha: 'false',
      _blacklist: 'viagra,casino,bitcoin giveaways,free money,seo services',
      name: name.value.trim().slice(0, 16),
      contact: (contact.value || '').trim().slice(0, 60),
      message: message.value.trim().slice(0, 300)
    };
    fetch('https://formsubmit.co/ajax/TY_security@163.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.success) {
          form.reset();
          showToast('✓ 已发送至博主邮箱，我会尽快回复你');
        } else {
          showToast('发送失败：' + ((data && data.message) || '请稍后再试'), 'error');
        }
      })
      .catch(() => showToast('网络异常，发送失败，请稍后再试', 'error'))
      .finally(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        lastSent = Date.now();
      });
  });
}
function bindPosts() {
  observeReveal();
  renderPostList();
  document.querySelectorAll('.article-tabs .tab').forEach(btn => {
    btn.addEventListener('click', () => {
      postState.cat = btn.dataset.cat;
      document.querySelectorAll('.article-tabs .tab').forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      renderPostList();
    });
  });
  // 左侧标签栏：点击筛选 / 再点取消
  document.querySelectorAll('.post-tags-side .side-tag').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      postState.tag = postState.tag === tag ? '' : tag;
      document.querySelectorAll('.post-tags-side .side-tag').forEach(b => {
        b.classList.toggle('is-active', b.dataset.tag === postState.tag);
      });
      renderPostList();
    });
  });
  const searchInput = document.querySelector('.article-search input');
  if (searchInput) searchInput.addEventListener('input', () => { postState.q = searchInput.value; renderPostList(); });
}

const render = () => {
  const path = currentPath();
  const route = routes[path];
  document.querySelector('#app').innerHTML = renderShell(route ? route.render() : pageNotFound(path), path);
  scrollTo({ top: 0, behavior: 'instant' });
  setDocMeta(routeTitle(path), site.bio);
  (route ? route.bind : bindCommon)();
  bindGlobalUi();
};
const routeTitle = (path) => {
  const names = { '/': '首页', '/articles': '文章', '/projects': '项目', '/guestbook': '留言板', '/about': '关于' };
  return `${names[path] || '页面未找到'} · ${site.name} · 网络安全博客`;
};

const bindGlobalUi = () => {
  // 主题切换
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
  // 阅读弹窗
  document.querySelector('.reader-close').addEventListener('click', closeReader);
  document.querySelector('.reader-backdrop').addEventListener('click', closeReader);
  // 弹窗内容区事件委托：代码复制 + 图片灯箱
  const readerBody = document.querySelector('.reader-body');
  readerBody.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.md-copy');
    if (copyBtn) { copyCode(copyBtn); return; }
    const img = e.target.closest('img');
    if (img) openLightbox(img);
  });
  // 图片灯箱：点击任意处关闭
  document.querySelector('.lightbox').addEventListener('click', closeLightbox);
  // 移动端菜单
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  }));
  // 滚动 UI
  const bar = document.querySelector('.scroll-progress');
  const top = document.querySelector('.back-top');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    if (top) top.classList.toggle('is-show', scrollY > 600);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' }));
};

/* ============================================================
   启动
   ============================================================ */
document.title = `${site.name} · 网络安全博客`;
setTheme(getTheme(), false);
initBgCanvas();
/* 访客计数（Abacus JSON 接口）：全站真实访客数，跨浏览器/设备累计。
   每个浏览器会话只计 1 次（hit），会话内刷新走只读接口（get），避免数字虚高。
   接口失败时保持隐藏，不影响页面；想清零就换 key 的值 */
const visitorBadge = document.createElement('span');
visitorBadge.className = 'visitor-badge';
visitorBadge.style.display = 'none';
visitorBadge.append('你是第 ');
const visitorNum = document.createElement('b');
visitorNum.className = 'visitor-num';
visitorNum.textContent = '1';
visitorBadge.append(visitorNum, ' 位访客');
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (lightboxIsOpen()) { closeLightbox(); return; }
  if (document.querySelector('.reader')?.classList.contains('is-open')) closeReader();
});
addEventListener('hashchange', render);
render();
// 访客徽章挂在头部导航栏正中央（header 由 render() 生成，须在其后挂载）
document.querySelector('.site-header').appendChild(visitorBadge);
{
  const base = 'https://abacus.jasoncameron.dev';
  const key = 'n0ther3-blog/visitor';
  const counted = sessionStorage.getItem('visitor-counted') === '1';
  fetch(`${base}/${counted ? 'get' : 'hit'}/${key}`)
    .then(r => r.json())
    .then(j => {
      if (typeof j.value === 'number') {
        visitorNum.textContent = j.value;
        visitorBadge.style.display = '';
        if (!counted) sessionStorage.setItem('visitor-counted', '1');
      }
    })
    .catch(() => {});
}
