const RENDER_SETTLE_DELAY_MS = 40
const STYLESHEET_FALLBACK_TIMEOUT_MS = 1200

export function isStylesheetReady(stylesheet: HTMLLinkElement) {
  return stylesheet.dataset.loaded === 'true' || Boolean(stylesheet.sheet)
}

export function hasMountedContent(mountNode: HTMLElement) {
  return mountNode.childElementCount > 0
}

interface DeferredRenderControllerOptions {
  mountNode: HTMLElement
  stylesheet: HTMLLinkElement
  render: () => void
  settleDelayMs?: number
  fallbackTimeoutMs?: number
}

export function createDeferredRenderController({
  mountNode,
  stylesheet,
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
  if (isStylesheetReady(stylesheet)) {
    scheduleRender()
    return
  }

  stylesheet.addEventListener('load', scheduleRender, { once: true })
  stylesheet.addEventListener('error', scheduleRender, { once: true })
  startFallbackTimer()
}
