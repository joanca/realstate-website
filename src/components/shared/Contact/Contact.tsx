import { CtaButton } from '../CtaButton/CtaButton'
import { pageContainerClassName } from '../PageLayout/PageLayout'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section className={styles.surface} aria-label="Contact">
      <div className={`${styles.inner} ${pageContainerClassName}`}>
        <p className={styles.prompt}>Ready to get started?</p>
        <CtaButton href="#" className={styles.button}>
          Let&rsquo;s Connect
        </CtaButton>
      </div>
    </section>
  )
}
