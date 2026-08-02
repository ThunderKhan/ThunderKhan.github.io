import { useEffect, useRef } from 'react'
import type { BackgroundMode } from '../hooks/useBackgroundMode'

type AmbientBackgroundProps = {
  mode: BackgroundMode
}

/** Deterministic pseudo-random particle positions (no re-render churn). */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 11) % 97}%`,
  top: `${(i * 53 + 19) % 93}%`,
  delay: `${(i * 1.7) % 12}s`,
  size: i % 3 === 0 ? 3 : 2,
}))

/**
 * Full-viewport ambient background with three modes:
 * Aurora (drifting light rays), Blueprint (engineering grid),
 * Quiet (near-solid with faint texture).
 *
 * Pointer parallax is applied directly to a DOM ref (max ~5px) so it
 * never triggers React re-renders; disabled on touch and reduced motion.
 */
export function AmbientBackground({ mode }: AmbientBackgroundProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const x = (e.clientX / window.innerWidth - 0.5) * 10 // max ±5px
        const y = (e.clientY / window.innerHeight - 0.5) * 10
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ pointerEvents: 'none' }}
    >
      <div ref={parallaxRef} className="absolute -inset-8 will-change-transform">
        {mode === 'aurora' && (
          <>
            <div
              className="aurora-layer-a absolute -top-1/4 -left-1/4 h-[80%] w-[70%] rounded-full opacity-40 blur-3xl dark:opacity-30"
              style={{
                background:
                  'radial-gradient(ellipse 60% 45% at 40% 40%, color-mix(in oklab, var(--color-accent) 45%, transparent), transparent 70%)',
              }}
            />
            <div
              className="aurora-layer-b absolute top-1/4 -right-1/4 h-[70%] w-[60%] rounded-full opacity-25 blur-3xl dark:opacity-20"
              style={{
                background:
                  'radial-gradient(ellipse 55% 40% at 60% 50%, color-mix(in oklab, var(--color-coral) 40%, transparent), transparent 70%)',
              }}
            />
            <div
              className="aurora-layer-c absolute -bottom-1/4 left-1/3 h-[55%] w-[45%] rounded-full opacity-15 blur-3xl dark:opacity-10"
              style={{
                background:
                  'radial-gradient(ellipse 50% 40% at 50% 60%, color-mix(in oklab, var(--color-amber) 35%, transparent), transparent 70%)',
              }}
            />
          </>
        )}

        {mode === 'blueprint' && (
          <>
            <div className="blueprint-grid absolute inset-0 opacity-50 dark:opacity-40" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 55% 45% at 50% 38%, color-mix(in oklab, var(--color-accent) 7%, transparent), transparent 75%)',
              }}
            />
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="blueprint-particle absolute rounded-full bg-accent/40"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  animationDelay: p.delay,
                }}
              />
            ))}
          </>
        )}

        {mode === 'quiet' && (
          <>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 70% 55% at 50% 30%, color-mix(in oklab, var(--color-accent) 4%, transparent), transparent 80%)',
              }}
            />
            <div className="quiet-noise absolute inset-0" />
          </>
        )}
      </div>
    </div>
  )
}
