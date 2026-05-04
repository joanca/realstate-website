import { useTestimonials } from '../hooks/useTestimonials'
import { testimonialsContent, testimonialsSummaryContent } from '../modules/app/appContent'
import { Carousel } from './Carousel'
import { TestimonialCard } from './TestimonialCard'
import { TestimonialsLoading } from './TestimonialsLoading'
import { TestimonialsSummary } from './TestimonialsSummary'

export function TestimonialsSection() {
  const { testimonials, loading } = useTestimonials()
  const { starsImageUrl, allTestimonialsHref } = testimonialsContent
  const { rating, reviewCountLabel, reviewsHref } = testimonialsSummaryContent

  if (loading) {
    return <TestimonialsLoading />
  }

  return (
    <div className="testimonials-surface">
      <section className="py-8 lg:py-12 px-4 lg:px-20 max-w-[1440px] mx-auto">
        <TestimonialsSummary
          rating={rating}
          reviewCountLabel={reviewCountLabel}
          reviewsHref={reviewsHref}
          starsImageUrl={starsImageUrl}
        />

        <Carousel
          items={testimonials}
          ariaLabel="Testimonials carousel"
          renderItem={(testimonial, index) => (
            <TestimonialCard key={testimonial.quote + index} testimonial={testimonial} starsImageUrl={starsImageUrl} />
          )}
        />

        <div className="text-center lg:text-right mt-8">
          <a href={allTestimonialsHref} className="font-work-sans font-medium text-text-dark text-lg lg:text-[22px] underline opacity-80">
            All Testimonials
          </a>
        </div>
      </section>
    </div>
  )
}
