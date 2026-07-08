import type { CSSProperties } from 'react'
import styles from './Separator.module.scss'

interface SeparatorProps {
  className?: string
  bottomBackground?: string
}

export function Separator({ className, bottomBackground }: SeparatorProps) {
  const style = bottomBackground
    ? ({ '--separator-bottom-bg': bottomBackground } as CSSProperties)
    : undefined

  const combinedClassName = [styles.root, styles.wave, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={combinedClassName}
      style={style}
      aria-hidden="true"
    />
  )
}
