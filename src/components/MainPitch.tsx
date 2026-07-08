import type { CSSProperties } from 'react'
import { heroContent, mainPitchContent } from '../modules/app/appContent'

export function MainPitch() {
  const backgroundImages = {
    '--main-pitch-plant-image': `url("${mainPitchContent.plantImageUrl}")`,
    '--main-pitch-cup-image': `url("${mainPitchContent.cupImageUrl}")`,
  } as CSSProperties

  return (
    <section
      aria-label="Main pitch"
      className="main-pitch-surface relative overflow-hidden px-4 p-[42px] pb-0 text-text-dark sm:px-8 lg:px-20 lg:p-[96px]"
      style={backgroundImages}
    >
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1440px] flex-col items-center text-center lg:min-h-[760px]">
        <div className="relative z-10 flex max-w-[780px] flex-col items-center">
          <h2 className="whitespace-pre-line font-archivo-condensed text-[35px] leading-[0.92] font-bold tracking-[-0.02em] sm:text-[52px] lg:text-[70px]">
            {mainPitchContent.headline}
          </h2>

          <div className="m-[42px] h-1 w-28 bg-[#dd1f3a] lg:m-[56px] lg:w-36" aria-hidden="true" />

          <div className="flex max-w-[660px] flex-col gap-9 font-work-sans text-[16px] leading-[1.5] tracking-[0.04em] sm:text-[20px] lg:text-[24px] lg:leading-[1.55]">
            {mainPitchContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <img src={heroContent.houseIconUrl} alt="" className="m-[22px] h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
