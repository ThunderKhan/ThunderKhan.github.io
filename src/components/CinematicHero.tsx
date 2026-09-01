import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { site } from '../data/portfolio'

const WORKSPACE_IMAGE = '/experimental/cinematic-workspace.webp'
const SINGULARITY_DATA = '/experimental/code-singularity.webp.b64.txt'

const skillSignals = ['FULL STACK', 'C++ SYSTEMS', 'DEVELOPER TOOLS', 'OPEN SOURCE']

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [singularityImage, setSingularityImage] = useState<string>()

  useEffect(() => {
    let cancelled = false
    fetch(SINGULARITY_DATA)
      .then((response) => response.text())
      .then((data) => {
        if (!cancelled) setSingularityImage(`data:image/webp;base64,${data.trim()}`)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const singularityOpacity = useTransform(scrollYProgress, [0, 0.18, 0.32, 0.4], [1, 1, 0.42, 0])
  const singularityScale = useTransform(scrollYProgress, [0, 0.4], [1.02, 1.38])
  const singularityX = useTransform(scrollYProgress, [0, 0.4], ['0%', '-7%'])
  const singularityRotate = useTransform(scrollYProgress, [0, 0.4], [0, -1.2])
  const singularityGlow = useTransform(scrollYProgress, [0, 0.16, 0.34], [0.18, 0.34, 0.12])

  const workspaceOpacity = useTransform(scrollYProgress, [0.22, 0.38, 0.92, 1], [0, 1, 1, 0.16])
  const workspaceScale = useTransform(
    scrollYProgress,
    [0.22, 0.42, 0.68, 0.82, 1],
    [1.04, 1.07, 1.13, 1.14, 1.18],
  )
  const workspaceY = useTransform(scrollYProgress, [0.22, 0.68, 0.9, 1], ['0%', '-2.6%', '-3.4%', '-4%'])
  const workspaceX = useTransform(scrollYProgress, [0.22, 0.68, 0.9, 1], ['0%', '-1.5%', '-2.2%', '-2.5%'])

  const introOpacity = useTransform(scrollYProgress, [0, 0.18, 0.31], [1, 1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.31], ['0px', '-44px'])
  const introScale = useTransform(scrollYProgress, [0, 0.31], [1, 0.97])

  const transitionLabelOpacity = useTransform(scrollYProgress, [0.2, 0.27, 0.36, 0.43], [0, 1, 1, 0])
  const transitionLabelY = useTransform(scrollYProgress, [0.2, 0.43], [18, -12])

  const skillOpacity = useTransform(scrollYProgress, [0.36, 0.44, 0.74, 0.82], [0, 1, 1, 0])
  const skillY = useTransform(scrollYProgress, [0.36, 0.48, 0.82], ['34px', '0px', '-28px'])
  const terminalOpacity = useTransform(scrollYProgress, [0.42, 0.5, 0.75, 0.83], [0, 1, 1, 0])
  const terminalY = useTransform(scrollYProgress, [0.42, 0.54, 0.83], ['24px', '0px', '-18px'])

  const skill1Opacity = useTransform(scrollYProgress, [0.43, 0.47], [0, 1])
  const skill2Opacity = useTransform(scrollYProgress, [0.47, 0.51], [0, 1])
  const skill3Opacity = useTransform(scrollYProgress, [0.51, 0.55], [0, 1])
  const skill4Opacity = useTransform(scrollYProgress, [0.55, 0.59], [0, 1])
  const skill1Y = useTransform(skill1Opacity, [0, 1], [14, 0])
  const skill2Y = useTransform(skill2Opacity, [0, 1], [14, 0])
  const skill3Y = useTransform(skill3Opacity, [0, 1], [14, 0])
  const skill4Y = useTransform(skill4Opacity, [0, 1], [14, 0])
  const skill1Scale = useTransform(skill1Opacity, [0, 1], [0.94, 1])
  const skill2Scale = useTransform(skill2Opacity, [0, 1], [0.94, 1])
  const skill3Scale = useTransform(skill3Opacity, [0, 1], [0.94, 1])
  const skill4Scale = useTransform(skill4Opacity, [0, 1], [0.94, 1])
  const skillStyles = [
    { opacity: skill1Opacity, y: skill1Y, scale: skill1Scale },
    { opacity: skill2Opacity, y: skill2Y, scale: skill2Scale },
    { opacity: skill3Opacity, y: skill3Y, scale: skill3Scale },
    { opacity: skill4Opacity, y: skill4Y, scale: skill4Scale },
  ]

  const terminal1Opacity = useTransform(scrollYProgress, [0.49, 0.53], [0, 1])
  const terminal2Opacity = useTransform(scrollYProgress, [0.53, 0.57], [0, 1])
  const terminal3Opacity = useTransform(scrollYProgress, [0.57, 0.61], [0, 1])
  const terminal4Opacity = useTransform(scrollYProgress, [0.61, 0.65], [0, 1])
  const terminal1X = useTransform(terminal1Opacity, [0, 1], [-8, 0])
  const terminal2X = useTransform(terminal2Opacity, [0, 1], [-8, 0])
  const terminal3X = useTransform(terminal3Opacity, [0, 1], [-8, 0])
  const terminal4X = useTransform(terminal4Opacity, [0, 1], [-8, 0])
  const terminalStyles = [
    { opacity: terminal1Opacity, x: terminal1X },
    { opacity: terminal2Opacity, x: terminal2X },
    { opacity: terminal3Opacity, x: terminal3X },
    { opacity: terminal4Opacity, x: terminal4X },
  ]

  const proofScale = useTransform(scrollYProgress, [0.55, 0.63, 0.71], [0.985, 1, 1])
  const secondOpacity = useTransform(scrollYProgress, [0.76, 0.84, 0.94, 0.985], [0, 1, 1, 0])
  const secondY = useTransform(scrollYProgress, [0.76, 0.86, 0.985], ['42px', '0px', '-42px'])
  const veilOpacity = useTransform(scrollYProgress, [0, 0.34, 0.72, 1], [0.14, 0.24, 0.42, 0.76])

  return (
    <section ref={sectionRef} id="hero" aria-label="Introduction" className="relative h-[500svh] bg-black">
      <div className="sticky top-0 h-svh overflow-hidden bg-black">
        {singularityImage && (
          <m.img
            src={singularityImage}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-cover object-[50%_48%]"
            style={reducedMotion ? { opacity: 1 } : { opacity: singularityOpacity, scale: singularityScale, x: singularityX, rotate: singularityRotate }}
          />
        )}

        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_47%,rgba(255,126,36,0.28),transparent_16%)] mix-blend-screen"
          style={reducedMotion ? { opacity: 0.16 } : { opacity: singularityGlow }}
        />

        <m.img
          src={WORKSPACE_IMAGE}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover object-[52%_50%] sm:object-[50%_50%] lg:object-[50%_48%]"
          style={reducedMotion ? { opacity: 1 } : { opacity: workspaceOpacity, scale: workspaceScale, y: workspaceY, x: workspaceX }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/5" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.78)]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-soft-light"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,.26) 0 1px, transparent 1.4px), radial-gradient(circle at 70% 65%, rgba(255,255,255,.18) 0 1px, transparent 1.3px)',
            backgroundSize: '4px 4px, 5px 5px',
          }}
        />
        <m.div className="pointer-events-none absolute inset-0 bg-black" aria-hidden="true" style={reducedMotion ? { opacity: 0.34 } : { opacity: veilOpacity }} />

        <div className="relative mx-auto h-full w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div className="absolute top-[20%] left-5 max-w-4xl sm:left-8 lg:top-[22%] lg:left-12" style={reducedMotion ? undefined : { opacity: introOpacity, y: introY, scale: introScale }}>
            <p className="mb-5 font-mono text-xs tracking-[0.28em] text-white/75 uppercase sm:text-sm">{site.tagline}</p>
            <h1 className="max-w-4xl text-5xl leading-[0.95] font-bold tracking-[-0.05em] text-balance sm:text-7xl lg:text-8xl">
              <span className="inline-block rounded-[1.4rem] bg-accent px-4 py-2 text-white shadow-[0_22px_90px_rgba(139,92,246,0.38)] sm:px-5 sm:py-3">Hi, I&apos;m {site.name}.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 text-pretty drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:text-xl lg:text-2xl">{site.headline}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(255,255,255,0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(255,255,255,0.18)]">Enter my work <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></a>
              <a href={site.resume} download className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-black/25 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-white/60 hover:bg-black/40"><Download size={15} aria-hidden="true" /> Résumé</a>
            </div>
          </m.div>

          <m.div className="pointer-events-none absolute inset-x-5 top-[45%] text-center sm:inset-x-8 lg:inset-x-12" style={reducedMotion ? { opacity: 0 } : { opacity: transitionLabelOpacity, y: transitionLabelY }}>
            <p className="font-mono text-[10px] tracking-[0.34em] text-orange-100/70 uppercase sm:text-xs">Complexity → systems → something real</p>
          </m.div>

          <m.div className="absolute inset-x-5 top-[52%] sm:inset-x-8 lg:inset-x-12" style={reducedMotion ? { opacity: 1 } : { opacity: skillOpacity, y: skillY, scale: proofScale }}>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {skillSignals.map((signal, index) => (
                <m.span key={signal} style={reducedMotion ? undefined : skillStyles[index]} className="rounded-full border border-white/20 bg-black/30 px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-white/85 uppercase backdrop-blur-xl sm:text-xs">{signal}</m.span>
              ))}
            </div>
          </m.div>

          <m.div className="absolute right-5 top-[58%] w-[min(92vw,430px)] rounded-2xl border border-white/15 bg-black/35 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:right-8 lg:right-12" style={reducedMotion ? { opacity: 1 } : { opacity: terminalOpacity, y: terminalY, scale: proofScale }}>
            <div className="mb-3 flex items-center gap-2"><span className="size-2 rounded-full bg-white/45" /><span className="size-2 rounded-full bg-white/30" /><span className="size-2 rounded-full bg-white/20" /><span className="ml-2 font-mono text-[10px] tracking-[0.16em] text-white/45 uppercase">ayan@portfolio</span></div>
            <div className="space-y-1 font-mono text-xs leading-relaxed text-white/72 sm:text-sm">
              {[
                <><span className="text-violet-300">$</span> build --curious --public</>,
                <>stack: react · typescript · c++ · python</>,
                <>mode: prototype → test → refine</>,
                <><span className="text-violet-300">✓</span> shipping proof, not just claims <span className="ml-1 inline-block h-[1em] w-[0.45em] translate-y-[2px] bg-violet-300/80 animate-pulse" /></>,
              ].map((line, index) => (
                <m.p key={index} className={index === 0 || index === 3 ? '' : 'text-white/50'} style={reducedMotion ? undefined : terminalStyles[index]}>{line}</m.p>
              ))}
            </div>
          </m.div>

          <m.div className="absolute right-5 bottom-[15%] left-5 ml-auto max-w-xl text-right sm:right-8 sm:left-auto lg:right-12 lg:bottom-[14%]" style={reducedMotion ? { opacity: 1 } : { opacity: secondOpacity, y: secondY }}>
            <p className="font-mono text-xs tracking-[0.24em] text-cyan-100/75 uppercase sm:text-sm">Build · test · learn · repeat</p>
            <p className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.035em] text-white text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-5xl">From ideas to systems you can actually use.</p>
            <p className="mt-5 ml-auto max-w-lg text-sm leading-relaxed text-white/72 sm:text-base">Full-stack applications, C++ systems, developer tools, open source, and experiments that make me question my assumptions.</p>
          </m.div>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"><span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll to enter</span><ArrowDown size={15} aria-hidden="true" className="animate-bounce" /></div>
        </div>
      </div>
    </section>
  )
}
