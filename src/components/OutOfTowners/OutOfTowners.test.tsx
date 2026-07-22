import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { outOfTownersContent } from '../../modules/app/appContent'
import { OutOfTowners } from './OutOfTowners'
import styles from './OutOfTowners.module.css'

describe('OutOfTowners', () => {
  it('renders the out of towners section from app content', () => {
    render(<OutOfTowners />)

    expect(screen.getByRole('region', { name: 'Out of towners' })).toHaveClass(styles.surface)
    expect(screen.getByText(outOfTownersContent.eyebrow)).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Let’s find you a home in the right neighborhood — even if you only have one weekend to visit.',
    )
    expect(screen.getByText(outOfTownersContent.label)).toBeInTheDocument()
    expect(screen.getByText(outOfTownersContent.body)).toBeInTheDocument()
  })

  it('renders the Oregon map asset and secondary guide link', () => {
    render(<OutOfTowners />)

    expect(screen.getByRole('img', { name: outOfTownersContent.mapAlt })).toHaveAttribute(
      'src',
      outOfTownersContent.mapImageUrl,
    )
    expect(screen.getByRole('link', { name: outOfTownersContent.ctaLabel })).toHaveAttribute(
      'href',
      outOfTownersContent.ctaHref,
    )
  })
})
