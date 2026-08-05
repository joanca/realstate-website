import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Quote } from './Quote'
import styles from './Quote.module.css'

describe('Quote', () => {
  it('renders quote copy and attribution with shared and custom styling', () => {
    const { container } = render(
      <Quote attribution="Customer" className="custom-quote">
        Helpful quote copy.
      </Quote>,
    )

    const quote = container.querySelector('blockquote')

    expect(quote).toHaveClass(styles.root)
    expect(quote).toHaveClass('custom-quote')
    expect(screen.getByText(/helpful quote copy/i)).toHaveTextContent('Helpful quote copy. - Customer')
  })
})
