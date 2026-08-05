import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import styles from './PageLayout.module.css'
import { PageLayout, pageContainerClassName } from './PageLayout'

describe('PageLayout', () => {
  it('keeps the layout full-width and exposes the opt-in container class', () => {
    const { container } = render(
      <PageLayout>
        <p>Page content</p>
      </PageLayout>,
    )

    expect(container.firstElementChild).toHaveClass(styles.layout)
    expect(container.firstElementChild).not.toHaveClass(pageContainerClassName)
    expect(pageContainerClassName).toBe(styles.container)
    expect(screen.getByText('Page content')).toBeInTheDocument()
  })
})
