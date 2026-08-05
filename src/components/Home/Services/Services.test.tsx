import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { servicesContent } from '../../../modules/app/appContent'
import { Services } from './Services'
import styles from './Services.module.css'

describe('Services', () => {
  it('renders the services section from app content', () => {
    render(<Services />)

    expect(screen.getByRole('region', { name: 'Services' })).toHaveClass(styles.surface)
    expect(screen.getByRole('heading', { name: servicesContent.headline })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Emily in a home kitchen' })).toHaveAttribute('src', servicesContent.imageUrl)
  })

  it('renders service links and decorative icons', () => {
    render(<Services />)

    for (const item of servicesContent.items) {
      const link = screen.getByRole('link', { name: new RegExp(item.label, 'i') })

      expect(link).toHaveAttribute('href', item.href)
      expect(link.querySelector('img')).toHaveAttribute('src', item.iconUrl)
    }

    expect(screen.getByText('Thanks!')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /buying/i })).toHaveAttribute('href', '/buying')
    expect(screen.queryByText(/moving to portland/i)).not.toBeInTheDocument()
  })
})
