import type { ReactNode } from 'react'
import styles from './Quote.module.css'

interface QuoteProps {
  attribution: string
  children: ReactNode
  className?: string
}

export function Quote({ attribution, children, className }: QuoteProps) {
  const combinedClassName = [styles.root, className]
    .filter(Boolean)
    .join(' ')

  return (
    <blockquote className={combinedClassName}>
      <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>
      <p>
        {children}
        <span className={styles.attribution}> - {attribution}</span>
      </p>
    </blockquote>
  )
}
