import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/* Analytics tag in the static <head> of every page, so it is present before
   any JS runs. Set ONE of these in the Vercel project's environment
   variables (or a local .env):
     VITE_GTM_ID             = GTM-XXXXXXX  → Google Tag Manager (GA4 configured inside GTM)
     VITE_GA_MEASUREMENT_ID  = G-XXXXXXXXXX → GA4 directly via gtag.js
   With neither set, the site's own GA4 ID (below) is used. GA4's enhanced measurement counts
   the app's client-side route changes as page views by default. */
function analytics(gtmId?: string, gaId?: string): Plugin {
  return {
    name: 'synerax-analytics',
    transformIndexHtml(): HtmlTagDescriptor[] {
      if (gtmId && /^GTM-[A-Z0-9]+$/.test(gtmId)) {
        return [
          {
            tag: 'script',
            injectTo: 'head-prepend',
            children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
          },
          {
            tag: 'noscript',
            injectTo: 'body-prepend',
            children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          },
        ]
      }
      if (gaId && /^G-[A-Z0-9]+$/.test(gaId)) {
        return [
          { tag: 'script', injectTo: 'head-prepend', attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${gaId}` } },
          {
            tag: 'script',
            injectTo: 'head-prepend',
            children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
          },
        ]
      }
      return []
    },
  }
}

export default defineConfig(({ mode }) => {
  // loadEnv also picks up VITE_* variables set in the shell / on Vercel
  const env = loadEnv(mode, '.', 'VITE_')
  return {
    // G-C4PE3LJRN7 is the site's GA4 stream; an env var still overrides it
    plugins: [react(), analytics(env.VITE_GTM_ID, env.VITE_GA_MEASUREMENT_ID || 'G-C4PE3LJRN7')],
  }
})
