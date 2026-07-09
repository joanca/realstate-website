import { describe, expect, it, vi, afterEach } from 'vitest'
import {
  areStylesheetsReady,
  createDeferredRenderController,
  hasMountedContent,
  isStylesheetReady,
  waitForStylesheet,
  waitForStylesheets,
} from './deferredMount'

afterEach(() => {
  vi.useRealTimers()
})

describe('deferredMount', () => {
  it('detects stylesheet readiness from data-loaded or sheet', () => {
    const stylesheet = document.createElement('link')

    expect(isStylesheetReady(stylesheet)).toBe(false)

    stylesheet.dataset.loaded = 'true'
    expect(isStylesheetReady(stylesheet)).toBe(true)

    delete stylesheet.dataset.loaded
    Object.defineProperty(stylesheet, 'sheet', {
      configurable: true,
      value: {},
    })

    expect(isStylesheetReady(stylesheet)).toBe(true)
  })

  it('detects readiness for multiple stylesheets', () => {
    const readyStylesheet = document.createElement('link')
    const pendingStylesheet = document.createElement('link')
    readyStylesheet.dataset.loaded = 'true'

    expect(areStylesheetsReady([readyStylesheet, pendingStylesheet])).toBe(false)

    pendingStylesheet.dataset.loaded = 'true'
    expect(areStylesheetsReady([readyStylesheet, pendingStylesheet])).toBe(true)
  })

  it('reports mounted content based on child elements', () => {
    const mountNode = document.createElement('div')

    expect(hasMountedContent(mountNode)).toBe(false)

    mountNode.append(document.createElement('span'))
    expect(hasMountedContent(mountNode)).toBe(true)
  })

  it('schedules render immediately when stylesheet is already ready', () => {
    const stylesheet = document.createElement('link')
    stylesheet.dataset.loaded = 'true'
    const scheduleRender = vi.fn()
    const startFallbackTimer = vi.fn()

    waitForStylesheet(stylesheet, scheduleRender, startFallbackTimer)

    expect(scheduleRender).toHaveBeenCalledTimes(1)
    expect(startFallbackTimer).not.toHaveBeenCalled()
  })

  it('waits for stylesheet load event when stylesheet is not ready', () => {
    const stylesheet = document.createElement('link')
    const scheduleRender = vi.fn()
    const startFallbackTimer = vi.fn()

    waitForStylesheet(stylesheet, scheduleRender, startFallbackTimer)
    expect(startFallbackTimer).toHaveBeenCalledTimes(1)

    stylesheet.dispatchEvent(new Event('load'))
    expect(scheduleRender).toHaveBeenCalledTimes(1)
  })

  it('waits for all stylesheet load events before rendering', () => {
    const firstStylesheet = document.createElement('link')
    const secondStylesheet = document.createElement('link')
    const scheduleRender = vi.fn()
    const startFallbackTimer = vi.fn()

    waitForStylesheets([firstStylesheet, secondStylesheet], scheduleRender, startFallbackTimer)
    expect(startFallbackTimer).toHaveBeenCalledTimes(1)

    firstStylesheet.dispatchEvent(new Event('load'))
    expect(scheduleRender).not.toHaveBeenCalled()

    secondStylesheet.dispatchEvent(new Event('load'))
    expect(scheduleRender).toHaveBeenCalledTimes(1)
  })

  it('renders once after settle delay and reveals mount node', () => {
    vi.useFakeTimers()

    const mountNode = document.createElement('div')
    mountNode.style.visibility = 'hidden'
    const render = vi.fn()

    const { scheduleRender } = createDeferredRenderController({
      mountNode,
      render,
      settleDelayMs: 10,
      fallbackTimeoutMs: 20,
    })

    scheduleRender()
    vi.advanceTimersByTime(9)
    expect(render).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(render).toHaveBeenCalledTimes(1)

    vi.runOnlyPendingTimers()
    expect(mountNode.style.visibility).toBe('')
  })

  it('renders only once when fallback and schedule could overlap', () => {
    vi.useFakeTimers()

    const mountNode = document.createElement('div')
    const render = vi.fn()

    const { scheduleRender, startFallbackTimer } = createDeferredRenderController({
      mountNode,
      render,
      settleDelayMs: 10,
      fallbackTimeoutMs: 20,
    })

    startFallbackTimer()
    scheduleRender()

    vi.advanceTimersByTime(10)
    expect(render).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(100)
    expect(render).toHaveBeenCalledTimes(1)
  })
})
