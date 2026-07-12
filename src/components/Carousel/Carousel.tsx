import { type ReactNode, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './Carousel.module.css'

interface CarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  ariaLabel: string
}

const DOT_SLIDES = Array.from({ length: 9 }, (_, index) => index)

export function Carousel<T>({ items, renderItem, ariaLabel }: CarouselProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true })
  const [dotsEmblaRef, dotsEmblaApi] = useEmblaCarousel({ align: 'start', loop: true, watchDrag: false })
  const previousSnapRef = useRef<number | null>(null)

  useEffect(() => {
    if (!emblaApi || !dotsEmblaApi) {
      return
    }

    previousSnapRef.current = emblaApi.selectedScrollSnap()
    dotsEmblaApi.scrollTo(2, true)

    const syncDots = () => {
      const previousSnap = previousSnapRef.current
      const currentSnap = emblaApi.selectedScrollSnap()

      if (previousSnap === null || previousSnap === currentSnap) {
        previousSnapRef.current = currentSnap
        return
      }

      const totalSnaps = emblaApi.scrollSnapList().length
      const forwardDistance = (currentSnap - previousSnap + totalSnaps) % totalSnaps
      const backwardDistance = (previousSnap - currentSnap + totalSnaps) % totalSnaps

      if (forwardDistance < backwardDistance) {
        dotsEmblaApi.scrollNext()
      } else {
        dotsEmblaApi.scrollPrev()
      }

      previousSnapRef.current = currentSnap
    }

    emblaApi.on('select', syncDots)

    return () => {
      emblaApi.off('select', syncDots)
    }
  }, [emblaApi, dotsEmblaApi])

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

      <div className={styles.dotsWrapper} aria-hidden="true">
        <div className={styles.dotsWindow}>
          <div className={styles.viewport} ref={dotsEmblaRef}>
            <div className={styles['carousel-dots-track']}>
              {DOT_SLIDES.map((dot) => (
                <div key={dot} className={styles['carousel-dots-slide']}>
                  <span className={styles.dot} />
                </div>
              ))}
            </div>
          </div>

          <span className={styles.selectedDot} />
        </div>
      </div>
    </div>
  )
}
