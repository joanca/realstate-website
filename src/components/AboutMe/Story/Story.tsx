import { getImageUrl } from '../../../modules/assets/getImageUrl'
import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import { Quote } from '../../shared/Quote/Quote'
import styles from './Story.module.css'

const comingHomeImageUrl = getImageUrl('about-coming-home.jpg')

export function AboutStory() {
  return (
    <section className={styles.section} aria-label="About Emily">
      <div className={`${styles.inner} ${pageContainerClassName}`}>
        <div className={styles.feature}>
          <h2 className={styles.featureHeading}>
            There is something so comfortable and primal about
            <span>coming home.</span>
          </h2>
          <img
            src={comingHomeImageUrl}
            alt="Emily standing beside a white picket fence in front of a Portland home"
            className={styles.featureImage}
          />
        </div>

        <p className={styles.legacy}>
          My grandfather owned and managed multiple properties in Minnesota where I grew up. My father, also, was a real estate agent for a time when I was young. So negotiation, home design and aesthetics have always lingered in the corners of my mind.
        </p>

        <div className={styles.continuation}>
          <p>
            A good home is both a privilege and a life necessity. We all desire the safety and peace of kicking off boots after a long day at work or after returning home from a trip. A home is our refuge.
          </p>
          <p>
            It was through the process of purchasing my first home that I decided I wanted to help others do the same. Now I&rsquo;m a principal broker at the highest volume agency in Portland. Before settling in Portland, I was a bit of a wanderer. Real estate is such serious business. They always say, it&rsquo;s the biggest transaction of your life! It feels so heavy. I certainly don&rsquo;t take buying or selling a house lightly, but does it have to feel like the weight of the world? What if we could do it a different way? What if we can get you fantastic results, dare I say it, and have a little fun?
          </p>
        </div>

        <Quote attribution="Philip O." className={styles.quote}>
          This quote is going to be hard coded. Susan will find which quote we will use.
        </Quote>
      </div>
    </section>
  )
}
