import { useEffect, useLayoutEffect } from 'react'
import { ExperienceBar } from './components/ExperienceBar'
import { HeroSection } from './components/HeroSection'
import { Listings } from './components/Listings'
import { Separator } from './components/Separator'
import { TestimonialsSection } from './components/TestimonialsSection'
import { normalizeEmbeddedDom } from './modules/embed/normalizeEmbeddedDom'
import { experienceContent, heroContent } from './modules/app/appContent'

export default function App() {
  useLayoutEffect(() => {
    document.documentElement.removeAttribute('data-emily-loading')
    document.getElementById('emily-preload-hide')?.remove()
  }, [])

  useEffect(() => {
    normalizeEmbeddedDom()
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <div style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FFFAF3 0%, #FFEED4 100%)' }}>
        <HeroSection imageUrl={heroContent.imageUrl} arrowUrl={heroContent.arrowUrl} ctaBackgroundUrl={heroContent.ctaBackgroundUrl} />
        <Separator />
      </div>
      <ExperienceBar years={experienceContent.years} label={experienceContent.label} />
      <TestimonialsSection />
      <Listings />
    </div>
  )
}
