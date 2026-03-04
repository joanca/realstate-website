import { useEffect, useState } from 'react'

const PORTAL_ID = 'emily-realestate-listings'
const LIGHT_DOM_STYLE_ID = 'emily-listings-lightdom-style'
export const WIDGET_CHECK_SELECTOR = '[data-propcard-listing-id]'
const WIDGET_SHELL_SELECTOR = '.searchcard-listing[data-raw-listing-obj]'
const DEBUG_PREFIX = '[ListingsWidget]'
const DEBUG_COOKIE_NAME = 'emily_listings_debug'
const AJAX_DEBUG_NS = '.listingsWidgetDebug'
const QUICKTAGS_L10N_FALLBACK = {
  closeAllOpenTags: 'Close all open tags',
  closeTags: 'close tags',
  enterURL: 'Enter the URL',
  enterImageURL: 'Enter the URL of the image',
  enterImageDescription: 'Enter a description of the image',
  textdirection: 'text direction',
  toggleTextdirection: 'Toggle Editor Text Direction',
  dfw: 'Distraction-free writing mode',
  strong: 'Bold',
  strongClose: 'Close bold tag',
  em: 'Italic',
  emClose: 'Close italic tag',
  link: 'Insert link',
  blockquote: 'Blockquote',
  blockquoteClose: 'Close blockquote tag',
  del: 'Deleted text (strikethrough)',
  delClose: 'Close deleted text tag',
  ins: 'Inserted text',
  insClose: 'Close inserted text tag',
  image: 'Insert image',
  ul: 'Bulleted list',
  ulClose: 'Close bulleted list tag',
  ol: 'Numbered list',
  olClose: 'Close numbered list tag',
  li: 'List item',
  liClose: 'Close list item tag',
  code: 'Code',
  codeClose: 'Close code tag',
  more: 'Insert Read More tag',
}
const FALLBACK_LEGACY_SCRIPT_URLS = [
  'https://emilybrealty.com/wp-content/plugins/bwp-minify/cache/minify-b-utils-308272f61f1dd2c74483441c316e3a30.js?ver=A.4f324b31b2.B3ZXYAOYAO',
  'https://emilybrealty.com/wp-content/plugins/bwp-minify/cache/minify-b-helpers-1ee421ddc2805789a72e4793e539f2d7.js?ver=A.4f324b31b2.B3ZXYAOYAO',
  'https://emilybrealty.com/wp-content/plugins/bwp-minify/cache/minify-b-jquery-ui-core-b9fa3ca169d8baa2628ab7f9ca4c6e50.js?ver=A.4f324b31b2.B3ZXYAOYAO',
]
const FALLBACK_LEGACY_STYLESHEET_URL =
  'https://emilybrealty.com/wp-content/plugins/bwp-minify/cache/minify-b-imgmap_style-8e47fd8087f71df34cbff31f8a6b51df.css?ver=A.4f324b31b2.B3ZXYAOYAO'

const LIGHT_DOM_HIDE_TITLE_CSS =
  "#home-featured-properties[data-listings-ready='false'] h3, #home-featured-properties[data-listings-ready='false'] .featuredpropertynav { display: none; }"

export const WIDGET_CONFIG = JSON.stringify({
  partialName: ' Featured Properties',
  class: 'featuredproperties',
  folder: 'featuredproperties',
  admin: 0,
  options: {
    imagewidth: '437',
    imageheight: '292',
    showarrows: 'always',
    columns: '2',
    rows: '2',
    hidebuffer: '10',
    async: 'true',
  },
  status: 'partial',
  name: '0',
  obj: {},
  data: {
    title: 'My Sold Listings',
    list: '1175939',
    numblocks: '10',
  },
})

type JQueryLike = ((target: unknown) => { trigger: (eventName: string) => void }) & { fn?: object }
type JQueryWithPlugin = JQueryLike & { fn?: { CreatePanelSlider?: unknown } }
type LegacyWindow = Window & {
  jQuery?: JQueryWithPlugin
  WMS?: { propertycards?: { SearchCardProcess?: unknown } }
  wp?: { hooks?: object }
  quicktagsL10n?: Record<string, string>
}

