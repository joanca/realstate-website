import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DividerLine } from './DividerLine'
import styles from './DividerLine.module.css'

describe('DividerLine', () => {
  it('renders a hidden decorative divider line', () => {
    const { container } = render(<DividerLine width={96} />)
    const divider = container.querySelector('[aria-hidden="true"]') as HTMLDivElement

    expect(divider).toBeInTheDocument()
    expect(divider).toHaveClass(styles.root)
    expect(divider).toHaveAttribute('aria-hidden', 'true')
    expect(divider.style.getPropertyValue('--divider-line-width')).toBe('96px')
  })

  it('allows custom class names', () => {
    const { container } = render(<DividerLine width={144} className="section-divider" />)

    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass('section-divider')
  })
})
