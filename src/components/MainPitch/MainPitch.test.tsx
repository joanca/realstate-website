import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mainPitchContent } from '../../modules/app/appContent'
import { MainPitch } from './MainPitch'
import styles from './MainPitch.module.css'

describe('MainPitch', () => {
  it('renders the main pitch copy from app content', () => {
    render(<MainPitch />)

    expect(
      screen.getByRole('heading', {
        name: /i'm your guide,\s+but your goals and practical\s+needs drive the process\./i,
      }),
    ).toBeInTheDocument()

    for (const paragraph of mainPitchContent.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }
  })

  it('sets decorative plant and cup assets as section backgrounds', () => {
    render(<MainPitch />)
    const section = screen.getByRole('region', { name: 'Main pitch' })

    expect(section).toHaveClass(styles.surface)
    expect(section).not.toHaveClass('main-pitch-surface')
    expect(section).not.toContainElement(screen.queryByAltText('Plant on side table'))
    expect(section).not.toContainElement(screen.queryByAltText('Cup on coffee table'))
    expect(section.style.getPropertyValue('--main-pitch-plant-image')).toBe(`url("${mainPitchContent.plantImageUrl}")`)
    expect(section.style.getPropertyValue('--main-pitch-cup-image')).toBe(`url("${mainPitchContent.cupImageUrl}")`)
  })
})