function isLocalhostRuntime() {
  const hostname = window.location.hostname
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
}

function readCookie(name: string) {
  const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function isListingsDebugEnabled() {
  const value = readCookie(DEBUG_COOKIE_NAME)
  if (!value) {
    return false
  }

  return ['1', 'true', 'on'].includes(value.toLowerCase())
}

function debugInfo(enabled: boolean, message: string, metadata?: unknown) {
  if (!enabled) {
    return
  }

  if (metadata === undefined) {
    console.info(DEBUG_PREFIX, message)
    return
  }

  console.info(DEBUG_PREFIX, message, metadata)
}

function debugWarn(enabled: boolean, message: string, metadata?: unknown) {
  if (!enabled) {
    return
  }

  if (metadata === undefined) {
    console.warn(DEBUG_PREFIX, message)
    return
  }

  console.warn(DEBUG_PREFIX, message, metadata)
}

function shouldUseLocalServicesProxy(siteBaseLang: string | null) {
  if (!siteBaseLang || !isLocalhostRuntime()) {
    return false
  }

  try {
    return new URL(siteBaseLang).origin !== window.location.origin
  } catch (_error) {
    return false
  }
}

function ensureQuicktagsL10nForFallback() {
  const legacyWindow = window as LegacyWindow
  if (legacyWindow.quicktagsL10n) {
    return
  }

  legacyWindow.quicktagsL10n = { ...QUICKTAGS_L10N_FALLBACK }
}

function getLegacyHydrationReadiness() {
  const legacyWindow = window as LegacyWindow
  const hasJQueryFn = Boolean(legacyWindow.jQuery?.fn)
  const hasCreatePanelSlider = typeof legacyWindow.jQuery?.fn?.CreatePanelSlider === 'function'
  const hasSearchCardProcess = typeof legacyWindow.WMS?.propertycards?.SearchCardProcess === 'function'

  return {
    hasJQueryFn,
    hasCreatePanelSlider,
    hasSearchCardProcess,
    isReady: hasJQueryFn && hasCreatePanelSlider && hasSearchCardProcess,
  }
}

function loadExternalScript(url: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${url}"]`) as HTMLScriptElement | null
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.defer = true
    script.dataset.listingsWidgetFallback = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`failed to load ${url}`))
    document.head.append(script)
  })
}

async function injectFallbackLegacyScripts() {
  for (const url of FALLBACK_LEGACY_SCRIPT_URLS) {
    await loadExternalScript(url)
  }
}

function triggerLegacyWidgetLoad(debugEnabled: boolean) {
  const legacyWindow = window as LegacyWindow
  const jquery = legacyWindow.jQuery
  const readiness = getLegacyHydrationReadiness()

  const portalNode = document.getElementById(PORTAL_ID)
  const cardsCount = portalNode?.querySelectorAll(WIDGET_CHECK_SELECTOR).length ?? 0
  const visibleListingCardsCount =
    portalNode?.querySelectorAll('.listing-card').length
      ? Array.from(portalNode.querySelectorAll<HTMLElement>('.listing-card')).filter((cardNode) => {
          const height = cardNode.getBoundingClientRect().height
          return height > 0
        }).length
      : 0

  debugInfo(debugEnabled, 'trigger start', {
    hasJQueryFn: readiness.hasJQueryFn,
    hasCreatePanelSlider: readiness.hasCreatePanelSlider,
    hasSearchCardProcess: readiness.hasSearchCardProcess,
    cardsCount,
    visibleListingCardsCount,
  })

  if (readiness.isReady && jquery?.fn) {
    jquery(document).trigger('flbuilder-render-updated')
  } else {
    debugWarn(debugEnabled, 'legacy hydration dependencies not ready; skipped flbuilder-render-updated', {
      hasJQueryFn: readiness.hasJQueryFn,
      hasCreatePanelSlider: readiness.hasCreatePanelSlider,
      hasSearchCardProcess: readiness.hasSearchCardProcess,
    })
  }

  const postCardsCount = portalNode?.querySelectorAll(WIDGET_CHECK_SELECTOR).length ?? 0
  const postVisibleListingCardsCount =
    portalNode?.querySelectorAll('.listing-card').length
      ? Array.from(portalNode.querySelectorAll<HTMLElement>('.listing-card')).filter((cardNode) => {
          const height = cardNode.getBoundingClientRect().height
          return height > 0
        }).length
      : 0
  debugInfo(debugEnabled, 'trigger end', {
    cardsCount: postCardsCount,
    visibleListingCardsCount: postVisibleListingCardsCount,
  })

  return {
    hasLegacyGlobals: Boolean(jquery?.fn) && Boolean(legacyWindow.WMS),
    hasLoadedCards: postCardsCount > 0,
    hasVisibleListingCards: postVisibleListingCardsCount > 0,
    hasProcessedPlaceholder: Boolean(portalNode?.querySelector('[data-get-widget].get-widget-processed')),
    hydrationReady: readiness.isReady,
  }
}

