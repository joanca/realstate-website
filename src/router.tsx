import {
  createRouter,
  type RouterHistory,
} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createAppRouter(options: { history?: RouterHistory } = {}) {
  return createRouter({
    routeTree,
    history: options.history,
    notFoundMode: 'root',
  })
}

export const router = createAppRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
