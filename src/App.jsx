import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const main = document.querySelector('main#emily-realestate');
    if (main) {
      let parent = main.parentElement;
      while (parent) {
        parent.classList.remove('container');
        parent = parent.parentElement;
      }
    }
  }, []);

  return (
    <>
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
                      adv<span className="house-dot-i" aria-hidden="true">ı</span>sor
                    </span>{' '}
                    and Portland area expert.
                  </h1>
                </div>
                <div className="flex-[1.2] lg:flex-1 flex-shrink-0 lg:hidden ml-4">
                  <img src="assets/images/emily-circle.png" alt="Emily B" className="object-cover" />
                </div>
              </div>
              <p className="font-work-sans text-text-green lg:text-text-dark text-lg lg:text-2xl mt-6 lg:mt-10 max-w-[520px] opacity-90">
                I provide a custom approach based on{' '}
                <span className="font-work-sans font-medium">your unique</span> needs and goals.
              </p>
              <div className="my-6 lg:my-8">
                <a href="#" className="flex items-center gap-3 font-work-sans font-medium text-brand-orange text-lg lg:text-2xl">
                  My Philosophy &amp; Methods
                  <img src="assets/images/arrow.png" alt="" className="w-[9px] h-4 mt-[1px]" />
                </a>
              </div>
              <a
                href="#"
                className="inline-block border-2 border-text-dark rounded-[36px] px-8 lg:px-8 py-3 lg:py-5"
                style={{
                  backgroundColor: '#bd760c',
                  backgroundImage: "url('assets/images/button-large.png')",
                  backgroundRepeat: 'round',
                }}
              >
                <span className="font-work-sans font-medium text-white text-xl lg:text-[28px]">
                  CONTACT ME
                </span>
              </a>
            </div>
            <div className="hidden lg:flex justify-end w-1/3">
              <img src="assets/images/emily-circle.png" alt="Emily B" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-blue border-y-2 border-text-dark tracking-[2px]">
        <div className="text-center">
          <span className="font-archivo-semi-expanded font-bold text-text-dark text-[14px] lg:text-[20px] opacity-80">12+</span>
          <span className="font-archivo-semi-expanded font-medium text-text-dark text-[14px] lg:text-[18px] opacity-70">  YEARS OF EXPERIENCE</span>
        </div>
      </section>

      <section className="py-8 lg:py-12 px-4 lg:px-0 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-0">
          <div className="flex flex-col">
            <p className="font-archivo italic text-text-dark text-[17px] lg:text-[22px] leading-[23px] lg:leading-7 opacity-90" style={{ fontVariationSettings: "'wdth' 100" }}>
              What sets Emily apart is her unique blend of calm and determination.
            </p>
            <div className="flex items-center gap-4 mt-2 lg:mt-4">
              <img src="assets/images/stars-group.png" alt="5 stars" className="h-5" />
              <p className="font-work-sans italic text-text-dark text-base lg:text-[22px] opacity-80">Philip O.</p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-archivo italic text-text-dark text-[17px] lg:text-[22px] leading-[23px] lg:leading-7 opacity-90" style={{ fontVariationSettings: "'wdth' 100" }}>
              I've worked with a number of realtors. Emily is by far the most superior.
            </p>
            <div className="flex items-center gap-4 mt-2 lg:mt-4">
              <img src="assets/images/stars-group.png" alt="5 stars" className="h-5" />
              <p className="font-work-sans italic text-text-dark text-base lg:text-[22px] opacity-80">Kris P.</p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-archivo italic text-text-dark text-[17px] lg:text-[22px] leading-[23px] lg:leading-7 opacity-90" style={{ fontVariationSettings: "'wdth' 100" }}>
              Emily has your back, is totally on your side. I cannot recommend her enough.
            </p>
            <div className="flex items-center gap-4 mt-2 lg:mt-4">
              <img src="assets/images/stars-group.png" alt="5 stars" className="h-5" />
              <p className="font-work-sans italic text-text-dark text-base lg:text-[22px] opacity-80">Nicole E.</p>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-right mt-8">
          <a href="https://directory.testimonialtree.com/profiles/5F81F04B-9637-43AB-A0D0-16E0F0E238A4" className="font-work-sans font-medium text-text-dark text-lg lg:text-[22px] underline opacity-80">
            All Testimonials
          </a>
        </div>
      </section>
    </>
  );
}