function attachWidgetAjaxDebugHandlers() {
  const legacyWindow = window as LegacyWindow
  const jquery = legacyWindow.jQuery as unknown as
    | (((target: unknown) => { on: (...args: unknown[]) => unknown; off: (...args: unknown[]) => unknown; find: (selector: string) => { length: number } }) & {
        fn?: object
      })
    | undefined

  if (!jquery?.fn) {
    return () => {}
  }

  const documentHandle = jquery(document)

  if (!documentHandle || typeof documentHandle.on !== 'function' || typeof documentHandle.off !== 'function') {
    console.warn(DEBUG_PREFIX, 'jQuery(document) does not support on/off; ajax debug handlers not attached')
    return () => {}
  }

  const ajaxSuccessHandler = (_event: unknown, xhr: { responseText?: string; status?: number }, settings: { url?: string } = {}) => {
    const requestUrl = settings.url ?? ''
    if (!requestUrl.includes('/services/get-widget/')) {
      return
    }

    const html = xhr?.responseText ?? ''
    const cardsInResponse = jquery(html).find(WIDGET_CHECK_SELECTOR).length
    const shellCardsInResponse = jquery(html).find(WIDGET_SHELL_SELECTOR).length

    console.info(DEBUG_PREFIX, 'ajax success', {
      requestUrl,
      status: xhr?.status,
      responseLength: html.length,
      cardsInResponse,
      shellCardsInResponse,
    })
  }

  const ajaxErrorHandler = (
    _event: unknown,
    xhr: { status?: number; responseText?: string; statusText?: string },
    settings: { url?: string } = {},
    thrownError?: string,
  ) => {
    const requestUrl = settings.url ?? ''
    if (!requestUrl.includes('/services/get-widget/')) {
      return
    }

    const responsePreview = (xhr?.responseText ?? '').slice(0, 300)
    console.error(DEBUG_PREFIX, 'ajax error', {
      requestUrl,
      status: xhr?.status,
      statusText: xhr?.statusText,
      thrownError,
      responsePreview,
    })
  }

  documentHandle.on(`ajaxSuccess${AJAX_DEBUG_NS}`, ajaxSuccessHandler)
  documentHandle.on(`ajaxError${AJAX_DEBUG_NS}`, ajaxErrorHandler)

  const searchCardsProcessedHandler = () => {
    const portalNode = document.getElementById(PORTAL_ID)
    const cardsCount = portalNode?.querySelectorAll(WIDGET_CHECK_SELECTOR).length ?? 0
    const shellCardsCount = portalNode?.querySelectorAll(WIDGET_SHELL_SELECTOR).length ?? 0

    console.info(DEBUG_PREFIX, 'search-cards-processed fired', {
      processedPlaceholderPresent: Boolean(portalNode?.querySelector('[data-get-widget].get-widget-processed')),
      cardsCount,
      shellCardsCount,
    })
  }

  documentHandle.on(`search-cards-processed${AJAX_DEBUG_NS}`, searchCardsProcessedHandler)
  console.info(DEBUG_PREFIX, 'attached ajax debug handlers')

  return () => {
    documentHandle.off(`ajaxSuccess${AJAX_DEBUG_NS}`, ajaxSuccessHandler)
    documentHandle.off(`ajaxError${AJAX_DEBUG_NS}`, ajaxErrorHandler)
    documentHandle.off(`search-cards-processed${AJAX_DEBUG_NS}`, searchCardsProcessedHandler)
    console.info(DEBUG_PREFIX, 'detached ajax debug handlers')
  }
}

