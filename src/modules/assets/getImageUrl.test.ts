import { describe, expect, it } from 'vitest'
import { getImageUrl, resolveIsViteDev } from './getImageUrl'

describe('resolveIsViteDev', () => {
  it('returns true when vite env DEV is true', () => {
    expect(resolveIsViteDev({ DEV: true })).toBe(true)
  })

  it('returns false when vite env is unavailable', () => {
    expect(resolveIsViteDev(undefined)).toBe(false)
  })
})

describe('getImageUrl', () => {
  it('returns local image path in vite dev mode', () => {
    expect(getImageUrl('house-icon.png', { isViteDev: true })).toBe('/assets/images/house-icon.png')
  })

  it('returns proxy CDN URL in production', () => {
    expect(getImageUrl('house-icon.png', { isViteDev: false })).toBe(
      'https://aravena.me/img?src=https%3A%2F%2Fraw.githubusercontent.com%2Fjoanca%2Frealstate-website%2Fmain%2Fsrc%2Fassets%2Fimages%2Fhouse-icon.png',
    )
  })

  it('accepts an explicit local URL override', () => {
    expect(
      getImageUrl('house-icon.png', {
        isViteDev: true,
        localUrl: '/custom/house-icon.png',
      }),
    ).toBe('/custom/house-icon.png')
  })
})
