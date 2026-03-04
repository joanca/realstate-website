import { render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Listings } from './Listings'

const LIGHT_DOM_STYLE_ID = 'emily-listings-lightdom-style'

const FALLBACK_SCRIPT_URLS = [
  'https://emilybrealty.com/wp-content/plugins/bwp-minify/cache/minify-b-utils-308272f61f1dd2c74483441c316e3a30.js?ver=A.4f324b31b2.B3ZXYAOYAO',
  'https://emilybrealty.com/wp-content/plugins/bwp-minify/cache/minify-b-helpers-1ee421ddc2805789a72e4793e539f2d7.js?ver=A.4f324b31b2.B3ZXYAOYAO',
  'https://emilybrealty.com/wp-content/plugins/bwp-minify/cache/minify-b-jquery-ui-core-b9fa3ca169d8baa2628ab7f9ca4c6e50.js?ver=A.4f324b31b2.B3ZXYAOYAO',
]

type JQueryMock = ((target: unknown) => { trigger: (eventName: string) => void; on?: (...args: unknown[]) => unknown; off?: (...args: unknown[]) => unknown; find?: (selector: string) => { length: number } }) & {
  fn?: { CreatePanelSlider?: () => void }
}

type LegacyWindow = Window & {
  jQuery?: JQueryMock
  WMS?: { propertycards?: { SearchCardProcess?: () => void } }
  quicktagsL10n?: Record<string, string>
}

function setupListingsHost() {
  document.body.innerHTML = '<div id="react-root"><main id="emily-realestate"></main></div>'
}

function setListingsDebugCookie(value: string) {
  document.cookie = `emily_listings_debug=${value}; path=/`
}

function clearListingsDebugCookie() {
  document.cookie = 'emily_listings_debug=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
}

function setupLegacyReadyMocks() {
  const triggerSpy = vi.fn()
  const onSpy = vi.fn()
  const offSpy = vi.fn()

  const jqueryMock = vi.fn((target: unknown) => {
    if (target === document) {
      return {
        trigger: triggerSpy,
        on: onSpy,
        off: offSpy,
        find: vi.fn(() => ({ length: 0 })),
      }
    }

    return {
      trigger: triggerSpy,
      find: vi.fn(() => ({ length: 0 })),
    }
  }) as JQueryMock

  jqueryMock.fn = {
    CreatePanelSlider: () => {},
  }

  ;(window as LegacyWindow).jQuery = jqueryMock
  ;(window as LegacyWindow).WMS = {
    propertycards: {
      SearchCardProcess: () => {},
    },
  }

  return { triggerSpy, onSpy, offSpy }
}

afterEach(() => {
  clearListingsDebugCookie()
  delete (window as LegacyWindow).jQuery
  delete (window as LegacyWindow).WMS
  delete (window as LegacyWindow).quicktagsL10n
})

