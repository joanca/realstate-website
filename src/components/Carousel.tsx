import { type ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

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
    <div className="relative" aria-label={ariaLabel} role="region">
      <div className="relative px-6 lg:px-12">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 z-10 flex h-6 w-6 lg:h-12 lg:w-12 -translate-x-1/4 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(196,77,47,1)] text-white lg:-translate-x-1/2"
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
          className="absolute right-0 top-1/2 z-10 flex h-6 w-6 lg:h-12 lg:w-12 translate-x-1/4 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(196,77,47,1)] text-white lg:translate-x-1/2"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[32px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 6.5L15 12l-5.5 5.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
