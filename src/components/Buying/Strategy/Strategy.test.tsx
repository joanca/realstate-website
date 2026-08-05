import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BuyingStrategy } from './Strategy'

describe('BuyingStrategy', () => {
  it('renders the buying strategy and property image', () => {
    render(<BuyingStrategy />)

    expect(screen.getByRole('region', { name: 'Buying strategy' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /buy the right house/i })).toBeInTheDocument()
    expect(screen.getByText(/never want my clients overpaying/i)).toBeInTheDocument()
    expect(screen.getByText(/my honest, informed insights/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /victorian house/i })).toHaveAttribute(
      'src',
      expect.stringContaining('buying-hero-bottom.png'),
    )
  })
})
