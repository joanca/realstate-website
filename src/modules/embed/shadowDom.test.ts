import { describe, expect, it } from 'vitest'
import { ensureShadowStylesheets } from './shadowDom'

describe('ensureShadowStylesheets', () => {
  it('removes managed stylesheets that are no longer requested', () => {
    const host = document.createElement('div')
    document.body.append(host)
    const shadowRoot = host.attachShadow({ mode: 'open' })

    expect(ensureShadowStylesheets(shadowRoot, ['/output.css'])).toHaveLength(1)
    expect(shadowRoot.querySelector('#emily-shadow-stylesheet-0')).toBeInTheDocument()

    expect(ensureShadowStylesheets(shadowRoot, [])).toHaveLength(0)
    expect(shadowRoot.querySelector('#emily-shadow-stylesheet-0')).not.toBeInTheDocument()
  })
})
