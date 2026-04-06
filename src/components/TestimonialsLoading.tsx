export function TestimonialsLoading() {
  return (
    <div className="testimonials-surface">
      <section className="py-8 lg:py-12 px-4 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex min-h-[260px] flex-col rounded-[28px] border border-white/70 bg-[#fcf7f2] px-6 py-7 animate-pulse lg:min-h-[300px] lg:px-9 lg:py-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="h-5 w-28 rounded-full bg-[#ead8c8]/70 lg:h-6 lg:w-32" />
                <div className="h-5 w-20 rounded-full bg-[#ead8c8]/70 lg:w-28" />
              </div>
              <div className="mt-5 space-y-3 lg:mt-7">
                <div className="h-5 w-full rounded-full bg-[#ead8c8]/70 lg:h-6" />
                <div className="h-5 w-[92%] rounded-full bg-[#ead8c8]/70 lg:h-6" />
                <div className="h-5 w-[88%] rounded-full bg-[#ead8c8]/70 lg:h-6" />
                <div className="h-5 w-[74%] rounded-full bg-[#ead8c8]/70 lg:h-6" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center lg:text-right mt-8">
          <div className="h-6 w-32 bg-brand-blue/30 rounded inline-block" />
        </div>
      </section>
    </div>
  )
}
