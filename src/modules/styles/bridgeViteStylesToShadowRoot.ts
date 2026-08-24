const VITE_STYLE_SELECTOR = 'style[data-vite-dev-id]'
const observersByShadowRoot = new WeakMap<ShadowRoot, MutationObserver>()
const mirroredStylesByShadowRoot = new WeakMap<ShadowRoot, Map<string, HTMLStyleElement>>()

function getViteStyle(node: Node) {
  if (node instanceof HTMLStyleElement && node.matches(VITE_STYLE_SELECTOR)) {
    return node
  }

  return node.parentElement?.closest<HTMLStyleElement>(VITE_STYLE_SELECTOR) ?? null
}

function mirrorViteStyle(sourceStyle: HTMLStyleElement, shadowRoot: ShadowRoot) {
  const viteStyleId = sourceStyle.dataset.viteDevId

  if (!viteStyleId) {
    return
  }

  const mirroredStyles = mirroredStylesByShadowRoot.get(shadowRoot) ?? new Map<string, HTMLStyleElement>()
  let mirroredStyle = mirroredStyles.get(viteStyleId)

  if (!mirroredStyle) {
    mirroredStyle = document.createElement('style')
    mirroredStyle.dataset.emilyViteDevId = viteStyleId
    shadowRoot.append(mirroredStyle)
    mirroredStyles.set(viteStyleId, mirroredStyle)
    mirroredStylesByShadowRoot.set(shadowRoot, mirroredStyles)
  }

  mirroredStyle.textContent = sourceStyle.textContent
}

function removeMirroredViteStyle(sourceStyle: HTMLStyleElement, shadowRoot: ShadowRoot) {
  const viteStyleId = sourceStyle.dataset.viteDevId

  if (!viteStyleId) {
    return
  }

  mirroredStylesByShadowRoot.get(shadowRoot)?.get(viteStyleId)?.remove()
  mirroredStylesByShadowRoot.get(shadowRoot)?.delete(viteStyleId)
}

export function bridgeViteStylesToShadowRoot(shadowRoot: ShadowRoot) {
  for (const style of document.head.querySelectorAll<HTMLStyleElement>(VITE_STYLE_SELECTOR)) {
    mirrorViteStyle(style, shadowRoot)
  }

  const existingObserver = observersByShadowRoot.get(shadowRoot)

  if (existingObserver) {
    return existingObserver
  }

  const observer = new MutationObserver((records) => {
    if (!shadowRoot.host.isConnected) {
      observer.disconnect()
      observersByShadowRoot.delete(shadowRoot)
      mirroredStylesByShadowRoot.delete(shadowRoot)
      return
    }

    for (const record of records) {
      const updatedStyle = getViteStyle(record.target)

      if (updatedStyle) {
        mirrorViteStyle(updatedStyle, shadowRoot)
      }

      for (const node of record.addedNodes) {
        const addedStyle = getViteStyle(node)

        if (addedStyle) {
          mirrorViteStyle(addedStyle, shadowRoot)
        }
      }

      for (const node of record.removedNodes) {
        if (node instanceof HTMLStyleElement && node.matches(VITE_STYLE_SELECTOR)) {
          removeMirroredViteStyle(node, shadowRoot)
        }
      }
    }
  })

  observer.observe(document.head, { childList: true, characterData: true, subtree: true })
  observersByShadowRoot.set(shadowRoot, observer)
  return observer
}
