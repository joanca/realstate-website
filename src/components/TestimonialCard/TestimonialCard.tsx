import type { Testimonial } from '../../modules/app/appContent'
import styles from './TestimonialCard.module.css'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className={styles.card}>
      <p
        className={styles.quote}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {testimonial.quote}
      </p>
    </article>
  )
}
