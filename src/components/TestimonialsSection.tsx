import { useTestimonials } from '../hooks/useTestimonials'
import { testimonialsContent } from '../modules/app/appContent'
import { TestimonialsLoading } from './TestimonialsLoading'

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
          <div key={testimonial.author + index} className="flex flex-col">
            <p className="font-archivo italic text-text-dark text-[17px] lg:text-[22px] leading-[23px] lg:leading-7 opacity-90 line-clamp-3" style={{ fontVariationSettings: "'wdth' 100" }}>
              {testimonial.quote}
            </p>
            <div className="flex items-center gap-4 mt-2 lg:mt-4">
              <img src={starsImageUrl} alt="5 stars" className="h-5" />
              <p className="font-work-sans italic text-text-dark text-base lg:text-[22px] opacity-80">{testimonial.author}</p>
            </div>
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
