import { describe, expect, it } from 'vitest'
import { injectGlobalFonts } from './injectGlobalFonts'

describe('injectGlobalFonts', () => {
  it('adds global font styles once', () => {
    expect(document.querySelectorAll('#emily-global-fonts')).toHaveLength(0)

    injectGlobalFonts()
    injectGlobalFonts()

    const styleNode = document.getElementById('emily-global-fonts')
    expect(styleNode).toBeInTheDocument()
    expect(styleNode?.textContent).toContain('@font-face')
    expect(document.querySelectorAll('#emily-global-fonts')).toHaveLength(1)
  })
})
