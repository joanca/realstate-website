import { useTestimonials } from '../../hooks/useTestimonials'
import { testimonialsContent, testimonialsSummaryContent } from '../../modules/app/appContent'
import { Carousel } from '../Carousel/Carousel'
import { TestimonialCard } from '../TestimonialCard/TestimonialCard'
import { TestimonialsLoading } from '../TestimonialsLoading/TestimonialsLoading'
import { TestimonialsSummary } from '../TestimonialsSummary/TestimonialsSummary'
import styles from './TestimonialsSection.module.css'

export function TestimonialsSection() {
  const { testimonials, loading } = useTestimonials()
  const { starsImageUrl, allTestimonialsHref } = testimonialsContent
  const { rating, reviewCountLabel, reviewsHref } = testimonialsSummaryContent

  if (loading) {
    return <TestimonialsLoading />
  }

  return (
    <div className={styles.surface}>
      <section className={styles.section}>
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
            <TestimonialCard key={testimonial.quote + index} testimonial={testimonial} />
          )}
        />

        <div className={styles.footer}>
          <a href={allTestimonialsHref} className={styles.allTestimonialsLink}>
            All Testimonials
          </a>
        </div>
      </section>
    </div>
  )
}
