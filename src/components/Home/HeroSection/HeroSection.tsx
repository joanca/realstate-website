import type { CSSProperties } from 'react'
import { CtaButton } from '../../shared/CtaButton/CtaButton'
import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import styles from './HeroSection.module.css'

interface HeroSectionProps {
  imageUrl: string
  houseIconUrl: string
}

export function HeroSection({ imageUrl, houseIconUrl }: HeroSectionProps) {
  const houseDotStyle = {
    '--house-dot-image': `url("${houseIconUrl}")`,
  } as CSSProperties

  return (
    <section className={styles.root}>
      <div className={`${styles.container} ${pageContainerClassName}`}>
        <div className={styles.surface}>
          <div className={styles.content}>
            <div className={styles.copy}>
              <div className={styles.introRow}>
                <h1 className={styles.introHeading}>
                  Welcome, I'm EMILY
                </h1>
              </div>
              <h1 className={styles.heading}>
                your real estate{' '}
                <span className={styles.advisorWord} aria-label="advisor">
                  adv
                  <span
                    className={styles.houseDotI}
                    aria-hidden="true"
                    style={houseDotStyle}
                  >
                    i
                  </span>
                  sor
                </span>{' '}
                and Portland area expert.
              </h1>

              <p className={styles.bodyCopy}>
                I’m so glad you’re here. Tell me your goals and we’ll build up from there.
              </p>

              <CtaButton href="#" className={styles.cta}>
                Let's Connect
              </CtaButton>
            </div>

            <div className={styles.desktopImageWrapper}>
              <img
                src={imageUrl}
                alt="Emily B"
                className={styles.desktopImage}
              />
            </div>
          </div>

          <div className={styles.mobileImageWrapper}>
            <img
              src={imageUrl}
              alt="Emily B"
              className={styles.mobileImage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