describe('Listings', () => {
  it('creates a portal after #emily-realestate and triggers legacy widget event', async () => {
    setupListingsHost()
    const { triggerSpy } = setupLegacyReadyMocks()

    const { unmount } = render(<Listings />)

    await waitFor(() => {
      const mountNode = document.getElementById('emily-realestate')
      const portalNode = document.getElementById('emily-realestate-listings')
      expect(portalNode).toBeInTheDocument()
      expect(mountNode?.nextElementSibling).toBe(portalNode)
      expect(portalNode?.querySelector('[data-get-widget]')).toBeInTheDocument()
      expect(portalNode?.querySelector('#home-featured-properties')).toHaveAttribute('data-listings-ready', 'false')
      expect(document.getElementById(LIGHT_DOM_STYLE_ID)).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(triggerSpy).toHaveBeenCalledWith('flbuilder-render-updated')
    })

    unmount()

    await waitFor(() => {
      expect(document.getElementById('emily-realestate-listings')).not.toBeInTheDocument()
      expect(document.getElementById(LIGHT_DOM_STYLE_ID)).not.toBeInTheDocument()
    })
  })

  it('marks listings as ready after cards are rendered', async () => {
    setupListingsHost()
    setupLegacyReadyMocks()

    const { unmount } = render(<Listings />)

    await waitFor(() => {
      const container = document.querySelector('#home-featured-properties')
      expect(container).toHaveAttribute('data-listings-ready', 'false')
    })

    const portalNode = document.getElementById('emily-realestate-listings')
    const cardNode = document.createElement('article')
    cardNode.setAttribute('data-propcard-listing-id', 'mock-card-id')
    portalNode?.append(cardNode)

    await waitFor(() => {
      const container = document.querySelector('#home-featured-properties')
      expect(container).toHaveAttribute('data-listings-ready', 'true')
    })

    unmount()
  })

  it('overrides localhost data-sitebase-lang for services proxy and restores on unmount', async () => {
    setupListingsHost()
    setupLegacyReadyMocks()
    document.body.setAttribute('data-sitebase-lang', 'https://emilybrealty.com')

    const { unmount } = render(<Listings />)

    await waitFor(() => {
      expect(document.body.getAttribute('data-sitebase-lang')).toBe(window.location.origin)
    })

    unmount()

    await waitFor(() => {
      expect(document.body.getAttribute('data-sitebase-lang')).toBe('https://emilybrealty.com')
    })
  })

  it('injects fallback legacy scripts when hydration dependencies are missing', async () => {
    setupListingsHost()

    const { unmount } = render(<Listings />)

    for (const scriptUrl of FALLBACK_SCRIPT_URLS) {
      await waitFor(() => {
        expect(document.querySelector(`script[src="${scriptUrl}"]`)).toBeInTheDocument()
      })

      const scriptNode = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement
      scriptNode.dispatchEvent(new Event('load'))
    }

    await waitFor(() => {
      expect((window as LegacyWindow).quicktagsL10n).toBeTruthy()
    })

    unmount()
  })

  it('does not attach ajax debug handlers without debug cookie', async () => {
    setupListingsHost()
    const { onSpy, offSpy } = setupLegacyReadyMocks()

    const { unmount } = render(<Listings />)

    await waitFor(() => {
      expect(document.getElementById('emily-realestate-listings')).toBeInTheDocument()
    })

    expect(onSpy).not.toHaveBeenCalled()

    unmount()

    expect(offSpy).not.toHaveBeenCalled()
  })

  it('attaches and detaches ajax debug handlers when debug cookie is enabled', async () => {
    setupListingsHost()
    setListingsDebugCookie('1')
    const { onSpy, offSpy } = setupLegacyReadyMocks()

    const { unmount } = render(<Listings />)

    await waitFor(() => {
      expect(onSpy).toHaveBeenCalledWith('ajaxSuccess.listingsWidgetDebug', expect.any(Function))
      expect(onSpy).toHaveBeenCalledWith('ajaxError.listingsWidgetDebug', expect.any(Function))
      expect(onSpy).toHaveBeenCalledWith('search-cards-processed.listingsWidgetDebug', expect.any(Function))
    })

    unmount()

    await waitFor(() => {
      expect(offSpy).toHaveBeenCalledWith('ajaxSuccess.listingsWidgetDebug', expect.any(Function))
      expect(offSpy).toHaveBeenCalledWith('ajaxError.listingsWidgetDebug', expect.any(Function))
      expect(offSpy).toHaveBeenCalledWith('search-cards-processed.listingsWidgetDebug', expect.any(Function))
    })
  })

  it('keeps pre-existing portal node on cleanup', async () => {
    setupListingsHost()
    setupLegacyReadyMocks()

    const mountNode = document.getElementById('emily-realestate')
    const existingPortalNode = document.createElement('div')
    existingPortalNode.id = 'emily-realestate-listings'
    mountNode?.insertAdjacentElement('afterend', existingPortalNode)

    const { unmount } = render(<Listings />)

    await waitFor(() => {
      expect(document.getElementById('emily-realestate-listings')).toBe(existingPortalNode)
    })

    unmount()

    await waitFor(() => {
      expect(document.getElementById('emily-realestate-listings')).toBe(existingPortalNode)
    })
  })

  it('keeps pre-existing light dom style on cleanup', async () => {
    setupListingsHost()
    setupLegacyReadyMocks()

    const existingStyle = document.createElement('style')
    existingStyle.id = LIGHT_DOM_STYLE_ID
    existingStyle.textContent = 'body { color: inherit; }'
    document.head.append(existingStyle)

    const { unmount } = render(<Listings />)

    await waitFor(() => {
      expect(document.getElementById(LIGHT_DOM_STYLE_ID)).toBe(existingStyle)
    })

    unmount()

    await waitFor(() => {
      expect(document.getElementById(LIGHT_DOM_STYLE_ID)).toBe(existingStyle)
    })
  })
})
