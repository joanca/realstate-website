import { outOfTownersContent } from '../../../modules/app/appContent'
import { CtaButton } from '../../shared/CtaButton/CtaButton'
import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import { OutOfTownersEyebrowSvg } from './OutOfTownersEyebrowSvg'
import styles from './OutOfTowners.module.css'

export function OutOfTowners() {
  return (
    <section className={styles.surface} aria-label="Out of towners">
      <div className={`${styles.content} ${pageContainerClassName}`}>
        <div className={styles.eyebrow}>
          <OutOfTownersEyebrowSvg className={styles.eyebrowShape} />
          <span className={styles.eyebrowText}>{outOfTownersContent.eyebrow}</span>
        </div>

        <h2 className={styles.heading}>{outOfTownersContent.headline}</h2>

        <p className={styles.label}>{outOfTownersContent.label}</p>

        <div className={styles.card}>
          <div className={styles.cardPanel}>
            <img
              src={outOfTownersContent.mapImageUrl}
              alt={outOfTownersContent.mapAlt}
              className={styles.map}
            />

            <div className={styles.cardBody}>
              <p className={styles.copy}>{outOfTownersContent.body}</p>
            </div>
          </div>

          <CtaButton
            href={outOfTownersContent.ctaHref}
            variant="secondary"
            className={styles.cta}
          >
            {outOfTownersContent.ctaLabel}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
