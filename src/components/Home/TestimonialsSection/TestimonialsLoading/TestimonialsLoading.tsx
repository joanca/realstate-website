import styles from './TestimonialsLoading.module.css'

export function TestimonialsLoading() {
  return (
    <div className={styles.surface}>
      <section className={styles.section}>
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.card}>
              <div className={styles.header}>
                <div className={`${styles.bar} ${styles.titleBar}`} />
                <div className={`${styles.bar} ${styles.dateBar}`} />
              </div>
              <div className={styles.lines}>
                <div className={`${styles.line} ${styles.fullLine}`} />
                <div className={`${styles.line} ${styles.line92}`} />
                <div className={`${styles.line} ${styles.line88}`} />
                <div className={`${styles.line} ${styles.line74}`} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.footerPlaceholder} />
        </div>
      </section>
    </div>
  )
}
