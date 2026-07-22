import { CtaButton } from '../shared/CtaButton/CtaButton'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section className={styles.surface} aria-label="Contact">
      <p className={styles.prompt}>Ready to get started?</p>
      <CtaButton href="#" className={styles.button}>
        Let&rsquo;s Connect
      </CtaButton>
    </section>
  )
}
