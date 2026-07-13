import type { CSSProperties } from 'react'
import styles from './DividerLine.module.css'

interface DividerLineProps {
  width: number
  className?: string
}

export function DividerLine({ width, className }: DividerLineProps) {
  const combinedClassName = [styles.root, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={combinedClassName}
      style={{ '--divider-line-width': `${width}px` } as CSSProperties}
      aria-hidden="true"
    />
  )
}
