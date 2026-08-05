import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import styles from './OutcomeBanner.module.css'

export function AboutOutcomeBanner() {
  return (
    <section className={styles.banner} aria-label="About Emily outcome">
      <div className={`${styles.inner} ${pageContainerClassName}`}>
        <p>Bottom line, I love this job because I love helping people.</p>
      </div>
    </section>
  )
}
