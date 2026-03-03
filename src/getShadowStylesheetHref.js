const PROD_SHADOW_STYLESHEET_HREF = 'https://cdn.jsdelivr.net/gh/joanca/realstate-website@main/src/output.css'

export function getShadowStylesheetHref(options = {}) {
  const {
    isViteDev = Boolean(import.meta?.env?.DEV),
    hostname = typeof window !== 'undefined' ? window.location.hostname : '',
    baseUrl = import.meta.url,
  } = options

  const isLocalhost = ['localhost', '127.0.0.1'].includes(hostname)

  if (isViteDev || isLocalhost) {
    return new URL('./output.css', baseUrl).href
  }

  return PROD_SHADOW_STYLESHEET_HREF
}
