import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CtaButton } from './CtaButton'
import styles from './CtaButton.module.css'

describe('CtaButton', () => {
  it('renders a link with shared button styling and an optional class name', () => {
    render(
      <CtaButton href="#contact" className="custom-button">
        Contact Emily
      </CtaButton>,
    )

    const link = screen.getByRole('link', { name: 'Contact Emily' })

    expect(link).toHaveAttribute('href', '#contact')
    expect(link).toHaveClass(styles.root)
    expect(link).toHaveClass('custom-button')
  })
})
