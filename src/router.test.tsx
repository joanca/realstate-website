import { render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { afterEach, describe, expect, it } from 'vitest'
import { createAppRouter, createEmbeddedAppRouter } from './router'

afterEach(() => {
  window.history.replaceState(null, '', '/')
})

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

  it('renders the buying page on the buying route', async () => {
    renderRouter('/buying')

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'BUYING', level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /buy the right house/i })).toBeInTheDocument()
    })
  })

  it('renders the about page on the about-me route', async () => {
    renderRouter('/about-me')

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'ABOUT ME', level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /i live what i preach/i })).toBeInTheDocument()
    })
  })

  it('renders the not-found route for unknown paths', async () => {
    const { container } = renderRouter('/missing')

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
      expect(container.textContent).not.toContain("I'm EMILY,")
    })
  })

  it.each([
    ['home', "I'm EMILY,"],
    ['buying', 'BUYING'],
    ['about-me', 'ABOUT ME'],
  ])('renders the %s route from the embedded host route ID', async (routeId, expectedText) => {
    document.body.innerHTML = `<main id="emily-realestate" data-route-id="${routeId}"></main>`

    const router = createEmbeddedAppRouter()
    const { container } = render(<RouterProvider router={router} />)

    await waitFor(() => {
      expect(container.textContent).toContain(expectedText)
    })
  })

  it('falls back to the homepage for an unknown embedded route ID', async () => {
    document.body.innerHTML = '<main id="emily-realestate" data-route-id="unknown"></main>'

    const router = createEmbeddedAppRouter()
    const { container } = render(<RouterProvider router={router} />)

    await waitFor(() => {
      expect(container.textContent).toContain("I'm EMILY,")
    })
  })

  it('uses the browser URL when the embedded route ID is absent', async () => {
    document.body.innerHTML = '<main id="emily-realestate"></main>'
    window.history.replaceState(null, '', '/buying')

    const router = createEmbeddedAppRouter()
    render(<RouterProvider router={router} />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'BUYING', level: 1 })).toBeInTheDocument()
    })
  })
})
