const PROD_SHADOW_STYLESHEET_HREF = 'https://aravena.me/static/esm/gh/joanca/realstate-website@main/src/output.css'

interface GetShadowStylesheetHrefOptions {
  isViteDev?: boolean
  baseUrl?: string
}

export function getShadowStylesheetHref(options: GetShadowStylesheetHrefOptions = {}) {
  const {
    isViteDev = Boolean(import.meta?.env?.DEV),
    baseUrl = import.meta.url,
  } = options

  if (isViteDev) {
    return new URL('/output.css', baseUrl).href
  }

  return PROD_SHADOW_STYLESHEET_HREF
}
