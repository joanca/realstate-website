import { getImageUrl } from '../assets/getImageUrl'

export interface Testimonial {
  quote: string
  publicationDate: string
}

export const heroContent = {
  imageUrl: getImageUrl('emily-no-background.png'),
  houseIconUrl: getImageUrl('house-icon.png'),
}

export const experienceContent = {
  years: '12+',
  label: 'YEARS OF EXPERIENCE',
}

export const testimonials: Testimonial[] = [
  {
    quote: 'What sets Emily apart is her unique blend of calm and determination.',
    publicationDate: '2025-09-24T00:00:00.000Z',
  },
  {
    quote: "I've worked with a number of realtors. Emily is by far the most superior.",
    publicationDate: '2024-11-19T00:00:00.000Z',
  },
  {
    quote: 'Emily has your back, is totally on your side. I cannot recommend her enough.',
    publicationDate: '2024-10-20T00:00:00.000Z',
  },
]

export const testimonialsContent = {
  starsImageUrl: getImageUrl('stars-group.png'),
  allTestimonialsHref: 'https://directory.testimonialtree.com/profiles/5F81F04B-9637-43AB-A0D0-16E0F0E238A4',
}

export const testimonialsSummaryContent = {
  rating: '5.0',
  reviewCountLabel: '(57) Reviews',
  reviewsHref: testimonialsContent.allTestimonialsHref,
}

export const mainPitchContent = {
  plantImageUrl: getImageUrl('main-pitch-plant.png'),
  cupImageUrl: getImageUrl('main-pitch-cup.png'),
  headline: <>I'm your guide,<br /> but <span className="text-[#c43d2f]">your goals</span> and practical needs drive the process.</>,
  paragraphs: [
    'Most of my business comes from referrals, so I work hard for my clients. You can always count me to be honest, strategic and an ally.',
    'I understand that buying or selling a home is a big investment, both financially and emotionally. I have a tried and true process to help you through it.',
    'But I also believe that every sale is unique,<br /> because every person is unique.<br /> Just like Portland houses.',
  ],
}
