import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import { BuyingHero } from './Hero'

describe('BuyingHero', () => {
  it('renders the buying introduction and hero image', () => {
    render(<BuyingHero />)

    const pageTitle = screen.getByRole('heading', { name: 'BUYING', level: 1 })

    expect(pageTitle.parentElement).toHaveClass(pageContainerClassName)
    expect(screen.getByRole('heading', { name: /nobody likes a salesperson/i })).toBeInTheDocument()
    expect(screen.getByText(/not talk you into buying a house/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /craftsman house/i })).toHaveAttribute(
      'src',
      expect.stringContaining('buying-hero.png'),
    )
  })
})
