import { createRoot, type Root } from 'react-dom/client'
import type { ComponentType } from 'react'
import { getShadowStylesheetHref } from '../styles/getShadowStylesheetHref'
import { ensureShadowBaseStyles, ensureShadowMountNode, ensureShadowStylesheet, getOrCreateShadowRoot } from './shadowDom'

const HOST_ID = 'emily-realestate'
const rootsByMountNode = new WeakMap<HTMLElement, Root>()

export function mountEmbeddedApp(AppComponent: ComponentType) {
  const host = document.getElementById(HOST_ID)

  if (!host) {
    throw new Error('Missing #emily-realestate mount element')
  }

  const shadowRoot = getOrCreateShadowRoot(host)
  ensureShadowBaseStyles(shadowRoot)
  ensureShadowStylesheet(shadowRoot, getShadowStylesheetHref())
  const mountNode = ensureShadowMountNode(shadowRoot)

  let root = rootsByMountNode.get(mountNode)

  if (!root) {
    root = createRoot(mountNode)
    rootsByMountNode.set(mountNode, root)
  }

  root.render(<AppComponent />)
}
