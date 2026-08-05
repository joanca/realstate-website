import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { pageContainerClassName } from '../PageLayout/PageLayout'
import { Contact } from './Contact'
import styles from './Contact.module.css'

describe('Contact', () => {
  it('renders the contact call to action', () => {
    render(<Contact />)

    const region = screen.getByRole('region', { name: 'Contact' })
    const prompt = screen.getByText('Ready to get started?')

    expect(region).toHaveClass(styles.surface)
    expect(region).not.toHaveClass(pageContainerClassName)
    expect(prompt.parentElement).toHaveClass(styles.inner, pageContainerClassName)
    expect(screen.getByRole('link', { name: /let.s connect/i })).toHaveAttribute('href', '#')
  })
})
