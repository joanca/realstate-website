import { Outlet, createRootRoute } from '@tanstack/react-router'

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

export const Route = createRootRoute({
  component: RootRoute,
  notFoundComponent: NotFoundRoute,
})
