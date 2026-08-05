import { getImageUrl } from '../../../modules/assets/getImageUrl'
import { DividerLine } from '../../shared/DividerLine/DividerLine'
import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import { Separator } from '../../shared/Separator/Separator'
import styles from './Hero.module.css'

const heroImageUrl = getImageUrl('about-hero.jpg')

export function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-title">
      <div className={`${styles.inner} ${pageContainerClassName}`}>
        <header className={styles.identity}>
          <h1 id="about-title" className={styles.pageTitle}>ABOUT ME</h1>
          <p className={styles.name}>EMILY BARTOLME</p>
        </header>

        <img
          src={heroImageUrl}
          alt="Emily Bartolme seated at home and holding a mug"
          className={styles.image}
        />

        <Separator className={styles.separator} bottomBackground="#f8f5f2" />

        <div className={styles.intro}>
          <DividerLine width={128} className={styles.divider} />
          <h2 className={styles.heading}>
            I didn&rsquo;t fall into real estate by accident.
          </h2>
          <p className={styles.emphasis}>It&rsquo;s in my genes.</p>
        </div>
      </div>
    </section>
  )
}
