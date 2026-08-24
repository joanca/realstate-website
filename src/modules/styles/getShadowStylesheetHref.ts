const PROD_SHADOW_STYLESHEET_HREF = 'https://aravena.me/static/esm/gh/joanca/realstate-website@main/src/output.css'

interface GetShadowStylesheetHrefOptions {
  isViteDev?: boolean
  baseUrl?: string
}

export function resolveIsViteDev(viteEnv?: { DEV?: unknown }) {
  return Boolean(viteEnv?.DEV)
}

function getEsmGeneratedStylesheetHref(baseUrl: string) {
  try {
    const url = new URL(baseUrl)

    if (!url.pathname.endsWith('.mjs')) {
      return null
    }

    url.pathname = url.pathname.replace(/\.mjs$/, '.css')
    url.search = ''
    url.hash = ''

    return url.href
  } catch {
    return null
  }
}

export function getShadowStylesheetHrefs(options: GetShadowStylesheetHrefOptions = {}) {
  const {
    isViteDev = resolveIsViteDev(import.meta.env),
    baseUrl = import.meta.url,
  } = options

  if (isViteDev) {
    return []
  }

  const esmGeneratedStylesheetHref = getEsmGeneratedStylesheetHref(baseUrl)

  return [esmGeneratedStylesheetHref, PROD_SHADOW_STYLESHEET_HREF].filter(
    (href): href is string => Boolean(href),
  )
}

export function getShadowStylesheetHref(options: GetShadowStylesheetHrefOptions = {}) {
  return getShadowStylesheetHrefs(options).at(-1)
}
