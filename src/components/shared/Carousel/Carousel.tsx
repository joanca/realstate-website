import { type ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { CarouselDots } from './CarouselDots/CarouselDots'
import styles from './Carousel.module.css'

interface CarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  ariaLabel: string
}

export function Carousel<T>({ items, renderItem, ariaLabel }: CarouselProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true })

  if (items.length === 0) {
    return null
  }

  return (
    <div className={styles.root} aria-label={ariaLabel} role="region">
      <div className={styles.frame}>
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous testimonial"
          className={`${styles.arrowButton} ${styles.previousArrow}`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.arrowIcon} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 6.5L9 12l5.5 5.5" />
          </svg>
        </button>

        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles['carousel-track']}>
            {items.map((item, index) => (
              <div key={index} className={styles['carousel-slide']}>
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next testimonial"
          className={`${styles.arrowButton} ${styles.nextArrow}`}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className={styles.arrowIcon} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 6.5L15 12l-5.5 5.5" />
          </svg>
        </button>
      </div>

      <CarouselDots carouselApi={emblaApi} />
    </div>
  )
}
