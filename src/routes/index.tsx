import { createFileRoute } from '@tanstack/react-router'
import { HomeRoute } from '../components/Home/Home'

export const Route = createFileRoute('/')({
  component: HomeRoute,
})
