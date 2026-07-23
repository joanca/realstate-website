import { createFileRoute } from '@tanstack/react-router'
import { Contact } from '../components/Contact/Contact'
import { HeroSection } from '../components/HeroSection/HeroSection'
import { MainPitch } from '../components/MainPitch/MainPitch'
import { OutOfTowners } from '../components/OutOfTowners/OutOfTowners'
import { Separator } from '../components/shared/Separator/Separator'
import { Services } from '../components/Services/Services'
import { TestimonialsSection } from '../components/TestimonialsSection/TestimonialsSection'
import { heroContent } from '../modules/app/appContent'

function HomeRoute() {
  return (
    <>
      <HeroSection
        imageUrl={heroContent.imageUrl}
        houseIconUrl={heroContent.houseIconUrl}
      />
      <Separator />
      <TestimonialsSection />
      <Separator bottomBackground="#eee7e1" />
      <MainPitch />
      <Services />
      <OutOfTowners />
      <Separator bottomBackground="#f8f4f1" />
      <Contact />
    </>
  )
}

export const Route = createFileRoute('/')({
  component: HomeRoute,
})
