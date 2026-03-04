import { render, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { setupEmbeddedFixture } from '../../test/utils/embeddedFixture'
import { AppRoot } from './AppRoot'
import { testimonials } from './appContent'

describe('AppRoot', () => {
  it('renders testimonial content from appContent module', async () => {
    const { mountNode } = setupEmbeddedFixture()

    render(<AppRoot />, { container: mountNode })

    await waitFor(() => {
      testimonials.forEach((testimonial) => {
        expect(mountNode.textContent).toContain(testimonial.quote)
        expect(mountNode.textContent).toContain(testimonial.author)
      })
    })
  })
})
