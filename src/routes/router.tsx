import {
  Outlet,
  createRoute,
  createRootRoute,
  createRouter,
  type RouterHistory,
} from '@tanstack/react-router'
import { HomeRoute } from './index'

function RootRoute() {
  return <Outlet />
}

function NotFoundRoute() {
  return (
    <div role="main">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
    </div>
  )
}

export const rootRoute = createRootRoute({
  component: RootRoute,
  notFoundComponent: NotFoundRoute,
})

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeRoute,
})

export const routeTree = rootRoute.addChildren([indexRoute])

export function createAppRouter(options: { history?: RouterHistory } = {}) {
  return createRouter({
    routeTree,
    history: options.history,
    notFoundMode: 'root',
  })
}

export const router = createAppRouter()
