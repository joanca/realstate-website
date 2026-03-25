import { useTestimonials } from '../hooks/useTestimonials'
import { testimonialsContent } from '../modules/app/appContent'
import { TestimonialsLoading } from './TestimonialsLoading'

function formatPublicationDate(value: string): string {
  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function TestimonialsSection() {
  const { testimonials, loading } = useTestimonials()
  const { starsImageUrl, allTestimonialsHref } = testimonialsContent

  if (loading) {
    return <TestimonialsLoading />
  }

  return (
    <section className="py-8 lg:py-12 px-4 lg:px-20 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-0">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.quote + index} className="flex flex-col">
            <div className="flex items-center justify-between mt-2 lg:mt-4">
              <img src={starsImageUrl} alt="5 stars" className="h-5" />
              <p className="font-work-sans italic text-text-dark text-base lg:text-[22px] opacity-80">{formatPublicationDate(testimonial.publicationDate)}</p>
            </div>
            <p className="font-archivo italic text-text-dark text-[17px] lg:text-[22px] leading-[23px] lg:leading-7 opacity-90 line-clamp-3 mt-2 lg:mt-4" style={{ fontVariationSettings: "'wdth' 100" }}>
              {testimonial.quote}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center lg:text-right mt-8">
        <a href={allTestimonialsHref} className="font-work-sans font-medium text-text-dark text-lg lg:text-[22px] underline opacity-80">
          All Testimonials
        </a>
      </div>
    </section>
  )
}
