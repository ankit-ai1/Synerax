/* Post-build prerender — runs after `vite build` (see package.json / vercel.json).

   For every indexable route (src/seo.ts → prerenderRoutes) it writes a static
   HTML file into dist/ that already contains:
     · the route's own <title>, description, canonical, Open Graph / Twitter
       tags and JSON-LD (breadcrumbs, FAQPage, BlogPosting, Service)
     · the page itself rendered to HTML — H1, body copy, nav and footer links
   so search engines, AI crawlers (GPTBot, ClaudeBot, PerplexityBot) and
   no-JS visitors see real content. The browser app then mounts over it.

   Output: dist/index.html (home), dist/<route>.html for the rest (served
   extension-less via `cleanUrls` in vercel.json), and dist/app-shell.html —
   the untouched SPA shell that vercel.json rewrites every other URL to.

   This step must never break a deploy: any failure is logged as a warning
   and the build carries on with whatever was written (at worst, the plain
   SPA as before). */
import { build } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const dist = join(root, 'dist')
const ssrOut = join(root, 'node_modules', '.cache', 'prerender')

const warn = (...a) => console.warn('[prerender] warning:', ...a)
const log = (...a) => console.log('[prerender]', ...a)

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;')

function headTags(seo, siteUrl) {
  const url = siteUrl + seo.path
  const card = seo.image.includes('/icons/') ? 'summary' : 'summary_large_image'
  const lines = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="Synerax Cloud Technologies" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(seo.image)}" />`,
    `<meta name="twitter:card" content="${card}" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(seo.image)}" />`,
  ]
  if (seo.jsonLd.length) {
    // same id the runtime <Seo /> replaces on navigation
    const json = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')
    lines.push(`<script type="application/ld+json" id="route-jsonld">${json}</script>`)
  }
  return lines.map(l => '  ' + l).join('\n')
}

function fillTemplate(template, head, body) {
  let html = template
  const start = html.indexOf('<!--seo:start-->')
  const end = html.indexOf('<!--seo:end-->')
  if (start !== -1 && end !== -1) {
    html = html.slice(0, start) + '<!--seo:start-->\n' + head + '\n  ' + html.slice(end)
  } else {
    warn('seo markers missing from index.html — head tags appended instead')
    html = html.replace('</head>', head + '\n</head>')
  }
  if (body) html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  return html
}

const outFile = route => route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1) + '.html')

async function main() {
  let template
  try {
    template = await readFile(join(dist, 'index.html'), 'utf8')
  } catch {
    warn('dist/index.html not found — run `vite build` first. Skipping.')
    return
  }

  // 1. The SPA fallback first, so the rewrite target exists whatever happens next.
  await writeFile(join(dist, 'app-shell.html'), template)

  // 2. Server bundle of the app — bundled whole so gsap/lenis ESM quirks
  //    never reach Node's own module loader.
  let entry
  try {
    await build({
      root,
      logLevel: 'warn',
      build: {
        ssr: 'src/entry-server.tsx',
        outDir: ssrOut,
        emptyOutDir: true,
        rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
      },
      ssr: { noExternal: true },
    })
    entry = await import(pathToFileURL(join(ssrOut, 'entry-server.mjs')).href)
  } catch (err) {
    warn('server bundle failed — pages keep the plain SPA shell.', err?.message ?? err)
    return
  }

  // 3. One file per route. React warns once per component that layout
  //    effects do nothing on the server — expected here, so keep it quiet.
  const consoleError = console.error
  console.error = (msg, ...rest) => {
    if (typeof msg === 'string' && msg.includes('useLayoutEffect does nothing on the server')) return
    consoleError(msg, ...rest)
  }
  let full = 0, headOnly = 0
  for (const route of entry.prerenderRoutes) {
    try {
      const seo = entry.getSeo(route)
      let body = ''
      try {
        body = await entry.render(route)
        full++
      } catch (err) {
        headOnly++
        warn(`${route}: render failed, writing head tags only —`, err?.message ?? err)
      }
      const file = outFile(route)
      await mkdir(dirname(file), { recursive: true })
      await writeFile(file, fillTemplate(template, headTags(seo, entry.SITE_URL), body))
    } catch (err) {
      warn(`${route}: skipped —`, err?.message ?? err)
    }
  }
  log(`${full} pages prerendered${headOnly ? `, ${headOnly} with head tags only` : ''}.`)
}

main().catch(err => warn('unexpected failure —', err?.stack ?? err))
