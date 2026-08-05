import { servicesContent } from '../../../modules/app/appContent'
import { DividerLine } from '../../shared/DividerLine/DividerLine'
import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import styles from './Services.module.css'

export function Services() {
  return (
    <section className={styles.surface} aria-label="Services">
      <div className={`${styles.content} ${pageContainerClassName}`}>
        <div className={styles.imageFrame}>
          <img src={servicesContent.imageUrl} alt="Emily in a home kitchen" className={styles.image} />
        </div>

        <div className={styles.body}>
          <div className={styles.header}>
            <h2 className={styles.heading}>{servicesContent.headline}</h2>
            <DividerLine width={94} className={styles.divider} />
          </div>

          <div className={styles.cards}>
            {servicesContent.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={[styles.card, item.featured ? styles.featuredCard : undefined]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className={styles.iconShell}>
                  <img src={item.iconUrl} alt="" className={styles.icon} aria-hidden="true" />
                </span>
                <div className={styles.labelContainer}>

                <span className={styles.label}>
                  {item.label}
                </span>
                {item.note ? <span className={styles.note}>{item.note}</span> : null}
                </div>
                <span className={styles.arrow} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
