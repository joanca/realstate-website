import type { PropsWithChildren } from 'react'
import styles from './PageLayout.module.css'

export const pageContainerClassName = styles.container

export function PageLayout({ children }: PropsWithChildren) {
  return <div className={styles.layout}>{children}</div>
}
