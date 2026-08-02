import { m, useReducedMotion } from 'motion/react'
import { EASE } from './Reveal'

/* ------------------------------------------------------------------ */
/* Living code tree — a deterministic, decorative SVG illustration     */
/* for the desktop Hero: branching syntax-tree structure, travelling   */
/* particles, sparse code glyphs, and faint falling character columns. */
/*                                                                     */
/* Everything below is a stable module-level constant: no              */
/* Math.random() during render, so server/client/theme renders are     */
/* always identical. Animates transform, opacity, and pathLength only. */
/* ------------------------------------------------------------------ */

type Branch = {
  d: string
  /** CSS color value. */
  stroke: string
  width: number
  /** Entrance draw delay (s). */
  delay: number
  /** Line opacity — secondary lines are fainter. */
  opacity: number
}

const BRANCHES: Branch[] = [
  // Trunk
  { d: 'M180 412 C180 366 180 338 180 298', stroke: 'var(--color-accent)', width: 2.5, delay: 0, opacity: 0.9 },
  // Primary left branch
  { d: 'M180 298 C162 262 122 238 100 190', stroke: 'var(--color-accent)', width: 2, delay: 0.35, opacity: 0.85 },
  { d: 'M100 190 C88 158 72 140 62 104', stroke: 'var(--color-accent)', width: 1.5, delay: 0.7, opacity: 0.7 },
  { d: 'M100 190 C118 156 128 132 134 96', stroke: 'var(--color-muted-foreground)', width: 1.25, delay: 0.8, opacity: 0.5 },
  // Primary right branch
  { d: 'M180 298 C200 260 240 234 258 184', stroke: 'var(--color-accent)', width: 2, delay: 0.45, opacity: 0.85 },
  { d: 'M258 184 C272 150 292 130 300 94', stroke: 'var(--color-muted-foreground)', width: 1.25, delay: 0.85, opacity: 0.5 },
  { d: 'M258 184 C248 148 236 126 228 86', stroke: 'var(--color-coral)', width: 1.5, delay: 0.9, opacity: 0.65 },
  // Central branch
  { d: 'M180 298 C182 248 178 208 180 158', stroke: 'var(--color-accent)', width: 1.75, delay: 0.55, opacity: 0.8 },
  { d: 'M180 158 C178 128 183 104 180 74', stroke: 'var(--color-muted-foreground)', width: 1.25, delay: 0.95, opacity: 0.5 },
]

type Node = {
  x: number
  y: number
  r: number
  fill: string
  delay: number
  /** Adds a slow opacity pulse halo during the idle loop. */
  pulse?: boolean
}

const NODES: Node[] = [
  { x: 180, y: 412, r: 5, fill: 'var(--color-accent)', delay: 0.1, pulse: true }, // root
  { x: 180, y: 298, r: 3.5, fill: 'var(--color-accent)', delay: 0.5 },
  { x: 100, y: 190, r: 3, fill: 'var(--color-accent)', delay: 0.85 },
  { x: 62, y: 104, r: 2.5, fill: 'var(--color-accent)', delay: 1.15, pulse: true },
  { x: 134, y: 96, r: 2, fill: 'var(--color-muted-foreground)', delay: 1.2 },
  { x: 258, y: 184, r: 3, fill: 'var(--color-coral)', delay: 0.95 },
  { x: 300, y: 94, r: 2, fill: 'var(--color-muted-foreground)', delay: 1.25 },
  { x: 228, y: 86, r: 2.5, fill: 'var(--color-coral)', delay: 1.3, pulse: true },
  { x: 180, y: 158, r: 3, fill: 'var(--color-accent)', delay: 1.0 },
  { x: 180, y: 74, r: 2.5, fill: 'var(--color-amber)', delay: 1.35 },
]

type Glyph = {
  x: number
  y: number
  char: string
  delay: number
  color: string
}

const GLYPHS: Glyph[] = [
  { x: 48, y: 88, char: '{}', delay: 1.4, color: 'var(--color-accent)' },
  { x: 146, y: 82, char: '0', delay: 1.5, color: 'var(--color-muted-foreground)' },
  { x: 196, y: 62, char: '<>', delay: 1.6, color: 'var(--color-accent)' },
  { x: 242, y: 72, char: '1', delay: 1.7, color: 'var(--color-coral)' },
  { x: 312, y: 82, char: '/', delay: 1.8, color: 'var(--color-muted-foreground)' },
  { x: 84, y: 232, char: '$', delay: 1.9, color: 'var(--color-muted-foreground)' },
  { x: 262, y: 240, char: '1', delay: 2.0, color: 'var(--color-muted-foreground)' },
  { x: 156, y: 356, char: '0', delay: 2.1, color: 'var(--color-muted-foreground)' },
]

/**
 * Particles travel along sampled points of the branch curves.
 * Keyframe arrays approximate the paths — transform/opacity only.
 */
type Particle = {
  xs: number[]
  ys: number[]
  duration: number
  delay: number
  fill: string
}

