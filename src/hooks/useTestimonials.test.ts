import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useTestimonials } from './useTestimonials'
import { testimonials as fallbackTestimonials } from '../modules/app/appContent'

const mockTestimonials = [
  {
    DateTimeStamp: '2025-09-24T00:00:00.000Z',
    Rating: 5,
    Signature: 'Author One',
    Testimonial: 'Quote one',
    TestimonialID: 1,
    ThirdPartySitesData: {
      SiteDataName: null,
      SiteID: 2,
      ThirdPartySites: {
        Image: 'Google__G__Logo_1.png',
      },
      URL: 'https://search.google.com/local/writereview?placeid=abc',
    },
    UserInfo: {
      Address1: '1610 SE Bybee Blvd.',
      City: 'Portland',
      Country: null,
      EditDate: null,
      Name: 'Emily Bartolme',
      ParentID: 479421,
      Phone: '(503) 997-0579',
      State: 'OR',
      UserInfoSettings: {
        enforceHippa: false,
      },
      Zip: '97202',
      parentUserInfo: {
        UserInfoSettings: {
          enforceHippa: true,
        },
        Username: 'WindermereRealtyTrust',
      },
      vanity_url_slug: '5F81F04B-9637-43AB-A0D0-16E0F0E238A4',
    },
  },
  {
    DateTimeStamp: '2024-11-19T00:00:00.000Z',
    Rating: 5,
    Signature: 'Author Two',
    Testimonial: 'Quote two',
    TestimonialID: 2,
    ThirdPartySitesData: {
      SiteDataName: null,
      SiteID: 2,
      ThirdPartySites: {
        Image: 'Google__G__Logo_1.png',
      },
      URL: 'https://search.google.com/local/writereview?placeid=abc',
    },
    UserInfo: {
      Address1: '1610 SE Bybee Blvd.',
      City: 'Portland',
      Country: null,
      EditDate: null,
      Name: 'Emily Bartolme',
      ParentID: 479421,
      Phone: '(503) 997-0579',
      State: 'OR',
      UserInfoSettings: {
        enforceHippa: false,
      },
      Zip: '97202',
      parentUserInfo: {
        UserInfoSettings: {
          enforceHippa: true,
        },
        Username: 'WindermereRealtyTrust',
      },
      vanity_url_slug: '5F81F04B-9637-43AB-A0D0-16E0F0E238A4',
    },
  },
  {
    DateTimeStamp: '2024-10-20T00:00:00.000Z',
    Rating: 5,
    Signature: 'Author Three',
    Testimonial: 'Quote three',
    TestimonialID: 3,
    ThirdPartySitesData: {
      SiteDataName: null,
      SiteID: 2,
      ThirdPartySites: {
        Image: 'Google__G__Logo_1.png',
      },
      URL: 'https://search.google.com/local/writereview?placeid=abc',
    },
    UserInfo: {
      Address1: '1610 SE Bybee Blvd.',
      City: 'Portland',
      Country: null,
      EditDate: null,
      Name: 'Emily Bartolme',
      ParentID: 479421,
      Phone: '(503) 997-0579',
      State: 'OR',
      UserInfoSettings: {
        enforceHippa: false,
      },
      Zip: '97202',
      parentUserInfo: {
        UserInfoSettings: {
          enforceHippa: true,
        },
        Username: 'WindermereRealtyTrust',
      },
      vanity_url_slug: '5F81F04B-9637-43AB-A0D0-16E0F0E238A4',
    },
  },
  {
    DateTimeStamp: '2024-09-15T00:00:00.000Z',
    Rating: 5,
    Signature: 'Author Four',
    Testimonial: 'Quote four',
    TestimonialID: 4,
    ThirdPartySitesData: {
      SiteDataName: null,
      SiteID: 2,
      ThirdPartySites: {
        Image: 'Google__G__Logo_1.png',
      },
      URL: 'https://search.google.com/local/writereview?placeid=abc',
    },
    UserInfo: {
      Address1: '1610 SE Bybee Blvd.',
      City: 'Portland',
      Country: null,
      EditDate: null,
      Name: 'Emily Bartolme',
      ParentID: 479421,
      Phone: '(503) 997-0579',
      State: 'OR',
      UserInfoSettings: {
        enforceHippa: false,
      },
      Zip: '97202',
      parentUserInfo: {
        UserInfoSettings: {
          enforceHippa: true,
        },
        Username: 'WindermereRealtyTrust',
      },
      vanity_url_slug: '5F81F04B-9637-43AB-A0D0-16E0F0E238A4',
    },
  },
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

  it('fetches testimonials and returns up to 21 randomized testimonials', async () => {
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
    expect(result.current.testimonials).toHaveLength(mockTestimonials.length)
    expect(result.current.testimonials.every((t) => 'quote' in t && 'publicationDate' in t)).toBe(true)
    expect(result.current.testimonials.every((t) => mockTestimonials.some((m) => m.DateTimeStamp === t.publicationDate))).toBe(true)
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
