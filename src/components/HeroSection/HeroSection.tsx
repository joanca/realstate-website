import type { CSSProperties } from 'react'
import { CtaButton } from '../shared/CtaButton/CtaButton'
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
      <div className={styles.container}>
        <div className={styles.surface}>
          <div className={styles.content}>
            <div className={styles.copy}>
              <div className={styles.introRow}>
                <h1 className={styles.introHeading}>
                  I'm EMILY,
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
                and Portland <br /> know-it-all.
              </h1>

              <p className={styles.bodyCopy}>
                I’m so happy you’re here.<br />
                Tell me your goals — we’ll build up from there.
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
