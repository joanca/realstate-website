import { createFileRoute } from '@tanstack/react-router'
import { Buying } from '../components/Buying/Buying'

export const Route = createFileRoute('/buying')({
  component: Buying,
})
