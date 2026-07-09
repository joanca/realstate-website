const RENDER_SETTLE_DELAY_MS = 40
const STYLESHEET_FALLBACK_TIMEOUT_MS = 1200

export function isStylesheetReady(stylesheet: HTMLLinkElement) {
  return stylesheet.dataset.loaded === 'true' || Boolean(stylesheet.sheet)
}

export function areStylesheetsReady(stylesheets: HTMLLinkElement[]) {
  return stylesheets.every(isStylesheetReady)
}

export function hasMountedContent(mountNode: HTMLElement) {
  return mountNode.childElementCount > 0
}

interface DeferredRenderControllerOptions {
  mountNode: HTMLElement
  render: () => void
  settleDelayMs?: number
  fallbackTimeoutMs?: number
}

export function createDeferredRenderController({
  mountNode,
  render,
  settleDelayMs = RENDER_SETTLE_DELAY_MS,
  fallbackTimeoutMs = STYLESHEET_FALLBACK_TIMEOUT_MS,
}: DeferredRenderControllerOptions) {
  let hasRendered = false
  let settleTimer: ReturnType<typeof setTimeout> | undefined
  let fallbackTimer: ReturnType<typeof setTimeout> | undefined

  const clearTimers = () => {
    if (settleTimer) {
      clearTimeout(settleTimer)
    }

    if (fallbackTimer) {
      clearTimeout(fallbackTimer)
    }
  }

  const runRender = () => {
    if (hasRendered) {
      return
    }

    hasRendered = true
    clearTimers()
    render()
    setTimeout(() => {
      mountNode.style.visibility = ''
    }, 0)
  }

  const scheduleRender = () => {
    if (hasRendered) {
      return
    }

    if (settleTimer) {
      clearTimeout(settleTimer)
    }

    settleTimer = setTimeout(runRender, settleDelayMs)
  }

  const startFallbackTimer = () => {
    fallbackTimer = setTimeout(scheduleRender, fallbackTimeoutMs)
  }

  return {
    scheduleRender,
    startFallbackTimer,
  }
}

export function waitForStylesheet(stylesheet: HTMLLinkElement, scheduleRender: () => void, startFallbackTimer: () => void) {
  waitForStylesheets([stylesheet], scheduleRender, startFallbackTimer)
}

export function waitForStylesheets(
  stylesheets: HTMLLinkElement[],
  scheduleRender: () => void,
  startFallbackTimer: () => void,
) {
  if (areStylesheetsReady(stylesheets)) {
    scheduleRender()
    return
  }

  const pendingStylesheets = new Set(stylesheets.filter((stylesheet) => !isStylesheetReady(stylesheet)))
  const markStylesheetReady = (stylesheet: HTMLLinkElement) => {
    stylesheet.dataset.loaded = 'true'
    pendingStylesheets.delete(stylesheet)

    if (pendingStylesheets.size === 0) {
      scheduleRender()
    }
  }

  for (const stylesheet of pendingStylesheets) {
    stylesheet.addEventListener('load', () => markStylesheetReady(stylesheet), { once: true })
    stylesheet.addEventListener('error', () => markStylesheetReady(stylesheet), { once: true })
  }

  startFallbackTimer()
}
