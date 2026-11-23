import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site } from '../data/portfolio'
import { BlackHoleHeroSection } from './BlackHoleHeroSection'

const WORKSPACE_IMAGE = '/experimental/cinematic-workspace.webp'

const skillSignals = ['FULL STACK', 'C++ SYSTEMS', 'DEVELOPER TOOLS', 'OPEN SOURCE']

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const singularityOpacity = useTransform(scrollYProgress, [0, 0.2, 0.31, 0.38], [1, 1, 0.72, 0])
  const singularityScale = useTransform(scrollYProgress, [0, 0.38], [1.02, 1.16])
  const singularityX = useTransform(scrollYProgress, [0, 0.38], ['0%', '-2%'])
  const singularityY = useTransform(scrollYProgress, [0, 0.38], ['0%', '-1%'])
  const singularityGlow = useTransform(scrollYProgress, [0, 0.16, 0.32], [0.12, 0.24, 0.07])

  const workspaceOpacity = useTransform(scrollYProgress, [0.27, 0.39, 0.92, 1], [0, 1, 1, 0.16])
  const workspaceScale = useTransform(
    scrollYProgress,
    [0.27, 0.44, 0.68, 0.82, 1],
    [1.04, 1.07, 1.13, 1.14, 1.18],
  )
  const workspaceY = useTransform(scrollYProgress, [0.27, 0.68, 0.9, 1], ['0%', '-2.6%', '-3.4%', '-4%'])
  const workspaceX = useTransform(scrollYProgress, [0.27, 0.68, 0.9, 1], ['0%', '-1.5%', '-2.2%', '-2.5%'])

  const introOpacity = useTransform(scrollYProgress, [0, 0.19, 0.3], [1, 1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.3], ['0px', '-38px'])
  const introScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.985])

  const skillOpacity = useTransform(scrollYProgress, [0.37, 0.45, 0.74, 0.82], [0, 1, 1, 0])
  const skillY = useTransform(scrollYProgress, [0.37, 0.49, 0.82], ['34px', '0px', '-28px'])
  const terminalOpacity = useTransform(scrollYProgress, [0.43, 0.51, 0.75, 0.83], [0, 1, 1, 0])
  const terminalY = useTransform(scrollYProgress, [0.43, 0.55, 0.83], ['24px', '0px', '-18px'])

  const skill1Opacity = useTransform(scrollYProgress, [0.44, 0.48], [0, 1])
  const skill2Opacity = useTransform(scrollYProgress, [0.48, 0.52], [0, 1])
  const skill3Opacity = useTransform(scrollYProgress, [0.52, 0.56], [0, 1])
  const skill4Opacity = useTransform(scrollYProgress, [0.56, 0.6], [0, 1])
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

  const terminal1Opacity = useTransform(scrollYProgress, [0.5, 0.54], [0, 1])
  const terminal2Opacity = useTransform(scrollYProgress, [0.54, 0.58], [0, 1])
  const terminal3Opacity = useTransform(scrollYProgress, [0.58, 0.62], [0, 1])
  const terminal4Opacity = useTransform(scrollYProgress, [0.62, 0.66], [0, 1])
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

  const proofScale = useTransform(scrollYProgress, [0.56, 0.64, 0.72], [0.985, 1, 1])
  const secondOpacity = useTransform(scrollYProgress, [0.76, 0.84, 0.94, 0.985], [0, 1, 1, 0])
  const secondY = useTransform(scrollYProgress, [0.76, 0.86, 0.985], ['42px', '0px', '-42px'])
  const veilOpacity = useTransform(scrollYProgress, [0, 0.36, 0.72, 1], [0.04, 0.2, 0.42, 0.76])

  return (
    <section ref={sectionRef} id="hero" aria-label="Introduction" className="relative h-[500svh] bg-black">
      <div className="sticky top-0 h-svh overflow-hidden bg-black">
        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-center"
          style={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: singularityOpacity, scale: singularityScale, x: singularityX, y: singularityY }
          }
        >
          <BlackHoleHeroSection
            focus={[0.72, 0.46]}
            resolution={0.68}
            maxDpr={1.5}
            steps={260}
            brightness={1.05}
            glow={1.05}
            exposure={0.95}
            className="h-full w-full"
          />
        </m.div>

        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_43%_46%,rgba(255,138,63,0.2),transparent_16%)] mix-blend-screen"
          style={reducedMotion ? { opacity: 0.1 } : { opacity: singularityGlow }}
        />

        <m.img
          src={WORKSPACE_IMAGE}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[61%_50%] sm:object-[50%_50%] lg:object-[50%_48%]"
          style={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: workspaceOpacity, scale: workspaceScale, y: workspaceY, x: workspaceX }
          }
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/86 via-black/32 to-black/5 sm:from-black/82 sm:via-black/28" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-transparent to-black/38 sm:from-black/82 sm:to-black/30" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.78)] sm:shadow-[inset_0_0_180px_rgba(0,0,0,0.72)]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.11] mix-blend-soft-light"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,.26) 0 1px, transparent 1.4px), radial-gradient(circle at 70% 65%, rgba(255,255,255,.18) 0 1px, transparent 1.3px)',
            backgroundSize: '4px 4px, 5px 5px',
          }}
        />
        <m.div
          className="pointer-events-none absolute inset-0 bg-black"
          aria-hidden="true"
          style={reducedMotion ? { opacity: 0.3 } : { opacity: veilOpacity }}
        />

        <div className="relative mx-auto h-full w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            className="pointer-events-auto absolute top-[17%] right-5 left-5 z-20 max-w-[36rem] sm:top-[22%] sm:right-auto sm:left-8 sm:max-w-[44rem] lg:top-[24%] lg:left-12 lg:max-w-[42rem]"
            style={reducedMotion ? undefined : { opacity: introOpacity, y: introY, scale: introScale }}
          >
            <p className="mb-4 max-w-[21rem] font-mono text-[10px] leading-relaxed tracking-[0.24em] text-white/68 uppercase sm:mb-5 sm:max-w-none sm:text-sm sm:tracking-[0.28em]">
              {site.tagline}
            </p>
            <h1 className="max-w-[22rem] text-[clamp(2.65rem,13vw,4.2rem)] leading-[0.94] font-bold tracking-[-0.055em] text-white sm:max-w-none sm:text-6xl lg:text-7xl">
              Hi, I&apos;m <span className="text-violet-300">{site.name}.</span>
            </h1>
            <p className="mt-5 max-w-[21rem] text-[15px] leading-[1.45] text-white/82 drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:mt-6 sm:max-w-xl sm:text-xl sm:leading-relaxed lg:text-2xl">
              {site.headline}
            </p>
            <div className="mt-7 flex flex-nowrap items-center gap-2.5 sm:mt-9 sm:flex-wrap sm:gap-3">
              <a
                href="#projects"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(255,255,255,0.1)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(255,255,255,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-6"
              >
                Enter my work
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={site.resume}
                download="Ayan_Khan_Resume.pdf"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-black/25 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-white/55 hover:bg-black/35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-6"
              >
                <Download size={15} aria-hidden="true" />
                Résumé
              </a>
            </div>
          </m.div>

          <m.div
            className="pointer-events-none absolute inset-x-5 top-[50%] sm:inset-x-8 sm:top-[52%] lg:inset-x-12"
            style={reducedMotion ? { opacity: 1 } : { opacity: skillOpacity, y: skillY, scale: proofScale }}
          >
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              {skillSignals.map((signal, index) => (
                <m.span
                  key={signal}
                  style={reducedMotion ? undefined : skillStyles[index]}
                  className="truncate rounded-full border border-white/20 bg-black/35 px-3 py-2 text-center font-mono text-[9px] tracking-[0.15em] text-white/82 uppercase backdrop-blur-xl sm:px-4 sm:text-xs sm:tracking-[0.18em]"
                >
                  {signal}
                </m.span>
              ))}
            </div>
          </m.div>

          <m.div
            className="pointer-events-none absolute right-5 left-5 top-[61%] rounded-2xl border border-white/15 bg-black/48 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:right-8 sm:left-auto sm:top-[58%] sm:w-[min(92vw,430px)] lg:right-12"
            style={reducedMotion ? { opacity: 1 } : { opacity: terminalOpacity, y: terminalY, scale: proofScale }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2 rounded-full bg-white/45" />
              <span className="size-2 rounded-full bg-white/30" />
              <span className="size-2 rounded-full bg-white/20" />
              <span className="ml-2 font-mono text-[9px] tracking-[0.14em] text-white/45 uppercase sm:text-[10px] sm:tracking-[0.16em]">
                ayan@portfolio
              </span>
            </div>
            <div className="space-y-1 font-mono text-[11px] leading-relaxed text-white/72 sm:text-sm">
              {[
                <><span className="text-violet-300">$</span> build --curious --public</>,
                <>stack: react · typescript · c++ · python</>,
                <>mode: prototype → test → refine</>,
                <><span className="text-violet-300">✓</span> shipping proof, not just claims{' '}<span className="ml-1 inline-block h-[1em] w-[0.45em] translate-y-[2px] bg-violet-300/80 animate-pulse" /></>,
              ].map((line, index) => (
                <m.p
                  key={index}
                  className={index === 0 || index === 3 ? '' : 'text-white/50'}
                  style={reducedMotion ? undefined : terminalStyles[index]}
                >
                  {line}
                </m.p>
              ))}
            </div>
          </m.div>

          <m.div
            className="pointer-events-none absolute right-5 bottom-[16%] left-5 ml-auto max-w-xl text-right sm:right-8 sm:left-auto lg:right-12 lg:bottom-[14%]"
            style={reducedMotion ? { opacity: 1 } : { opacity: secondOpacity, y: secondY }}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-100/75 uppercase sm:text-sm sm:tracking-[0.24em]">
              Build · test · learn · repeat
            </p>
            <p className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.035em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-5xl">
              From ideas to systems you can actually use.
            </p>
            <p className="mt-4 ml-auto max-w-lg text-xs leading-relaxed text-white/72 sm:mt-5 sm:text-base">
              Full-stack applications, C++ systems, developer tools, open source, and experiments that make me question my assumptions.
            </p>
          </m.div>

          <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 sm:bottom-6 sm:flex">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll to enter</span>
            <ArrowDown size={15} aria-hidden="true" className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
