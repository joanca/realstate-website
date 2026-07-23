import { render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'
import { createAppRouter } from './router'

function renderRouter(path: string) {
  const router = createAppRouter({
    history: createMemoryHistory({ initialEntries: [path] }),
  })

  return render(<RouterProvider router={router} />)
}

describe('router', () => {
  it('renders the homepage on the root route', async () => {
    const { container } = renderRouter('/')

    await waitFor(() => {
      expect(container.textContent).toContain("I'm EMILY,")
    })
  })

  it('renders the not-found route for unknown paths', async () => {
    const { container } = renderRouter('/missing')

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
      expect(container.textContent).not.toContain("I'm EMILY,")
    })
  })
})
