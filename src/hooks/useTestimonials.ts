import { useState, useEffect } from 'react'
import type { Testimonial } from '../modules/app/appContent'
import { testimonials as fallbackTestimonials } from '../modules/app/appContent'

const API_URL = 'https://aravena.me/api/proxy/testimonials'

interface ApiResponse {
  testimonials: Array<{
    Testimonial: string
    Signature: string
    TestimonialID: number
  }>
}

function pickRandomThree<T>(items: T[]): T[] {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, 3)
}

function mapToTestimonials(data: ApiResponse): Testimonial[] {
  return pickRandomThree(data.testimonials).map((item) => ({
    quote: item.Testimonial,
    author: item.Signature,
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
