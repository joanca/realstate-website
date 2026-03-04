import { createRoot, type Root } from 'react-dom/client'
import type { ComponentType } from 'react'
import { getShadowStylesheetHref } from '../styles/getShadowStylesheetHref'
import { createDeferredRenderController, hasMountedContent, isStylesheetReady, waitForStylesheet } from './deferredMount'
import { ensureShadowBaseStyles, ensureShadowMountNode, ensureShadowStylesheet, getOrCreateShadowRoot } from './shadowDom'

const HOST_ID = 'emily-realestate'
const rootsByMountNode = new WeakMap<HTMLElement, Root>()

function getEmbeddedHost() {
  const host = document.getElementById(HOST_ID)

  if (!host) {
    throw new Error('Missing #emily-realestate mount element')
  }

  return host
}

function getOrCreateRoot(mountNode: HTMLElement) {
  let root = rootsByMountNode.get(mountNode)

  if (!root) {
    root = createRoot(mountNode)
    rootsByMountNode.set(mountNode, root)
  }

  return root
}

export function mountEmbeddedApp(AppComponent: ComponentType) {
  const host = getEmbeddedHost()
  const shadowRoot = getOrCreateShadowRoot(host)
  ensureShadowBaseStyles(shadowRoot)
  const stylesheet = ensureShadowStylesheet(shadowRoot, getShadowStylesheetHref())
  const mountNode = ensureShadowMountNode(shadowRoot)
  const root = getOrCreateRoot(mountNode)

  if (isStylesheetReady(stylesheet) && hasMountedContent(mountNode)) {
    root.render(<AppComponent />)
    return
  }

  mountNode.style.visibility = 'hidden'
  const { scheduleRender, startFallbackTimer } = createDeferredRenderController({
    mountNode,
    stylesheet,
    render: () => {
      stylesheet.dataset.loaded = 'true'
      root.render(<AppComponent />)
    },
  })
  waitForStylesheet(stylesheet, scheduleRender, startFallbackTimer)
}