const PARTICLES: Particle[] = [
  {
    // root → left branch tip
    xs: [180, 180, 180, 156, 118, 100, 82, 62],
    ys: [412, 350, 298, 258, 214, 190, 148, 104],
    duration: 7,
    delay: 1.8,
    fill: 'var(--color-accent)',
  },
  {
    // root → right coral tip
    xs: [180, 180, 202, 242, 258, 244, 228],
    ys: [412, 298, 256, 210, 184, 138, 86],
    duration: 8,
    delay: 4.2,
    fill: 'var(--color-coral)',
  },
  {
    // root → central tip
    xs: [180, 180, 181, 179, 180, 180],
    ys: [412, 340, 248, 158, 116, 74],
    duration: 9,
    delay: 6.5,
    fill: 'var(--color-accent)',
  },
]

/** Faint falling character columns behind the tree. */
type FallingColumn = {
  x: number
  chars: string[]
  duration: number
  delay: number
}

const FALLING: FallingColumn[] = [
  { x: 30, chars: ['1', '0', '{', '1'], duration: 16, delay: 0 },
  { x: 210, chars: ['0', '>', '1', '0'], duration: 20, delay: 5 },
  { x: 330, chars: ['$', '1', '0', '}'], duration: 18, delay: 9 },
]

export function HeroCodeTree() {
  const reduced = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none relative select-none">
      {/* Soft ambient glow behind the tree */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="size-3/4 rounded-full bg-accent opacity-[0.07] blur-3xl dark:opacity-[0.14]" />
        <div className="absolute right-[12%] top-[18%] size-1/4 rounded-full bg-coral opacity-[0.05] blur-3xl dark:opacity-[0.1]" />
      </div>

      <svg
        viewBox="0 0 360 440"
        fill="none"
        className="h-auto w-full max-w-md opacity-80 dark:opacity-100"
      >
        {/* Faint falling glyph columns (idle loop only) */}
        {!reduced &&
          FALLING.map((col) => (
            <m.g
              key={`fall-${col.x}`}
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: [-80, 480], opacity: [0, 0.35, 0.35, 0] }}
              transition={{
                duration: col.duration,
                delay: col.delay,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.15, 0.85, 1],
              }}
            >
              {col.chars.map((char, i) => (
                <text
                  key={`${char}-${i}`}
                  x={col.x}
                  y={i * 22}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill="var(--color-muted-foreground)"
                  opacity={0.5 - i * 0.1}
                >
                  {char}
                </text>
              ))}
            </m.g>
          ))}

        {/* Branches — drawn in with a pathLength animation */}
        {BRANCHES.map((branch) =>
          reduced ? (
            <path
              key={branch.d}
              d={branch.d}
              stroke={branch.stroke}
              strokeWidth={branch.width}
              strokeLinecap="round"
              opacity={branch.opacity}
            />
          ) : (
            <m.path
              key={branch.d}
              d={branch.d}
              stroke={branch.stroke}
              strokeWidth={branch.width}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: branch.opacity }}
              transition={{ duration: 0.9, delay: branch.delay, ease: EASE }}
            />
          ),
        )}

        {/* Pulsing halos on a few nodes (opacity only) */}
        {!reduced &&
          NODES.filter((node) => node.pulse).map((node) => (
            <m.circle
              key={`halo-${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r={node.r * 2.6}
              fill={node.fill}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.08, 0.28, 0.08] }}
              transition={{
                duration: 4.5,
                delay: 2 + node.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

        {/* Nodes */}
        {NODES.map((node) =>
          reduced ? (
            <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r={node.r} fill={node.fill} />
          ) : (
            <m.circle
              key={`${node.x}-${node.y}`}
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.fill}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              transition={{ duration: 0.5, delay: node.delay, ease: EASE }}
            />
          ),
        )}

        {/* Sparse code glyphs near the canopy */}
        {GLYPHS.map((glyph) =>
          reduced ? (
            <text
              key={`${glyph.char}-${glyph.x}-${glyph.y}`}
              x={glyph.x}
              y={glyph.y}
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill={glyph.color}
              opacity={0.55}
            >
              {glyph.char}
            </text>
          ) : (
            <m.text
              key={`${glyph.char}-${glyph.x}-${glyph.y}`}
              x={glyph.x}
              y={glyph.y}
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill={glyph.color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ duration: 0.6, delay: glyph.delay, ease: EASE }}
            >
              {glyph.char}
            </m.text>
          ),
        )}

        {/* Particles travelling along the branches (idle loop only) */}
        {!reduced &&
          PARTICLES.map((particle) => (
            <m.circle
              key={`particle-${particle.delay}`}
              r={2}
              fill={particle.fill}
              initial={{ opacity: 0 }}
              animate={{
                cx: particle.xs,
                cy: particle.ys,
                // Fade in at the start, out at the end of each run.
                opacity: particle.xs.map((_, i) =>
                  i === 0 || i === particle.xs.length - 1 ? 0 : 0.9,
                ),
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'linear',
              }}
            />
          ))}
      </svg>
    </div>
  )
}
