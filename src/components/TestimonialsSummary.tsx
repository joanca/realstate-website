interface TestimonialsSummaryProps {
  rating: string
  reviewCountLabel: string
  reviewsHref: string
  starsImageUrl: string
}

export function TestimonialsSummary({ rating, reviewCountLabel, reviewsHref, starsImageUrl }: TestimonialsSummaryProps) {
  return (
    <div className="mb-8 flex items-center justify-center gap-3 text-text-dark lg:mb-12 lg:gap-5">
      <div className="h-px flex-1 max-w-[170px] bg-[#d9cec5] lg:max-w-none" aria-hidden="true" />
      <div className="flex items-center justify-center gap-3 whitespace-nowrap lg:gap-5">
        <p className="font-work-sans text-[28px] leading-none tracking-[-0.02em] lg:text-[58px]">{rating}</p>
        <img src={starsImageUrl} alt="5 stars" className="h-6 w-auto shrink-0 lg:h-8" />
        <div className="h-8 w-px bg-[#d9cec5] lg:h-12" aria-hidden="true" />
        <a
          href={reviewsHref}
          className="font-work-sans text-[18px] leading-none underline underline-offset-4 lg:text-[34px]"
        >
          {reviewCountLabel}
        </a>
      </div>
      <div className="h-px flex-1 max-w-[170px] bg-[#d9cec5] lg:max-w-none" aria-hidden="true" />
    </div>
  )
}
