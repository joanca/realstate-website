import type { CSSProperties } from 'react'
import { getImageUrl } from '../../../modules/assets/getImageUrl'
import { DividerLine } from '../../shared/DividerLine/DividerLine'
import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import styles from './Strategy.module.css'

const imageUrl = getImageUrl('buying-hero-bottom.png')
const sectionStyle = {
  '--buying-image-border-color': 'rgba(61, 53, 46, 1)',
} as CSSProperties

export function BuyingStrategy() {
  return (
    <section className={styles.section} aria-label="Buying strategy" style={sectionStyle}>
      <div className={`${styles.inner} ${pageContainerClassName}`}>
        <div className={styles.media}>
          <img
            src={imageUrl}
            alt="A Victorian house surrounded by autumn foliage"
            className={styles.image}
          />
        </div>

        <div className={styles.copy}>
          <div className={styles.intro}>
            <h2 className={styles.heading}>
              Buy the right house at the right price point.
            </h2>
            <DividerLine width={96} className={styles.divider} />
          </div>

          <div className={styles.body}>
            <p>
              I never want my clients overpaying for a home. Conversely, I always make sure they&rsquo;re leveraged with the right strategies to beat other buyers in a competitive market.
            </p>
            <p>
              It&rsquo;s important to me that my buyers don&rsquo;t miss out on a property they really love or that would be perfect for them.
            </p>
          </div>

          <p className={styles.insight}>
            <span>My honest, informed insights</span> help my clients make smarter decisions.
          </p>
        </div>
      </div>
    </section>
  )
}
