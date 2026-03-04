import { useEffect } from 'react'
import { ExperienceBar } from './components/ExperienceBar'
import { HeroSection } from './components/HeroSection'
import { Listings } from './components/Listings'
import { TestimonialsSection } from './components/TestimonialsSection'
import { normalizeEmbeddedDom } from './modules/embed/normalizeEmbeddedDom'
import { experienceContent, heroContent, testimonials, testimonialsContent } from './modules/app/appContent'

export default function App() {
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
      <Listings />
    </div>
  )
}
