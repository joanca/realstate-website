import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Buying } from './Buying'

describe('Buying', () => {
  it('renders the buying page content and images', () => {
    render(<Buying />)

    expect(screen.getByRole('heading', { name: 'BUYING', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /nobody likes a salesperson/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /buy the right house/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /craftsman house/i })).toHaveAttribute('src', expect.stringContaining('buying-hero.png'))
    expect(screen.getByRole('img', { name: /victorian house/i })).toHaveAttribute('src', expect.stringContaining('buying-hero-bottom.png'))
    expect(screen.getByText(/a hardcoded quote/i)).toBeInTheDocument()
  })

  it('ends with the shared contact call to action', () => {
    render(<Buying />)

    expect(screen.getByRole('region', { name: 'Contact' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /let.s connect/i })).toBeInTheDocument()
  })
})
