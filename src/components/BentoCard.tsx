import type { ReactNode } from 'react'
import { StaggerItem } from './Reveal'

type BentoCardProps = {
  children: ReactNode
  /** Tailwind col-span classes for the 12-column desktop grid. */
  className?: string
}

/**
 * Bento grid cell: rounded surface, subtle border, layered internal
 * lighting, and a gentle lift + border glow on hover (max 4px).
 */
export function BentoCard({ children, className = '' }: BentoCardProps) {
  return (
    <StaggerItem
      className={`bento-glow group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 md:p-7 ${className}`}
    >
      {children}
    </StaggerItem>
  )
}
