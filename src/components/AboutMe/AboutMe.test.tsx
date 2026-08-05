import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AboutMe } from './AboutMe'

describe('AboutMe', () => {
  it('renders the about page content and supplied images', () => {
    render(<AboutMe />)

    expect(screen.getByRole('heading', { name: 'ABOUT ME', level: 1 })).toBeInTheDocument()
    expect(screen.getByText('EMILY BARTOLME')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /there is something so comfortable/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /i live what i preach/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /holding a mug/i })).toHaveAttribute('src', expect.stringContaining('about-hero.jpg'))
    expect(screen.getByRole('img', { name: /white picket fence/i })).toHaveAttribute('src', expect.stringContaining('about-coming-home.jpg'))
    expect(screen.getByRole('img', { name: /12 plus years/i })).toHaveAttribute('src', expect.stringContaining('about-badges-first.png'))
    expect(screen.getByRole('img', { name: /principal broker/i })).toHaveAttribute('src', expect.stringContaining('about-badges-second.png'))
    expect(screen.getByRole('img', { name: /equal housing/i })).toHaveAttribute('src', expect.stringContaining('about-badges-third.png'))
  })

  it('uses the selected quote and outcome copy', () => {
    render(<AboutMe />)

    expect(screen.getByText(/susan will find which quote/i)).toBeInTheDocument()
    expect(screen.getByText(/i love this job because i love helping people/i)).toBeInTheDocument()
  })

  it('ends with the shared contact call to action', () => {
    render(<AboutMe />)

    expect(screen.getByRole('region', { name: 'Contact' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /let.s connect/i })).toBeInTheDocument()
  })
})
