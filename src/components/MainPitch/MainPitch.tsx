import type { CSSProperties } from 'react'
import { heroContent, mainPitchContent } from '../../modules/app/appContent'
import styles from './MainPitch.module.css'

export function MainPitch() {
  const backgroundImages = {
    '--main-pitch-plant-image': `url("${mainPitchContent.plantImageUrl}")`,
    '--main-pitch-cup-image': `url("${mainPitchContent.cupImageUrl}")`,
  } as CSSProperties

  return (
    <section
      aria-label="Main pitch"
      className={styles.surface}
      style={backgroundImages}
    >
      <div className={styles.content}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>
            {mainPitchContent.headline}
          </h2>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.paragraphs}>
            {mainPitchContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <img src={heroContent.houseIconUrl} alt="" className={styles.icon} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
