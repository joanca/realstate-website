import {
  createMemoryHistory,
  createRouter,
  type RouterHistory,
} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { HOST_ID } from './modules/embed/mountEmbeddedApp'

const EMBEDDED_ROUTE_PATHS = {
  home: '/',
  buying: '/buying',
  'about-me': '/about-me',
} as const

type EmbeddedRouteId = keyof typeof EMBEDDED_ROUTE_PATHS

export function createAppRouter(options: { history?: RouterHistory } = {}) {
  return createRouter({
    routeTree,
    history: options.history,
    notFoundMode: 'root',
  })
}

export function createEmbeddedAppRouter() {
  const routeId = document
    .getElementById(HOST_ID)
    ?.dataset.routeId?.trim() as EmbeddedRouteId | undefined

  if (!routeId) {
    return createAppRouter()
  }

  return createAppRouter({
    history: createMemoryHistory({
      initialEntries: [EMBEDDED_ROUTE_PATHS[routeId] ?? '/'],
    }),
  })
}

export const router = createEmbeddedAppRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
