export function TestimonialsLoading() {
  return (
    <section className="py-8 lg:py-12 px-4 lg:px-20 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col animate-pulse">
            <div className="h-20 bg-brand-blue/30 rounded" />
            <div className="flex items-center gap-4 mt-2 lg:mt-4">
              <div className="h-5 w-24 bg-brand-blue/30 rounded" />
              <div className="h-5 w-20 bg-brand-blue/30 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center lg:text-right mt-8">
        <div className="h-6 w-32 bg-brand-blue/30 rounded inline-block" />
      </div>
    </section>
  )
}
