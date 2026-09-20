// ============================================================
// 站点配置 —— 修改这里就能把示例博客换成你自己的内容。
// 留空的项目会自动隐藏。
// 文章不用写在这个文件里：往 src/articles/ 文件夹丢 .md 文件即可，
// 写作模板见 src/articles/_TEMPLATE.md。
// ============================================================
export const site = {
  name: '汤圆_N0tHer3',
  // 终端身份（虚拟 Ubuntu，主机名与昵称统一为 N0tHer3）
  terminal: { user: 'tangyuan', host: 'N0tHer3' },
  accentColor: '#c9e894',
  handle: '@n0ther3',
  role: '漏洞挖掘 · 渗透测试 · 安全开发',
  bio: '游走在安全、系统与人性的交叉地带。这里记录我的攻防实践、漏洞研究、项目造物与持续学习的全过程。',
  portrait: '/assets/TY.png',
  focus: '正在探索 AI 与安全自动化的结合，同时准备企业 SRC 的进阶打法。',

  // 终端 interests.txt 内容（cat interests.txt 可见）
  interests: ['Web渗透', '内网攻防', '代码审计', 'AI安全'],

  about: [
    '我是汤圆_N0tHer3，EduSRC 平台「网络安全专家」，持有 CNVD、上海交通大学、南开大学等多份漏洞报送证书，多次参与省市级攻防演练，也曾面向企业开展攻防演练培训。目前正在以 AI Coding 的方式开发智能漏洞扫描平台、CTF-Agent 等项目，欢迎通过留言板或者github找我交流。'
  ],

  // 数据统计条（Hero 下方）—— 建议只放真实数据
  stats: [
    { value: '1', label: '原创文章' },
    { value: '1', label: '开源项目' },
    { value: '4', label: '研究方向' },
    { value: '2024', label: '入坑至今' }
  ],

  focusAreas: ['Web 安全', '漏洞挖掘', 'CTF', 'AI 安全'],

  toolkit: ['Burp Suite', 'Nmap', 'Wireshark', 'Ghidra', 'Metasploit', 'sqlmap', 'Frida', 'Docker'],

  links: [
    { label: 'GitHub', url: 'https://github.com/N0tHer3', icon: 'github' },
    { label: 'EduSRC', url: 'https://src.sjtu.edu.cn/profile/36125/', icon: 'edusrc' }
  ],

  // 友情链接（留言板页展示）
  friends: [
    { name: '先占个位', url: '', desc: '欢迎交换友链，留言板联系我' }
  ],

  // 成长历史（关于页时间线，按时间倒序）
  timeline: [
    {
      year: '2026',
      tag: '现在',
      title: 'AI Coding 开发',
      desc: '8 月找了一份 AI 应用开发的兼职工作，正式变成「AI 小子」。求职时发现很多岗位都看重项目与实战经验，于是用 AI Coding 开发了这个博客——找工作时可以直接发给 HR，让技术栈和实战产出一目了然。不得不感慨 AI 强大的落地价值，它正在成为我手里新的工具，也是新的研究方向。'
    },
    {
      year: '2026',
      tag: '里程碑',
      title: '平台最高称号「网络安全专家」',
      desc: '专升本结束后顺手复盘去年挖过的厂商，又打出三四个 0day；5 月拿下一千分，登上平台最高称号「网络安全专家」，众测与项目收入过万。随后受邀再战省级攻防演练，个人三万多分（有点运气成分），团队拿下第一名。一路走来很感谢 EduSRC 陪我度过这一年。'
    },
    {
      year: '2026',
      tag: '转折',
      title: '专升本上岸',
      desc: '为了备考从 12 月起停挖半年，4 月考完，成绩理想，升入一所不错的本科院校。'
    },
    {
      year: '2025',
      tag: '实战',
      title: '从弱口令到核心白帽子',
      desc: '报了猎洞时刻的课程班，加入猎洞 EduSRC 团队。起步非常艰难，一直只能挖弱口令，不懂就群里问。暑假入职企业实习，白天上班、晚上挖洞，接连拿下多个通杀升到高级白帽子，又用三个月打上核心白帽子。实习期间还受平台邀请参加省级攻防演练，当时有点菜只拿下两千多分。'
    },
    {
      year: '2025',
      tag: '赛场',
      title: '集训队与领奖台',
      desc: '成功加入信息安全集训队，主攻 Web 与 Misc——最喜欢那种找到绕过、拿到 flag 的感觉。拿下校 CTF 第一名、福建省职业院校技能大赛信息安全赛项二等奖、国家奖学金等，在学长带领下拿了三个 ISCC 不同赛项的国一，还有长城杯初赛二等奖等等'
    },
    {
      year: '2024',
      tag: '入坑',
      title: '一次 F12 打开的新世界',
      desc: '在校 CTF 网络安全大赛上第一次接触这个行业：拿到一个网页，按 F12 就有 flag。后来听集训队的同学讲学长的各种骚操作，萌生了加入队伍的念头，从此刷靶场、读优秀 WP，日复一日地练。'
    },
    {
      year: '2023',
      tag: '起点',
      title: 'Python 爬虫与建站日常',
      desc: '大一，沉迷 Python，写各种爬虫脚本；之后学软件开发、做网站，跟着企业和老师做项目、参加各类比赛——那时候离「安全」还差一次偶遇。'
    }
  ],

  projects: [
    {
      name: 'N0tHer3-blog',
      year: '2026',
      tags: ['JavaScript', 'Vite'],
      description: '你正在看的这个博客：Vite 构建的单页应用，终端风格 UI，文章即 Markdown 文件。',
      detail: 'Hash 路由、构建期 RSS/Sitemap、内嵌仿真终端——把静态博客写出终端的味道。',
      url: 'https://github.com/N0tHer3/n0ther3.github.io',
      icon: 'terminal'
    }
  ],

  quote: '好奇心不灭，攻防不止。',
  footerNote: 'Build · Learn · Share.',
  copyrightYear: '2026',

  // 文章列表由下方从 src/articles/*.md 自动加载，无需手动维护
  articles: []
};

