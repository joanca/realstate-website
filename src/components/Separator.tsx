import type { CSSProperties } from 'react'

interface SeparatorProps {
  className?: string
  bottomBackground?: string
}

export function Separator({ className, bottomBackground }: SeparatorProps) {
  const style = bottomBackground
    ? ({ '--separator-bottom-bg': bottomBackground } as CSSProperties)
    : undefined

  const combinedClassName = `separator separator--wave w-full ${className ?? ''}`

  return (
    <div
      className={combinedClassName}
      style={style}
      aria-hidden="true"
    />
  )
}
