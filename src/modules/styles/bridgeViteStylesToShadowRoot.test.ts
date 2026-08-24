import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { bridgeViteStylesToShadowRoot } from './bridgeViteStylesToShadowRoot'

describe('bridgeViteStylesToShadowRoot', () => {
  it('mirrors current and subsequently injected Vite styles into the shadow root', async () => {
    const host = document.createElement('div')
    document.body.append(host)
    const shadowRoot = host.attachShadow({ mode: 'open' })
    const initialStyle = document.createElement('style')
    initialStyle.dataset.viteDevId = '/src/styles.css'
    initialStyle.textContent = ':host { color: red; }'
    document.head.append(initialStyle)

    const observer = bridgeViteStylesToShadowRoot(shadowRoot)

    expect(document.head.contains(initialStyle)).toBe(true)
    expect(shadowRoot.querySelector('[data-emily-vite-dev-id="/src/styles.css"]')?.textContent).toBe(
      ':host { color: red; }',
    )

    const componentStyle = document.createElement('style')
    componentStyle.dataset.viteDevId = '/src/App.module.css'
    componentStyle.textContent = '.root { color: red; }'
    document.head.append(componentStyle)

    await waitFor(() => {
      expect(shadowRoot.querySelector('[data-emily-vite-dev-id="/src/App.module.css"]')?.textContent).toBe(
        '.root { color: red; }',
      )
    })

    componentStyle.textContent = '.root { color: blue; }'

    await waitFor(() => {
      expect(shadowRoot.querySelector('[data-emily-vite-dev-id="/src/App.module.css"]')?.textContent).toBe(
        '.root { color: blue; }',
      )
    })

    componentStyle.remove()

    await waitFor(() => {
      expect(shadowRoot.querySelector('[data-emily-vite-dev-id="/src/App.module.css"]')).not.toBeInTheDocument()
    })

    observer.disconnect()
    host.remove()
  })

  it('reuses the observer for repeated mounts', () => {
    const host = document.createElement('div')
    document.body.append(host)
    const shadowRoot = host.attachShadow({ mode: 'open' })
    const observer = bridgeViteStylesToShadowRoot(shadowRoot)

    expect(bridgeViteStylesToShadowRoot(shadowRoot)).toBe(observer)

    observer.disconnect()
    host.remove()
  })
})
