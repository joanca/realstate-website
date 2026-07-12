import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTestimonials } from '../../hooks/useTestimonials'
import { TestimonialsSection } from './TestimonialsSection'

vi.mock('../../hooks/useTestimonials', () => ({
  useTestimonials: vi.fn(),
}))

describe('TestimonialsSection', () => {
  beforeEach(() => {
    vi.mocked(useTestimonials).mockReturnValue({
      loading: false,
      testimonials: [
        {
          quote: 'Emily helped us navigate a competitive market with confidence.',
          publicationDate: '2025-03-24T00:00:00.000Z',
        },
      ],
    })
  })

  it('renders publication date formatted as month and year', () => {
    render(<TestimonialsSection />)

    expect(screen.getByText('Mar 2025')).toBeInTheDocument()
    expect(screen.queryByText('Author One')).not.toBeInTheDocument()
  })

  it('renders stars and date above testimonial body', () => {
    render(<TestimonialsSection />)

    const date = screen.getByText('Mar 2025')
    const quote = screen.getByText('Emily helped us navigate a competitive market with confidence.')

    expect(date.compareDocumentPosition(quote) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
  })

  it('renders the hardcoded review summary above the testimonials', () => {
    render(<TestimonialsSection />)

    expect(screen.getByText('5.0')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '(57) Reviews' })).toBeInTheDocument()
  })

  it('renders Carousel without global carousel class selectors', () => {
    const { container } = render(<TestimonialsSection />)

    expect(container.querySelector('.carousel-track')).not.toBeInTheDocument()
    expect(container.querySelector('.carousel-slide')).not.toBeInTheDocument()
    expect(container.querySelector('.carousel-dots-track')).not.toBeInTheDocument()
    expect(container.querySelector('.carousel-dots-slide')).not.toBeInTheDocument()
  })
})
