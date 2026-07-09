import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Separator } from './Separator'
import styles from './Separator.module.css'

describe('Separator', () => {
  it('renders the default wave separator', () => {
    const { container } = render(<Separator />)
    const separator = container.querySelector('[aria-hidden="true"]')

    expect(separator).toBeInTheDocument()
    expect(separator).toHaveAttribute('aria-hidden', 'true')
    expect(separator).toHaveClass(styles.root, styles.wave)
    expect(separator).not.toHaveAttribute('style')
  })

  it('allows custom class names', () => {
    const { container } = render(<Separator className="mt-0" />)

    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass('mt-0')
  })

  it('sets a custom bottom background CSS variable', () => {
    const { container } = render(<Separator bottomBackground="var(--main-pitch-bg)" />)
    const separator = container.querySelector('[aria-hidden="true"]') as HTMLDivElement

    expect(separator.style.getPropertyValue('--separator-bottom-bg')).toBe('var(--main-pitch-bg)')
  })
})