/* ============================================================
   文章加载：src/articles/*.md
   - front-matter 支持：title / date / category / tags / summary / link
   - link 有值时为外链文章（点击跳转），否则正文在站内阅读
   - 下划线 _ 开头的文件（如写作模板）会被忽略
   ============================================================ */
const mdFiles = import.meta.glob('./articles/*.md', { query: '?raw', import: 'default', eager: true });

const parseMeta = (raw) => {
  const text = String(raw).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const matched = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!matched) return { meta: {}, body: text };
  const meta = {};
  for (const line of matched[1].split('\n')) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let value = kv[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      // 数组写法：tags: [SSRF, 云安全]
      meta[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      meta[key] = value.replace(/^["']|["']$/g, '');
    }
  }
  return { meta, body: text.slice(matched[0].length) };
};

const articleList = Object.entries(mdFiles)
  .filter(([path]) => !path.split('/').pop().startsWith('_'))
  .map(([path, raw]) => {
    const { meta, body } = parseMeta(raw);
    const tags = Array.isArray(meta.tags)
      ? meta.tags
      : String(meta.tags || '').split(/[,，]/).map(s => s.trim()).filter(Boolean);
    const link = meta.link || meta.url || '';
    return {
      file: path.split('/').pop(),
      title: meta.title || '未命名文章',
      date: meta.date || '',
      category: meta.category || '',
      summary: meta.summary || '',
      tags,
      // 外链文章：url 有值时点击跳转外部，否则站内阅读
      url: link,
      content: link ? '' : body.trim()
    };
  })
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

site.articles = articleList;

/* ============================================================
   文章资源解析：图片放 src/articles/images/，附件（压缩包）放
   src/articles/files/，md 里写 ./images/xxx.png 或 ./files/xxx.zip
   （只按文件名匹配）。外链（http/https 开头）直接使用。
   ============================================================ */
const imageFiles = import.meta.glob('./articles/images/**/*.{png,jpg,jpeg,gif,webp,svg,avif}', { import: 'default', eager: true });
const imageMap = Object.fromEntries(
  Object.entries(imageFiles).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
);

const attachFiles = import.meta.glob('./articles/files/**/*', { query: '?url', import: 'default', eager: true });
const fileMap = Object.fromEntries(
  Object.entries(attachFiles).map(([path, url]) => [path.split('/').pop().toLowerCase(), url])
);

export const asset = (src) => {
  const s = String(src || '').trim();
  if (!s || /^(https?:)?\/\//i.test(s) || s.startsWith('data:') || s.startsWith('/')) return s;
  const name = s.split('/').pop().toLowerCase();
  return imageMap[name] || fileMap[name] || s;
};
