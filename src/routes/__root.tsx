import { Outlet, createRootRoute } from '@tanstack/react-router'
import {
  PageLayout,
  pageContainerClassName,
} from '../components/shared/PageLayout/PageLayout'

function RootRoute() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

function NotFoundRoute() {
  return (
    <div role="main" className={pageContainerClassName}>
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootRoute,
  notFoundComponent: NotFoundRoute,
})
