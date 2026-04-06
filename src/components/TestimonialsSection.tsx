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
    <div className="testimonials-surface">
      <section className="py-8 lg:py-12 px-4 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-0">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.quote + index}
              className="flex h-full flex-col rounded-[28px] border border-white/70 bg-[#fcf7f2] px-6 py-7 lg:min-h-[300px] lg:px-9 lg:py-8"
            >
              <div className="flex items-center justify-between gap-4">
                <img src={starsImageUrl} alt="5 stars" className="h-5 lg:h-6 w-auto shrink-0" />
                <p className="shrink-0 font-work-sans italic text-text-dark text-base lg:text-[22px] opacity-60">
                  {formatPublicationDate(testimonial.publicationDate)}
                </p>
              </div>
              <p
                className="mt-5 font-archivo italic text-text-dark text-[17px] leading-[1.28] lg:mt-7 lg:text-[22px] lg:leading-[1.22] opacity-90 line-clamp-5"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {testimonial.quote}
              </p>
            </article>
          ))}
        </div>

        <div className="text-center lg:text-right mt-8">
          <a href={allTestimonialsHref} className="font-work-sans font-medium text-text-dark text-lg lg:text-[22px] underline opacity-80">
            All Testimonials
          </a>
        </div>
      </section>
    </div>
  )
}
