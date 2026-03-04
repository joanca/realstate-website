const PROD_SHADOW_STYLESHEET_HREF = 'https://esm.sh/gh/joanca/realstate-website@main/src/output.css'

interface GetShadowStylesheetHrefOptions {
  isViteDev?: boolean
  hostname?: string
  baseUrl?: string
}

export function getShadowStylesheetHref(options: GetShadowStylesheetHrefOptions = {}) {
  const {
    isViteDev = Boolean(import.meta?.env?.DEV),
    hostname = typeof window !== 'undefined' ? window.location.hostname : '',
    baseUrl = import.meta.url,
  } = options

  const isLocalhost = ['localhost', '127.0.0.1'].includes(hostname)

  if (isViteDev || isLocalhost) {
    return new URL('/src/output.css', baseUrl).href
  }

  return PROD_SHADOW_STYLESHEET_HREF
}
