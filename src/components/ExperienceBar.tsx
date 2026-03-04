interface ExperienceBarProps {
  years: string
  label: string
}

export function ExperienceBar({ years, label }: ExperienceBarProps) {
  return (
    <section className="bg-brand-blue border-y-2 border-text-dark border-solid tracking-[2px]">
      <div className="text-center">
        <span className="font-archivo-semi-expanded font-bold text-text-dark text-[14px] lg:text-[20px] opacity-80">{years}</span>
        <span className="font-archivo-semi-expanded font-medium text-text-dark text-[14px] lg:text-[18px] opacity-70"> {label}</span>
      </div>
    </section>
  )
}
