const PROD_SHADOW_STYLESHEET_HREF = 'https://aravena.me/static/esm/gh/joanca/realstate-website@main/src/output.css'

interface GetShadowStylesheetHrefOptions {
  isViteDev?: boolean
  baseUrl?: string
}

export function resolveIsViteDev(viteEnv?: { DEV?: unknown }) {
  return Boolean(viteEnv?.DEV)
}

export function getShadowStylesheetHref(options: GetShadowStylesheetHrefOptions = {}) {
  const {
    isViteDev = resolveIsViteDev(import.meta.env),
    baseUrl = import.meta.url,
  } = options

  if (isViteDev) {
    return new URL('/styles.css', baseUrl).href
  }

  return PROD_SHADOW_STYLESHEET_HREF
}
