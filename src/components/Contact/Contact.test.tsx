import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Contact } from './Contact'
import styles from './Contact.module.css'

describe('Contact', () => {
  it('renders the contact call to action', () => {
    render(<Contact />)

    expect(screen.getByRole('region', { name: 'Contact' })).toHaveClass(styles.surface)
    expect(screen.getByText('Ready to get started?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /let.s connect/i })).toHaveAttribute('href', '#')
  })
})
