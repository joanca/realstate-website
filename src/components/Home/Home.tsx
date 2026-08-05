import { heroContent } from "../../modules/app/appContent";
import { Contact } from "../shared/Contact/Contact";
import { HeroSection } from "./HeroSection/HeroSection";
import { MainPitch } from "./MainPitch/MainPitch";
import { OutOfTowners } from "./OutOfTowners/OutOfTowners";
import { Services } from "./Services/Services";
import { Separator } from "../shared/Separator/Separator";
import { TestimonialsSection } from "./TestimonialsSection/TestimonialsSection";

export function HomeRoute() {
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