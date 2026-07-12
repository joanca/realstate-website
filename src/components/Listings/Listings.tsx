import { createPortal } from 'react-dom'
import { useListingsWidget, WIDGET_CHECK_SELECTOR, WIDGET_CONFIG } from './useListingsWidget'

export function Listings() {
  const { portalNode, isListingsReady } = useListingsWidget()

  if (!portalNode) {
    return null
  }

  return createPortal(
    <div className="subbody row" id="two">
      <div className="container">
        <div id="home-featured-properties" data-listings-ready={isListingsReady ? 'true' : 'false'}>
          <div data-get-widget={WIDGET_CONFIG} data-target-parent="yes" data-widget-check={WIDGET_CHECK_SELECTOR} />
        </div>
      </div>
    </div>,
    portalNode,
  )
}
