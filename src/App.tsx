import { useEffect, useLayoutEffect } from 'react'
import { HeroSection } from './components/HeroSection'
import { Listings } from './components/Listings'
import { Separator } from './components/Separator'
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
      <HeroSection imageUrl={heroContent.imageUrl} />
      <Separator />
      <TestimonialsSection />
      <Listings />
    </div>
  )
}