function setupLocalServicesProxy(debugEnabled: boolean) {
  const originalSiteBaseLang = document.body.getAttribute('data-sitebase-lang')

  if (!shouldUseLocalServicesProxy(originalSiteBaseLang)) {
    return () => {}
  }

  document.body.setAttribute('data-sitebase-lang', window.location.origin)
  debugInfo(debugEnabled, 'overrode data-sitebase-lang for localhost proxy', {
    previous: originalSiteBaseLang,
    next: window.location.origin,
  })

  return () => {
    if (originalSiteBaseLang === null) {
      document.body.removeAttribute('data-sitebase-lang')
    } else {
      document.body.setAttribute('data-sitebase-lang', originalSiteBaseLang)
    }

    debugInfo(debugEnabled, 'restored original data-sitebase-lang', {
      restored: originalSiteBaseLang,
    })
  }
}

function createPortalNodeManager(setPortalNode: (node: HTMLElement | null) => void, debugEnabled: boolean) {
  let node: HTMLElement | null = null
  let createdNode = false

  const ensurePortalNode = () => {
    if (node?.isConnected) {
      return true
    }

    node = null

    const mountNode = document.getElementById('emily-realestate')
    if (!mountNode || mountNode.parentElement?.id !== 'react-root') {
      debugInfo(debugEnabled, 'portal wait', {
        mountNodePresent: Boolean(mountNode),
        mountParentId: mountNode?.parentElement?.id ?? null,
      })
      return false
    }

    node = document.getElementById(PORTAL_ID)

    if (!node) {
      node = document.createElement('div')
      node.id = PORTAL_ID
      mountNode.insertAdjacentElement('afterend', node)
      createdNode = true
      debugInfo(debugEnabled, 'created portal node', { portalId: PORTAL_ID })
    } else {
      debugInfo(debugEnabled, 'reusing existing portal node', { portalId: PORTAL_ID })
    }

    setPortalNode(node)
    return true
  }

  const cleanup = () => {
    setPortalNode(null)

    if (createdNode) {
      node?.remove()
    }
  }

  return {
    ensurePortalNode,
    cleanup,
  }
}

function createFallbackScriptsLoader(debugEnabled: boolean) {
  let fallbackScriptsInjected = false

  return () => {
    if (fallbackScriptsInjected) {
      return
    }

    const readiness = getLegacyHydrationReadiness()
    if (readiness.isReady) {
      return
    }

    fallbackScriptsInjected = true

    debugInfo(debugEnabled, 'injecting fallback legacy scripts', {
      host: window.location.host,
      hasJQueryFn: readiness.hasJQueryFn,
      hasCreatePanelSlider: readiness.hasCreatePanelSlider,
      hasSearchCardProcess: readiness.hasSearchCardProcess,
    })

    ensureQuicktagsL10nForFallback()

    void injectFallbackLegacyScripts()
      .then(() => {
        const nextReadiness = getLegacyHydrationReadiness()
        debugInfo(debugEnabled, 'fallback legacy scripts loaded', {
          hasCreatePanelSlider: nextReadiness.hasCreatePanelSlider,
          hasSearchCardProcess: nextReadiness.hasSearchCardProcess,
        })
      })
      .catch((error: unknown) => {
        console.error(DEBUG_PREFIX, 'failed to load fallback legacy scripts', {
          error: error instanceof Error ? error.message : String(error),
        })
      })
  }
}

