import { type ReactNode, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

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
    <div className="relative" aria-label={ariaLabel} role="region">
      <div className="relative px-6 lg:px-12">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 z-10 flex h-6 w-6 -translate-x-1/4 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(196,77,47,1)] text-white lg:h-12 lg:w-12 lg:-translate-x-1/2"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[32px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 6.5L9 12l5.5 5.5" />
          </svg>
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="carousel-track">
            {items.map((item, index) => (
              <div key={index} className="carousel-slide">
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next testimonial"
          className="absolute right-0 top-1/2 z-10 flex h-6 w-6 translate-x-1/4 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(196,77,47,1)] text-white lg:h-12 lg:w-12 lg:translate-x-1/2"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[32px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 6.5L15 12l-5.5 5.5" />
          </svg>
        </button>
      </div>

      <div className="mt-8 flex justify-center" aria-hidden="true">
        <div className="relative w-[78px] overflow-hidden">
          <div className="overflow-hidden" ref={dotsEmblaRef}>
            <div className="carousel-dots-track">
              {DOT_SLIDES.map((dot) => (
                <div key={dot} className="carousel-dots-slide">
                  <span className="block h-2.5 w-2.5 rounded-full bg-[#d9d9d9]" />
                </div>
              ))}
            </div>
          </div>

          <span className="pointer-events-none absolute left-1/2 top-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5b1f10]" />
        </div>
      </div>
    </div>
  )
}
