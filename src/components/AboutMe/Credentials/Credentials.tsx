import { getImageUrl } from '../../../modules/assets/getImageUrl'
import styles from './Credentials.module.css'

const badges = [
  {
    src: getImageUrl('about-badges-first.png'),
    alt: '12 plus years of experience',
  },
  {
    src: getImageUrl('about-badges-second.png'),
    alt: 'Windermere principal broker',
  },
  {
    src: getImageUrl('about-badges-third.png'),
    alt: 'Equal Housing Opportunity',
  },
]

export function AboutCredentials() {
  return (
    <section className={styles.section} aria-labelledby="credentials-title">
      <div className={styles.inner}>
        <h2 id="credentials-title" className={styles.heading}>
          <span>I live what I preach.</span>
          I own 5 properties across Portland Metropolitan.
        </h2>

        <div className={styles.body}>
          <p>I have an intimate and personal relationship with Portland real estate.</p>
          <p>
            This translates to expansive personal experience and knowledge regarding all types of real estate. My objective is to use this knowledge to benefit my clients and be a helpful resource beyond buying and selling your home.
          </p>
        </div>

        <div className={styles.badges} aria-label="Professional credentials">
          {badges.map((badge) => (
            <img key={badge.src} src={badge.src} alt={badge.alt} />
          ))}
        </div>
      </div>
    </section>
  )
}
