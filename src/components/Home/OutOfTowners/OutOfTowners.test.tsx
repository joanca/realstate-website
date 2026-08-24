import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { outOfTownersContent } from '../../../modules/app/appContent'
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

    const map = screen.getByRole('img', { name: outOfTownersContent.mapAlt })
    const guideLink = screen.getByRole('link', { name: outOfTownersContent.ctaLabel })
    const cardPanel = map.parentElement

    expect(map).toHaveAttribute(
      'src',
      outOfTownersContent.mapImageUrl,
    )
    expect(guideLink).toHaveAttribute('href', outOfTownersContent.ctaHref)
    expect(cardPanel).toHaveClass(styles.cardPanel)
    expect(cardPanel).toContainElement(screen.getByText(outOfTownersContent.body))
    expect(cardPanel).not.toContainElement(guideLink)
  })
})
