import type { Testimonial } from '../modules/app/appContent'

interface TestimonialCardProps {
  testimonial: Testimonial
  starsImageUrl: string
}

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

export function TestimonialCard({ testimonial, starsImageUrl }: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[28px] border border-white/70 bg-[#fcf7f2] px-6 py-7 lg:px-9 lg:py-8">
      <div className="flex items-center justify-between gap-4">
        <img src={starsImageUrl} alt="5 stars" className="h-5 lg:h-6 w-auto shrink-0" />
        <p className="shrink-0 font-work-sans italic text-text-dark text-base lg:text-[22px] opacity-60">
          {formatPublicationDate(testimonial.publicationDate)}
        </p>
      </div>
      <p
        className="mt-4 font-archivo italic text-text-dark text-[17px] leading-[1.28] lg:text-[22px] lg:leading-[1.22] opacity-90 line-clamp-5"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {testimonial.quote}
      </p>
    </article>
  )
}
