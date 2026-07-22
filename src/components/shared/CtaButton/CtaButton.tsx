import type { ReactNode } from 'react'
import styles from './CtaButton.module.css'

interface CtaButtonProps {
  href: string
  children: ReactNode
  className?: string
}

export function CtaButton({ href, children, className }: CtaButtonProps) {
  const combinedClassName = [styles.root, className]
    .filter(Boolean)
    .join(' ')

  return (
    <a href={href} className={combinedClassName}>
      {children}
    </a>
  )
}
