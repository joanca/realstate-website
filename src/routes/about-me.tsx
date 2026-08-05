import { createFileRoute } from '@tanstack/react-router'
import { AboutMe } from '../components/AboutMe/AboutMe'

export const Route = createFileRoute('/about-me')({
  component: AboutMe,
})
