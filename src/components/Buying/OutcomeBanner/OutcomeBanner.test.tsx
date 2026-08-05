import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { pageContainerClassName } from '../../shared/PageLayout/PageLayout'
import { BuyingOutcomeBanner } from './OutcomeBanner'

describe('BuyingOutcomeBanner', () => {
  it('renders the buying outcome message', () => {
    render(<BuyingOutcomeBanner />)

    const region = screen.getByRole('region', { name: 'Buying outcome' })
    const message = screen.getByText('Bottom line, I work hard to ensure happy outcomes.')

    expect(region).not.toHaveClass(pageContainerClassName)
    expect(message.parentElement).toHaveClass(pageContainerClassName)
  })
})
