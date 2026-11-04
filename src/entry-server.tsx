import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { LeadProvider } from './context/LeadContext'
import App, { preloadAllRoutes } from './App'

/* Build-time renderer used only by scripts/prerender.mjs — never shipped to
   the browser. It turns each route into static HTML so crawlers, answer
   engines and no-JS visitors get the real headings, copy and links. */
export { getSeo, prerenderRoutes, SITE_URL } from './seo'

export async function render(url: string): Promise<string> {
  await preloadAllRoutes()
  return renderToString(
    <StaticRouter location={url}>
      <LeadProvider>
        <App />
      </LeadProvider>
    </StaticRouter>
  )
}
