import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { mainPitchContent } from '../../modules/app/appContent'
import { MainPitch } from './MainPitch'
import styles from './MainPitch.module.css'

function textContent(content: string) {
  return content.replace(/<br \/>/g, ' ').replace(/\s+/g, ' ').trim()
}

describe('MainPitch', () => {
  it('renders the main pitch copy from app content', () => {
    render(<MainPitch />)

    expect(
      screen.getByRole('heading', {
        name: /i'm your guide,\s+but your goals and practical\s+needs drive the process\./i,
      }),
    ).toBeInTheDocument()

    const paragraphs = screen.getAllByText((_, element) => element?.tagName === 'P')

    expect(paragraphs).toHaveLength(mainPitchContent.paragraphs.length)

    for (const [index, paragraph] of mainPitchContent.paragraphs.entries()) {
      expect(paragraphs[index]).toHaveTextContent(textContent(paragraph))
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
