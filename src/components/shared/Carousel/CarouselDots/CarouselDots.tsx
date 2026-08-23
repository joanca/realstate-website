import { useEffect, useRef } from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import styles from './CarouselDots.module.css'

interface CarouselDotsProps {
  carouselApi: UseEmblaCarouselType[1]
}

const DOT_SLIDES = Array.from({ length: 9 }, (_, index) => index)

export function CarouselDots({ carouselApi }: CarouselDotsProps) {
  const [dotsRef, dotsApi] = useEmblaCarousel({ align: 'start', loop: true, watchDrag: false })
  const previousSnapRef = useRef<number | null>(null)

  useEffect(() => {
    if (!carouselApi || !dotsApi) {
      return
    }

    previousSnapRef.current = carouselApi.selectedScrollSnap()
    dotsApi.scrollTo(2, true)

    const syncDots = () => {
      const previousSnap = previousSnapRef.current
      const currentSnap = carouselApi.selectedScrollSnap()

      if (previousSnap === null || previousSnap === currentSnap) {
        previousSnapRef.current = currentSnap
        return
      }

      const totalSnaps = carouselApi.scrollSnapList().length
      const forwardDistance = (currentSnap - previousSnap + totalSnaps) % totalSnaps
      const backwardDistance = (previousSnap - currentSnap + totalSnaps) % totalSnaps

      if (forwardDistance < backwardDistance) {
        dotsApi.scrollNext()
      } else {
        dotsApi.scrollPrev()
      }

      previousSnapRef.current = currentSnap
    }

    carouselApi.on('select', syncDots)

    return () => {
      carouselApi.off('select', syncDots)
    }
  }, [carouselApi, dotsApi])

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.window}>
        <div className={styles.viewport} ref={dotsRef}>
          <div className={styles.track}>
            {DOT_SLIDES.map((dot) => (
              <div key={dot} className={styles.slide}>
                <span className={styles.dot} />
              </div>
            ))}
          </div>
        </div>

        <span className={styles.selectedDot} />
      </div>
    </div>
  )
}
