import { useEffect } from 'react'
import { ExperienceBar } from '../../components/ExperienceBar'
import { HeroSection } from '../../components/HeroSection'
import { TestimonialsSection } from '../../components/TestimonialsSection'
import { normalizeEmbeddedDom } from '../embed/normalizeEmbeddedDom'
import { experienceContent, heroContent, testimonials, testimonialsContent } from './appContent'

export function AppRoot() {
  useEffect(() => {
    normalizeEmbeddedDom()
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <HeroSection imageUrl={heroContent.imageUrl} arrowUrl={heroContent.arrowUrl} ctaBackgroundUrl={heroContent.ctaBackgroundUrl} />
      <ExperienceBar years={experienceContent.years} label={experienceContent.label} />
      <TestimonialsSection
        testimonials={testimonials}
        starsImageUrl={testimonialsContent.starsImageUrl}
        allTestimonialsHref={testimonialsContent.allTestimonialsHref}
      />
    </div>
  )
}
