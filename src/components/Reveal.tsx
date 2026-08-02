import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import type { Variants } from 'motion/react'

/** Shared premium easing — smooth deceleration, no bounce. */
export const EASE = [0.22, 1, 0.36, 1] as const

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE },
  },
}

type RevealProps = {
  children: ReactNode
  /** Extra delay in seconds, on top of any parent stagger. */
  delay?: number
  className?: string
  /** Render as a different HTML element (default div). */
  as?: 'div' | 'section' | 'span' | 'li' | 'p' | 'h1' | 'h2' | 'h3'
}

/**
 * Fades + slides an element in once when it enters the viewport.
 * Respects reduced motion (MotionConfig reducedMotion="user" strips
 * transforms; we also skip the blur filter manually).
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const Tag = m[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={revealVariants}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

type StaggerGroupProps = {
  children: ReactNode
  className?: string
  /** Delay between each child reveal, in seconds. */
  stagger?: number
  /** Delay before the first child starts, in seconds. */
  delayChildren?: number
  as?: 'div' | 'ul' | 'ol' | 'section'
}

/**
 * Container that staggers its StaggerItem children as they enter view.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  as = 'div',
}: StaggerGroupProps) {
  const reduced = useReducedMotion()
  const Tag = m[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </Tag>
  )
}

type StaggerItemProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'span' | 'p'
}

/** Child of StaggerGroup — inherits the parent's stagger orchestration. */
export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const reduced = useReducedMotion()
  const Tag = m[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag className={className} variants={revealVariants}>
      {children}
    </Tag>
  )
}
