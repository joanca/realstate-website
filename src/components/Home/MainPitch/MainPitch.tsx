import type { CSSProperties } from 'react'
import { heroContent, mainPitchContent } from '../../../modules/app/appContent'
import { DividerLine } from '../../shared/DividerLine/DividerLine'
import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
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
      <div className={`${styles.content} ${pageContainerClassName}`}>
        <div className={styles.copy}>
          <h2 className={styles.heading}>
            {mainPitchContent.headline}
          </h2>

          <DividerLine width={144} className={styles.divider} />

          <div className={styles.paragraphs}>
            {mainPitchContent.paragraphs.map((paragraph) => (
              <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>

          <img src={heroContent.houseIconUrl} alt="" className={styles.icon} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
