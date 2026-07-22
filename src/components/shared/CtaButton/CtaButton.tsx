import type { ReactNode } from 'react'
import styles from './CtaButton.module.css'

interface CtaButtonProps {
  href: string
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

export function CtaButton({ href, children, className, variant = 'primary' }: CtaButtonProps) {
  const combinedClassName = [styles.root, styles[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <a href={href} className={combinedClassName}>
      {children}
    </a>
  )
}
