import { useEffect, useLayoutEffect } from 'react'
import { HeroSection } from './components/HeroSection'
import { MainPitch } from './components/MainPitch'
import { Separator } from './components/Separator/Separator'
import { TestimonialsSection } from './components/TestimonialsSection'
import { normalizeEmbeddedDom } from './modules/embed/normalizeEmbeddedDom'
import { heroContent } from './modules/app/appContent'

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
      <HeroSection
        imageUrl={heroContent.imageUrl}
        houseIconUrl={heroContent.houseIconUrl}
      />
      <Separator />
      <TestimonialsSection />
      <Separator bottomBackground="#eee7e1" />
      <MainPitch />
    </div>
  )
}
