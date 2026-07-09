import styles from './TestimonialsSummary.module.css'

interface TestimonialsSummaryProps {
  rating: string
  reviewCountLabel: string
  reviewsHref: string
  starsImageUrl: string
}

export function TestimonialsSummary({ rating, reviewCountLabel, reviewsHref, starsImageUrl }: TestimonialsSummaryProps) {
  return (
    <div className={styles.root}>
      <div className={styles.line} aria-hidden="true" />
      <div className={styles.ratingRow}>
        <p className={styles.rating}>{rating}</p>
        <img src={starsImageUrl} alt="5 stars" className={styles.stars} />
        <div className={styles.divider} aria-hidden="true" />
        <a href={reviewsHref} className={styles.reviewsLink}>
          {reviewCountLabel}
        </a>
      </div>
      <div className={styles.line} aria-hidden="true" />
    </div>
  )
}
