interface HeroSectionProps {
  imageUrl: string
  arrowUrl: string
  ctaBackgroundUrl: string
}

export function HeroSection({ imageUrl, arrowUrl, ctaBackgroundUrl }: HeroSectionProps) {
  return (
    <section className="relative" style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FFFAF3 0%, #FFEED4 100%)' }}>
      <div className="relative mx-auto px-4 lg:px-20 py-[2.2rem] max-w-[1440px]">
        <div className="flex flex-col lg:flex-row lg:items-start">
          <div className="w-full lg:w-2/3 lg:pr-16">
            <div className="flex flex-row lg:flex-col items-center lg:items-start">
              <div className="flex-[0.8] lg:flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-archivo-condensed font-bold text-text-dark text-xl md:text-[50px] lg:text-[50px] lg:leading-none">
                    I'm EMILY,
                  </h1>
                </div>
                <h1 className="font-archivo-condensed font-extrabold text-text-dark text-[35px] leading-[30px] md:text-[80px] md:leading-[65px] lg:text-[80px] lg:leading-[65px] tracking-[-0.175px] lg:tracking-none lg:max-w-none">
                  your real estate{' '}
                  <span className="whitespace-nowrap" aria-label="advisor">
                    adv<span className="house-dot-i" aria-hidden="true">i</span>sor
                  </span>{' '}
                  and Portland area expert.
                </h1>
              </div>
              <div className="flex-[1.2] lg:flex-1 flex-shrink-0 lg:hidden ml-4">
                <img src={imageUrl} alt="Emily B" className="object-cover" />
              </div>
            </div>
            <p className="font-work-sans text-text-green lg:text-text-dark text-lg lg:text-2xl mt-6 lg:mt-10 max-w-[520px] opacity-90">
              I provide a custom approach based on <span className="font-work-sans font-medium">your unique</span> needs and goals.
            </p>
            <div className="my-6 lg:my-8">
              <a href="#" className="flex items-center gap-3 font-work-sans font-medium text-brand-orange text-lg lg:text-2xl">
                My Philosophy &amp; Methods
                <img src={arrowUrl} alt="" className="w-[9px] h-4 mt-[1px]" />
              </a>
            </div>
            <a
              href="#"
              className="inline-block border-2 border-text-dark rounded-[36px] px-8 lg:px-8 py-3 lg:py-5"
              style={{
                backgroundColor: '#bd760c',
                backgroundImage: `url('${ctaBackgroundUrl}')`,
                backgroundRepeat: 'round',
              }}
            >
              <span className="font-work-sans font-medium text-white text-xl lg:text-[28px]">CONTACT ME</span>
            </a>
          </div>
          <div className="hidden lg:flex justify-end w-1/3">
            <img src={imageUrl} alt="Emily B" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
