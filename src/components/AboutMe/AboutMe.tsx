import { Contact } from '../shared/Contact/Contact'
import { Separator } from '../shared/Separator/Separator'
import { AboutCredentials } from './Credentials/Credentials'
import { AboutHero } from './Hero/Hero'
import { AboutOutcomeBanner } from './OutcomeBanner/OutcomeBanner'
import { AboutStory } from './Story/Story'
import styles from './AboutMe.module.css'

export function AboutMe() {
  return (
    <main className={styles.page}>
      <AboutHero />
      
      <Separator className={styles.separator} bottomBackground="#f8f5f2" />

      <AboutStory />

      <Separator bottomBackground="#eee7e1" />

      <AboutCredentials />
      <AboutOutcomeBanner />
      <Contact />
    </main>
  )
}
