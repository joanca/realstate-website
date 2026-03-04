import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const PORTAL_ID = 'emily-realestate-listings'
const WIDGET_CHECK_SELECTOR = '[data-propcard-listing-id]'
const WIDGET_SHELL_SELECTOR = '.searchcard-listing[data-raw-listing-obj]'
const DEBUG_PREFIX = '[ListingsWidget]'
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

function isLocalhostRuntime() {
  const hostname = window.location.hostname
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
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

type JQueryLike = ((target: unknown) => { trigger: (eventName: string) => void }) & { fn?: object }
type JQueryWithPlugin = JQueryLike & { fn?: { CreatePanelSlider?: unknown } }
type LegacyWindow = Window & {
  jQuery?: JQueryWithPlugin
  WMS?: { propertycards?: { SearchCardProcess?: unknown } }
  wp?: { hooks?: object }
  quicktagsL10n?: Record<string, string>
}

function ensureQuicktagsL10nForFallback() {
  const legacyWindow = window as LegacyWindow
  if (legacyWindow.quicktagsL10n) {
    return
  }

  legacyWindow.quicktagsL10n = { ...QUICKTAGS_L10N_FALLBACK }
  console.info(DEBUG_PREFIX, 'applied quicktagsL10n fallback shim')
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

const WIDGET_CONFIG = JSON.stringify({
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

function triggerLegacyWidgetLoad() {
  const legacyWindow = window as LegacyWindow
  const jquery = legacyWindow.jQuery
  const siteBaseLang = document.body.getAttribute('data-sitebase-lang')
  const readiness = getLegacyHydrationReadiness()

  const portalNode = document.getElementById(PORTAL_ID)
  const placeholderNode = portalNode?.querySelector('[data-get-widget]')
  const processedNode = portalNode?.querySelector('[data-get-widget].get-widget-processed')
  const cardsCount = portalNode?.querySelectorAll(WIDGET_CHECK_SELECTOR).length ?? 0
  const shellCardsCount = portalNode?.querySelectorAll(WIDGET_SHELL_SELECTOR).length ?? 0
  const placeholderRawConfig = placeholderNode?.getAttribute('data-get-widget') ?? null

  let placeholderConfigSummary: Record<string, string> | null = null
  if (placeholderRawConfig) {
    try {
      const parsed = JSON.parse(placeholderRawConfig) as {
        class?: string
        folder?: string
        status?: string
        data?: { title?: string; list?: string; numblocks?: string }
      }
      placeholderConfigSummary = {
        class: parsed.class ?? '',
        folder: parsed.folder ?? '',
        status: parsed.status ?? '',
        title: parsed.data?.title ?? '',
        list: parsed.data?.list ?? '',
        numblocks: parsed.data?.numblocks ?? '',
      }
    } catch (_error) {
      placeholderConfigSummary = { parseError: 'invalid-json' }
    }
  }

  console.info(DEBUG_PREFIX, 'trigger start', {
    jqueryPresent: Boolean(jquery),
    jqueryFnPresent: Boolean(jquery?.fn),
    createPanelSliderPresent: readiness.hasCreatePanelSlider,
    wmsPresent: Boolean(legacyWindow.WMS),
    searchCardProcessPresent: readiness.hasSearchCardProcess,
    wpHooksPresent: Boolean(legacyWindow.wp?.hooks),
    siteBaseLangPresent: Boolean(siteBaseLang),
    siteBaseLang,
    portalPresent: Boolean(portalNode),
    placeholderPresent: Boolean(placeholderNode),
    processedPlaceholderPresent: Boolean(processedNode),
    cardsCount,
    shellCardsCount,
    placeholderClass: placeholderNode?.getAttribute('class') ?? '',
    placeholderConfigSummary,
  })

  if (readiness.isReady && jquery?.fn) {
    console.info(DEBUG_PREFIX, 'triggering flbuilder-render-updated', jquery)
    jquery(document).trigger('flbuilder-render-updated')
    console.info(DEBUG_PREFIX, 'triggered flbuilder-render-updated')
  } else {
    console.warn(DEBUG_PREFIX, 'legacy hydration dependencies not ready; skipped flbuilder-render-updated', {
      hasJQueryFn: readiness.hasJQueryFn,
      hasCreatePanelSlider: readiness.hasCreatePanelSlider,
      hasSearchCardProcess: readiness.hasSearchCardProcess,
    })
  }

  const postCardsCount = portalNode?.querySelectorAll(WIDGET_CHECK_SELECTOR).length ?? 0
  const postShellCardsCount = portalNode?.querySelectorAll(WIDGET_SHELL_SELECTOR).length ?? 0
  console.info(DEBUG_PREFIX, 'trigger end', {
    processedPlaceholderPresent: Boolean(portalNode?.querySelector('[data-get-widget].get-widget-processed')),
    cardsCount: postCardsCount,
    shellCardsCount: postShellCardsCount,
  })

  return {
    hasLegacyGlobals: Boolean(jquery?.fn) && Boolean(legacyWindow.WMS),
    hasLoadedCards: postCardsCount > 0,
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

export function Listings() {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null)

  useEffect(() => {
    console.info(DEBUG_PREFIX, 'mount')

    const originalSiteBaseLang = document.body.getAttribute('data-sitebase-lang')
    const useLocalServicesProxy = shouldUseLocalServicesProxy(originalSiteBaseLang)
    let siteBaseLangOverridden = false

    if (useLocalServicesProxy) {
      document.body.setAttribute('data-sitebase-lang', window.location.origin)
      siteBaseLangOverridden = true
      console.info(DEBUG_PREFIX, 'overrode data-sitebase-lang for localhost proxy', {
        previous: originalSiteBaseLang,
        next: window.location.origin,
      })
    }

    let node: HTMLElement | null = null
    let createdNode = false
    let fallbackScriptsInjected = false
    let detachAjaxDebugHandlers = () => {}
    let hasAttachedAjaxDebugHandlers = false

    const ensurePortalNode = () => {
      if (node?.isConnected) {
        return true
      }

      node = null

      const mountNode = document.getElementById('emily-realestate')
      if (!mountNode || mountNode.parentElement?.id !== 'react-root') {
        console.info(DEBUG_PREFIX, 'portal wait', {
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
        console.info(DEBUG_PREFIX, 'created portal node', { portalId: PORTAL_ID })
      } else {
        console.info(DEBUG_PREFIX, 'reusing existing portal node', { portalId: PORTAL_ID })
      }

      setPortalNode(node)
      return true
    }

    ensurePortalNode()

    const injectFallbackLegacyScriptsIfNeeded = () => {
      if (!useLocalServicesProxy || fallbackScriptsInjected) {
        return
      }

      const readiness = getLegacyHydrationReadiness()
      if (readiness.isReady) {
        return
      }

      fallbackScriptsInjected = true

      console.info(DEBUG_PREFIX, 'injecting fallback legacy scripts', {
        hasJQueryFn: readiness.hasJQueryFn,
        hasCreatePanelSlider: readiness.hasCreatePanelSlider,
        hasSearchCardProcess: readiness.hasSearchCardProcess,
      })

      ensureQuicktagsL10nForFallback()

      void injectFallbackLegacyScripts()
        .then(() => {
          const nextReadiness = getLegacyHydrationReadiness()
          console.info(DEBUG_PREFIX, 'fallback legacy scripts loaded', {
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

    injectFallbackLegacyScriptsIfNeeded()

    const attachAjaxDebugHandlersIfReady = () => {
      if (hasAttachedAjaxDebugHandlers) {
        return
      }

      const jquery = (window as LegacyWindow).jQuery
      if (!jquery?.fn) {
        return
      }

      detachAjaxDebugHandlers = attachWidgetAjaxDebugHandlers()
      hasAttachedAjaxDebugHandlers = true
    }

    attachAjaxDebugHandlersIfReady()

    let triggerResult = triggerLegacyWidgetLoad()

    let attempts = 0
    const maxAttempts = 40
    const intervalHandle = window.setInterval(() => {
      ensurePortalNode()
      injectFallbackLegacyScriptsIfNeeded()
      attachAjaxDebugHandlersIfReady()
      triggerResult = triggerLegacyWidgetLoad()
      attempts += 1

      const shouldStop = (triggerResult.hasLoadedCards && triggerResult.hydrationReady) || attempts >= maxAttempts

      if (shouldStop) {
        console.info(DEBUG_PREFIX, 'stopping retry loop', {
          attempts,
          hasLegacyGlobals: triggerResult.hasLegacyGlobals,
          hasProcessedPlaceholder: triggerResult.hasProcessedPlaceholder,
          hasLoadedCards: triggerResult.hasLoadedCards,
          hydrationReady: triggerResult.hydrationReady,
        })
        window.clearInterval(intervalHandle)
      }
    }, 150)

    return () => {
      console.info(DEBUG_PREFIX, 'unmount')
      window.clearInterval(intervalHandle)
      setPortalNode(null)
      detachAjaxDebugHandlers()

      if (siteBaseLangOverridden) {
        if (originalSiteBaseLang === null) {
          document.body.removeAttribute('data-sitebase-lang')
        } else {
          document.body.setAttribute('data-sitebase-lang', originalSiteBaseLang)
        }

        console.info(DEBUG_PREFIX, 'restored original data-sitebase-lang', {
          restored: originalSiteBaseLang,
        })
      }

      if (createdNode) {
        node?.remove()
      }
    }
  }, [])

  if (!portalNode) {
    return null
  }

  return createPortal(
    <div className="container">
      <div id="home-featured-properties" className="col-md-10 col-md-offset-1">
        <div data-get-widget={WIDGET_CONFIG} data-target-parent="yes" data-widget-check={WIDGET_CHECK_SELECTOR} />
      </div>
    </div>,
    portalNode,
  )
}
