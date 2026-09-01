import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site } from '../data/portfolio'

const HERO_IMAGE = '/experimental/cinematic-workspace.webp'

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.72, 1], [1.02, 1.14, 1.2])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])
  const imageX = useTransform(scrollYProgress, [0, 1], ['0%', '-2.5%'])
  const introOpacity = useTransform(scrollYProgress, [0, 0.24, 0.43], [1, 1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.43], ['0px', '-48px'])
  const secondOpacity = useTransform(scrollYProgress, [0.35, 0.52, 0.8, 0.94], [0, 1, 1, 0])
  const secondY = useTransform(scrollYProgress, [0.35, 0.6, 0.94], ['42px', '0px', '-42px'])
  const veilOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.28, 0.42, 0.72])
  const exitOpacity = useTransform(scrollYProgress, [0.86, 1], [1, 0.18])

  const imageStyle = reducedMotion
    ? undefined
    : { scale, y: imageY, x: imageX, opacity: exitOpacity }

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative h-[220svh] bg-black"
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-black">
        <m.img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover object-[52%_50%] sm:object-[50%_50%] lg:object-[50%_48%]"
          style={imageStyle}
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30"
          aria-hidden="true"
        />
        <m.div
          className="pointer-events-none absolute inset-0 bg-black"
          aria-hidden="true"
          style={reducedMotion ? { opacity: 0.34 } : { opacity: veilOpacity }}
        />

        <div className="relative mx-auto h-full w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            className="absolute top-[22%] left-5 max-w-3xl sm:left-8 lg:top-[24%] lg:left-12"
            style={reducedMotion ? undefined : { opacity: introOpacity, y: introY }}
          >
            <p className="mb-5 font-mono text-xs tracking-[0.24em] text-white/70 uppercase sm:text-sm">
              {site.tagline}
            </p>
            <h1 className="max-w-3xl text-5xl leading-[0.95] font-bold tracking-[-0.045em] text-white text-balance sm:text-7xl lg:text-8xl">
              Hi, I&apos;m {site.name}.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 text-pretty sm:text-xl lg:text-2xl">
              {site.headline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Enter my work
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={site.resume}
                download
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-black/20 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-white/60 hover:bg-black/35"
              >
                <Download size={15} aria-hidden="true" />
                Résumé
              </a>
            </div>
          </m.div>

          <m.div
            className="absolute right-5 bottom-[18%] left-5 ml-auto max-w-xl text-right sm:right-8 sm:left-auto lg:right-12 lg:bottom-[17%]"
            style={reducedMotion ? { opacity: 1 } : { opacity: secondOpacity, y: secondY }}
          >
            <p className="font-mono text-xs tracking-[0.24em] text-cyan-100/75 uppercase sm:text-sm">
              Build · test · learn · repeat
            </p>
            <p className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.035em] text-white text-balance sm:text-5xl">
              From ideas to systems you can actually use.
            </p>
            <p className="mt-5 ml-auto max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              Full-stack applications, C++ systems, developer tools, open source, and experiments that make me question my assumptions.
            </p>
          </m.div>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll to enter</span>
            <ArrowDown size={15} aria-hidden="true" className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
