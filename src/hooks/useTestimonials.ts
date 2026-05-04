import { useState, useEffect } from 'react'
import type { Testimonial } from '../modules/app/appContent'
import { testimonials as fallbackTestimonials } from '../modules/app/appContent'

const API_URL = 'https://aravena.me/api/proxy/testimonials'
const MAX_TESTIMONIALS = 21

interface ApiResponse {
  testimonials: Array<{
    DateTimeStamp: string
    Rating: number
    Testimonial: string
    Signature: string
    TestimonialID: number
    ThirdPartySitesData: {
      SiteDataName: string | null
      SiteID: number
      ThirdPartySites: {
        Image: string
      }
      URL: string
    }
    UserInfo: {
      Address1: string
      City: string
      Country: string | null
      EditDate: string | null
      Name: string
      ParentID: number
      Phone: string
      State: string
      UserInfoSettings: {
        enforceHippa: boolean
      }
      Zip: string
      parentUserInfo: {
        UserInfoSettings: {
          enforceHippa: boolean
        }
        Username: string
      }
      vanity_url_slug: string
    }
  }>
}

function pickRandomTestimonials<T>(items: T[], limit: number): T[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, limit)
}

function mapToTestimonials(data: ApiResponse): Testimonial[] {
  return pickRandomTestimonials(data.testimonials, MAX_TESTIMONIALS).map((item) => ({
    quote: item.Testimonial,
    publicationDate: item.DateTimeStamp,
  }))
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchTestimonials() {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }
        const data: ApiResponse = await response.json()
        if (isMounted) {
          setTestimonials(mapToTestimonials(data))
        }
      } catch {
        if (isMounted) {
          setTestimonials(fallbackTestimonials)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchTestimonials()

    return () => {
      isMounted = false
    }
  }, [])

  return { testimonials, loading }
}
