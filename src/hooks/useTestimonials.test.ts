import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useTestimonials } from './useTestimonials'
import { testimonials as fallbackTestimonials } from '../modules/app/appContent'

const mockTestimonials = [
  { Testimonial: 'Quote one', Signature: 'Author One', TestimonialID: 1 },
  { Testimonial: 'Quote two', Signature: 'Author Two', TestimonialID: 2 },
  { Testimonial: 'Quote three', Signature: 'Author Three', TestimonialID: 3 },
  { Testimonial: 'Quote four', Signature: 'Author Four', TestimonialID: 4 },
]

const API_URL = 'https://aravena.me/api/proxy/testimonials'

describe('useTestimonials', () => {
  const originalFetch = globalThis.fetch
  const originalRandom = Math.random

  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    Math.random = originalRandom
    vi.clearAllMocks()
  })

  it('returns loading true initially', () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}))
    const { result } = renderHook(() => useTestimonials())
    expect(result.current.loading).toBe(true)
    expect(result.current.testimonials).toEqual(fallbackTestimonials)
  })

  it('fetches testimonials and returns 3 random ones', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ testimonials: mockTestimonials }),
    } as Response)

    vi.spyOn(Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0.5).mockReturnValueOnce(0.25)

    const { result } = renderHook(() => useTestimonials())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(fetch).toHaveBeenCalledWith(API_URL)
    expect(result.current.testimonials).toHaveLength(3)
    expect(result.current.testimonials.every((t) => 'quote' in t && 'author' in t)).toBe(true)
  })

  it('falls back to static testimonials on fetch error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useTestimonials())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.testimonials).toEqual(fallbackTestimonials)
  })

  it('falls back to static testimonials on non-ok response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response)

    const { result } = renderHook(() => useTestimonials())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.testimonials).toEqual(fallbackTestimonials)
  })

  it('sets isMounted flag to prevent state updates after unmount', async () => {
    let resolveFetch: () => void
    vi.mocked(fetch).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = () =>
            resolve({
              ok: true,
              json: () => Promise.resolve({ testimonials: mockTestimonials }),
            } as Response)
        })
    )

    const { result, unmount } = renderHook(() => useTestimonials())

    expect(result.current.loading).toBe(true)

    unmount()
    resolveFetch!()

    await new Promise((r) => setTimeout(r, 0))

    expect(fetch).toHaveBeenCalled()
  })
})