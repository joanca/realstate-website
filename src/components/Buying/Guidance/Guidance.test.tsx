import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BuyingGuidance } from './Guidance'

describe('BuyingGuidance', () => {
  it('renders the buying guidance and quote', () => {
    render(<BuyingGuidance />)

    expect(screen.getByRole('region', { name: 'Buying guidance' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /there.s enough stress/i })).toBeInTheDocument()
    expect(screen.getByText(/my experience and knowledge/i)).toBeInTheDocument()
    expect(screen.getByText(/a hardcoded quote/i)).toBeInTheDocument()
    expect(screen.getByText(/customer/i)).toBeInTheDocument()
  })
})