function createFallbackStylesheetLoader(debugEnabled: boolean) {
  let injectedLink: HTMLLinkElement | null = null

  return {
    ensureLoaded() {
      const existing = document.querySelector(`link[rel="stylesheet"][href*="${FALLBACK_LEGACY_STYLESHEET_URL}"]`)
      if (existing) {
        return
      }

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = FALLBACK_LEGACY_STYLESHEET_URL
      link.dataset.listingsWidgetFallback = 'true'
      document.head.append(link)
      injectedLink = link

      debugInfo(debugEnabled, 'injected fallback listings stylesheet', {
        href: FALLBACK_LEGACY_STYLESHEET_URL,
      })
    },
    cleanup() {
      injectedLink?.remove()
    },
  }
}

function createAjaxDebugManager(debugEnabled: boolean) {
  let hasAttached = false
  let detach = () => {}

  return {
    attachIfReady() {
      if (!debugEnabled || hasAttached) {
        return
      }

      const jquery = (window as LegacyWindow).jQuery
      if (!jquery?.fn) {
        return
      }

      detach = attachWidgetAjaxDebugHandlers()
      hasAttached = true
    },
    cleanup() {
      detach()
    },
  }
}

function ensureLightDomListingsStyle() {
  const existingStyle = document.getElementById(LIGHT_DOM_STYLE_ID)
  if (existingStyle) {
    return {
      cleanup: () => {},
    }
  }

  const style = document.createElement('style')
  style.id = LIGHT_DOM_STYLE_ID
  style.textContent = LIGHT_DOM_HIDE_TITLE_CSS
  document.head.append(style)

  return {
    cleanup: () => {
      style.remove()
    },
  }
}

export function useListingsWidget() {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null)
  const [isListingsReady, setIsListingsReady] = useState(false)

  useEffect(() => {
    const debugEnabled = isListingsDebugEnabled()
    debugInfo(debugEnabled, 'mount')

    const restoreSiteBaseLang = setupLocalServicesProxy(debugEnabled)
    const lightDomStyleManager = ensureLightDomListingsStyle()
    const portalNodeManager = createPortalNodeManager(setPortalNode, debugEnabled)
    const injectFallbackScriptsIfNeeded = createFallbackScriptsLoader(debugEnabled)
    const fallbackStylesheetLoader = createFallbackStylesheetLoader(debugEnabled)
    const ajaxDebugManager = createAjaxDebugManager(debugEnabled)

    portalNodeManager.ensurePortalNode()
    injectFallbackScriptsIfNeeded()
    fallbackStylesheetLoader.ensureLoaded()
    ajaxDebugManager.attachIfReady()

    let triggerResult = triggerLegacyWidgetLoad(debugEnabled)
    setIsListingsReady(triggerResult.hasVisibleListingCards)

    let attempts = 0
    const maxAttempts = 40
    const intervalHandle = window.setInterval(() => {
      portalNodeManager.ensurePortalNode()
      injectFallbackScriptsIfNeeded()
      fallbackStylesheetLoader.ensureLoaded()
      ajaxDebugManager.attachIfReady()
      triggerResult = triggerLegacyWidgetLoad(debugEnabled)
      setIsListingsReady(triggerResult.hasVisibleListingCards)
      attempts += 1

      const shouldStop = (triggerResult.hasVisibleListingCards && triggerResult.hydrationReady) || attempts >= maxAttempts

      if (shouldStop) {
        debugInfo(debugEnabled, 'stopping retry loop', {
          attempts,
          hasLegacyGlobals: triggerResult.hasLegacyGlobals,
          hasProcessedPlaceholder: triggerResult.hasProcessedPlaceholder,
          hasLoadedCards: triggerResult.hasLoadedCards,
          hasVisibleListingCards: triggerResult.hasVisibleListingCards,
          hydrationReady: triggerResult.hydrationReady,
        })
        window.clearInterval(intervalHandle)
      }
    }, 150)

    return () => {
      debugInfo(debugEnabled, 'unmount')
      window.clearInterval(intervalHandle)
      ajaxDebugManager.cleanup()
      fallbackStylesheetLoader.cleanup()
      restoreSiteBaseLang()
      lightDomStyleManager.cleanup()
      portalNodeManager.cleanup()
      setIsListingsReady(false)
    }
  }, [])

  return {
    portalNode,
    isListingsReady,
  }
}
