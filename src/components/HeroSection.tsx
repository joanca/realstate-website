interface HeroSectionProps {
  imageUrl: string
  houseIconUrl: string
}

export function HeroSection({ imageUrl, houseIconUrl }: HeroSectionProps) {
  return (
    <section
      className="hero-surface relative overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 50%, #eeab9e, #eda89a, #eca597, #eaa293, #e99e90, #e89b8c, #e69889, #e59585)',
      }}
    >
      <div className="relative mx-auto max-w-[1440px] lg:px-20 lg:pt-10">
        <div className="relative overflow-hidden rounded-none px-4 py-8 sm:py-10 lg:min-h-[640px] lg:px-0 lg:pt-0 lg:pb-0">
          <div className="relative z-10 flex h-full flex-col lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.72fr)] lg:items-end lg:gap-10">
            <div className="max-w-[60vw] md:max-w-[560px] lg:max-w-[760px] lg:self-center">
              <div className="flex items-center gap-2">
                <h1 className="font-archivo-condensed text-[26px] leading-[0.95] font-bold text-text-dark sm:text-[34px] md:text-[42px] lg:text-[50px]">
                  I'm EMILY,
                </h1>
              </div>
                <h1 className="font-archivo-condensed text-[35px] leading-[0.9] font-extrabold tracking-[-0.175px] text-text-dark sm:text-[46px] sm:tracking-normal md:text-[62px] md:leading-[0.9] lg:max-w-[760px] lg:text-[82px] lg:leading-[0.9] mb-8">
                  your real estate{' '}
                  <span className="whitespace-nowrap" aria-label="advisor">
                  adv
                  <span
                    className="house-dot-i"
                    aria-hidden="true"
                    style={{ ['--house-dot-image' as string]: `url("${houseIconUrl}")` }}
                  >
                    i
                  </span>
                  sor
                  </span>{' '}
                  and Portland <br /> know-it-all.
                </h1>

              <p className="mb-8 font-work-sans text-base leading-[1.2] text-text-green opacity-90 sm:my-6 sm:text-lg max-w-[250px] md:max-w-[470px] md:text-xl lg:my-10 lg:max-w-[610px] lg:text-2xl lg:leading-[1.2] lg:text-text-dark">
              I’m so happy you’re here.<br />
Tell me your goals — we’ll build up from there. 
              </p>

              <a
                href="#"
                className="inline-block rounded-[32px] border-text-dark px-5 py-3 px-4 lg:px-8 mb-8 md:my-0"
                style={{
                  backgroundColor: '#c44d2f',
                  backgroundRepeat: 'round',
                }}
              >
                <span className="font-work-sans text-lg font-medium text-white text-[15px] lg:text-[28px]">
                  Let's Connect
                </span>
              </a>
            </div>

            <div className="relative hidden h-full lg:flex lg:items-end lg:justify-end">
              <img
                src={imageUrl}
                alt="Emily B"
                className="h-auto w-[380px] max-w-none object-cover xl:w-[430px]"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute right-[-50px] bottom-0 z-0 lg:hidden">
            <img
              src={imageUrl}
              alt="Emily B"
              className="h-auto max-w-none object-cover w-[230px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
