import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CtaButton } from './CtaButton'
import styles from './CtaButton.module.css'

describe('CtaButton', () => {
  it('renders a primary link with shared button styling and an optional class name by default', () => {
    render(
      <CtaButton href="#contact" className="custom-button">
        Contact Emily
      </CtaButton>,
    )

    const link = screen.getByRole('link', { name: 'Contact Emily' })

    expect(link).toHaveAttribute('href', '#contact')
    expect(link).toHaveClass(styles.root)
    expect(link).toHaveClass(styles.primary)
    expect(link).toHaveClass('custom-button')
  })

  it('renders a secondary link variant', () => {
    render(
      <CtaButton href="#guide" variant="secondary">
        My Guide to Portland
      </CtaButton>,
    )

    const link = screen.getByRole('link', { name: 'My Guide to Portland' })

    expect(link).toHaveAttribute('href', '#guide')
    expect(link).toHaveClass(styles.root)
    expect(link).toHaveClass(styles.secondary)
  })
})
