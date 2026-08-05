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
      <h2 className={styles.heading}>
        I'm here to <span>guide you</span>.
      </h2>
      <div className={styles.ratingRow}>
        <p className={styles.rating}>{rating}</p>
        <img src={starsImageUrl} alt="5 stars" className={styles.stars} />
        <span className={styles.divider} aria-hidden="true">
          |
        </span>
        <a href={reviewsHref} className={styles.reviewsLink}>
          {reviewCountLabel}
        </a>
      </div>
    </div>
  )
}
