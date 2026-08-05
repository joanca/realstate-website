import styles from './Guidance.module.css'

export function BuyingGuidance() {
  return (
    <section className={styles.section} aria-label="Buying guidance">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.headings}>
            <h2 className={styles.heading}>
              There&rsquo;s enough stress around buying a home.
            </h2>
            <p className={styles.emphasis}>
              <span>My experience and knowledge</span> helps my clients worry less.
            </p>
          </div>

          <div className={styles.body}>
            <p>
              During a tour, I like to encourage buyers to wander through the home and imagine what their life would be like there.
            </p>
            <p>
              Simultaneously, I&rsquo;m studying the place. Thanks to my extensive experience with home inspections, I provide invaluable insights on likely repairs or upcoming maintenance items that may not be obvious to the casual observer.
            </p>
            <p>
              I always make sure we have a thorough inspection on any interested property to ensure my buyer clients aren&rsquo;t purchasing a never ending money pit.
            </p>
          </div>
        </div>

        <blockquote className={styles.quote}>
          <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
          <p>
            A hardcoded quote that I will put here soon when I figure out which one it&rsquo;s going to be.
            <span className={styles.quoteAttribution}> - Customer</span>
          </p>
        </blockquote>
      </div>
    </section>
  )
}
