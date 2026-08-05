import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import styles from './OutcomeBanner.module.css'

export function BuyingOutcomeBanner() {
  return (
    <section className={styles.banner} aria-label="Buying outcome">
      <div className={`${styles.inner} ${pageContainerClassName}`}>
        <p>Bottom line, I work hard to ensure happy outcomes.</p>
      </div>
    </section>
  )
}
