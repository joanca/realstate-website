import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BuyingOutcomeBanner } from './OutcomeBanner'

describe('BuyingOutcomeBanner', () => {
  it('renders the buying outcome message', () => {
    render(<BuyingOutcomeBanner />)

    expect(screen.getByRole('region', { name: 'Buying outcome' })).toBeInTheDocument()
    expect(screen.getByText('Bottom line, I work hard to ensure happy outcomes.')).toBeInTheDocument()
  })
})
