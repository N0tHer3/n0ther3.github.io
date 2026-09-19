import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

// 部署后改成你的站点地址（rss.xml / sitemap.xml / robots.txt 里的链接都用它）
const SITE_URL = 'https://n0ther3.github.io/hacker-blog/';

// 页面路由（与 src/main.js 的 routes 保持一致）
const PAGES = ['', '#/articles', '#/projects', '#/about', '#/guestbook'];

const escXml = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// 极简 front-matter 解析（字段与 src/data.js 一致），构建期读 src/articles 生成订阅源
const parsePosts = () => {
  const dir = path.join(root, 'src/articles');
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
      const meta = {};
      if (m) for (const line of m[1].split('\n')) {
        const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
        if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
      }
      return {
        title: meta.title || '未命名文章',
        date: meta.date || '',
        summary: meta.summary || '',
        category: meta.category || ''
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
};

// 构建结束后在 dist/ 生成 rss.xml、sitemap.xml、robots.txt
const feedPlugin = () => ({
  name: 'generate-feed',
  apply: 'build',
  closeBundle() {
    // 站点名与简介从 index.html 的 title / description 读取，保证两处同步
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    const title = (html.match(/<title>(.*?)<\/title>/) || [])[1] || '博客';
    const desc = (html.match(/<meta name="description" content="(.*?)"/) || [])[1] || '';
    const siteName = title.split('·')[0].trim();
    const posts = parsePosts();

    const items = posts.map(p => `
    <item>
      <title>${escXml(p.title)}</title>
      <link>${SITE_URL}#/articles</link>
      <guid isPermaLink="false">${SITE_URL}#${escXml(p.date)}-${escXml(p.title)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.category ? `<category>${escXml(p.category)}</category>` : ''}
      <description>${escXml(p.summary)}</description>
    </item>`).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escXml(title)}</title>
  <link>${SITE_URL}</link>
  <description>${escXml(desc)}</description>
  <language>zh-CN</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${SITE_URL}rss.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>
`;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(p => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`).join('\n')}
</urlset>
`;

    const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}sitemap.xml
`;

    fs.writeFileSync(path.join(root, 'dist/rss.xml'), rss);
    fs.writeFileSync(path.join(root, 'dist/sitemap.xml'), sitemap);
    fs.writeFileSync(path.join(root, 'dist/robots.txt'), robots);
    console.log(`  ✓ rss.xml (${posts.length} 篇文章) / sitemap.xml / robots.txt 已生成`);
  }
});

// base: './' —— 构建产物使用相对路径，
// GitHub Pages 项目站点（/仓库名/ 子路径）、Cloudflare Pages 等均可直接部署。
export default defineConfig({
  base: './',
  plugins: [feedPlugin()]
});
