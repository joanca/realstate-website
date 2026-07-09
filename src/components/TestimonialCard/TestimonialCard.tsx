import type { Testimonial } from '../../modules/app/appContent'
import styles from './TestimonialCard.module.css'

interface TestimonialCardProps {
  testimonial: Testimonial
  starsImageUrl: string
}

function formatPublicationDate(value: string): string {
  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function TestimonialCard({ testimonial, starsImageUrl }: TestimonialCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <img src={starsImageUrl} alt="5 stars" className={styles.stars} />
        <p className={styles.date}>
          {formatPublicationDate(testimonial.publicationDate)}
        </p>
      </div>
      <p
        className={styles.quote}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {testimonial.quote}
      </p>
    </article>
  )
}
