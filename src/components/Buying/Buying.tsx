import { BuyingGuidance } from './Guidance/Guidance'
import { BuyingHero } from './Hero/Hero'
import { BuyingOutcomeBanner } from './OutcomeBanner/OutcomeBanner'
import { BuyingStrategy } from './Strategy/Strategy'
import { Contact } from '../shared/Contact/Contact'
import { Separator } from '../shared/Separator/Separator'
import styles from './Buying.module.css'

export function Buying() {
  return (
    <main className={styles.page}>
      <BuyingHero />

      <Separator bottomBackground="#f8f5f2" />

      <BuyingGuidance />

      <Separator bottomBackground="#eee7e1" />

      <BuyingStrategy />

      <BuyingOutcomeBanner />

      <Contact />
    </main>
  )
}
