import type { CSSProperties } from 'react'
import { getImageUrl } from '../../../modules/assets/getImageUrl'
import { DividerLine } from '../../shared/DividerLine/DividerLine'
import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import styles from './Hero.module.css'

const heroImageUrl = getImageUrl('buying-hero.png')
const houseIconUrl = getImageUrl('house-icon.png')

export function BuyingHero() {
  const houseDotStyle = {
    '--house-dot-image': `url("${houseIconUrl}")`,
  } as CSSProperties

  return (
    <section className={styles.hero} aria-labelledby="buying-title">
      <div className={`${styles.inner} ${pageContainerClassName}`}>
        <h1 id="buying-title" className={styles.pageTitle} aria-label="BUYING">
          BUY
          <span className={styles.houseDotI} aria-hidden="true" style={houseDotStyle}>
            I
          </span>
          NG
        </h1>

        <img
          src={heroImageUrl}
          alt="A craftsman house surrounded by autumn foliage"
          className={styles.image}
        />

        <div className={styles.copy}>
          <h2 className={styles.heading}>
            Nobody likes a salesperson.<br />
            Neither do I!
          </h2>
          <p className={styles.body}>
            I&rsquo;m here to help you, not talk you into buying a house that isn&rsquo;t right for you.
          </p>
          <DividerLine width={128} className={styles.divider} />
        </div>
      </div>
    </section>
  )
}
