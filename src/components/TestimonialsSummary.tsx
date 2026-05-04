interface TestimonialsSummaryProps {
  rating: string
  reviewCountLabel: string
  reviewsHref: string
  starsImageUrl: string
}

export function TestimonialsSummary({ rating, reviewCountLabel, reviewsHref, starsImageUrl }: TestimonialsSummaryProps) {
  return (
    <div className="mb-8 flex items-center justify-center gap-3 text-text-dark lg:mb-12 lg:gap-5  px-8 lg:px-12">
      <div className="h-px flex-1 max-w-[170px] bg-[#d9cec5] lg:max-w-none" aria-hidden="true" />
      <div className="flex items-center justify-center gap-3 whitespace-nowrap lg:gap-5 text-[25px] lg:text-[35px]">
        <p className="font-work-sans leading-none tracking-[-0.02em] font-[500]">{rating}</p>
        <img src={starsImageUrl} alt="5 stars" className="h-5 lg:h-6 w-auto shrink-0" />
        <div className="h-8 w-px bg-[#d9cec5] lg:h-12" aria-hidden="true" />
        <a
          href={reviewsHref}
          className="font-work-sansleading-none underline underline-offset-4"
        >
          {reviewCountLabel}
        </a>
      </div>
      <div className="h-px flex-1 max-w-[170px] bg-[#d9cec5] lg:max-w-none" aria-hidden="true" />
    </div>
  )
}
