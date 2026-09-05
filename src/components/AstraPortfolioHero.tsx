import { useEffect, useRef } from 'react'
import { links, site } from '../data/portfolio'
import './astra-portfolio-hero.css'

type Particle = {
  x: number
  y: number
  r: number
  v: number
  phase: number
}

export function AstraPortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gardenRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const tintRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const garden = gardenRef.current
    const spotlight = spotlightRef.current
    const tint = tintRef.current
    const progress = progressRef.current
    if (!section || !canvas || !garden || !spotlight || !tint || !progress) return

    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0
    let height = 0
    let viewHeight = window.innerHeight
    let scrollY = window.scrollY
    let sceneStart = 0
    let sceneRange = 1
    let lightSize = 760
    let particles: Particle[] = []
    let targetX = window.innerWidth * 0.5
    let targetY = window.innerHeight * 0.42
    let x = targetX
    let y = targetY
    let frameId = 0
    let last = performance.now()

    const resize = () => {
      const rect = section.getBoundingClientRect()
      width = window.innerWidth
      height = section.offsetHeight
      viewHeight = window.innerHeight
      sceneStart = window.scrollY + rect.top
      sceneRange = Math.max(1, height - viewHeight)
      lightSize = width <= 640 ? 520 : 760
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: Math.min(80, Math.round(width / 18)) }, () => ({
        x: Math.random() * width,
        y: height * (0.38 + Math.random() * 0.48),
        r: 0.45 + Math.random() * 1.1,
        v: 0.14 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const staticFrame = () => {
      const localScroll = Math.min(sceneRange, Math.max(0, scrollY - sceneStart))
      const p = localScroll / sceneRange
      progress.style.transform = `scaleX(${p})`
      tint.style.opacity = String(p * 0.72)
      garden.style.transform = reduce.matches ? 'none' : `translate3d(0, ${localScroll * 0.1}px, 0) scale(${1 + p * 0.025})`
    }

    const render = (time: number) => {
      const dt = Math.min((time - last) / 16.67, 2) || 1
      last = time
      staticFrame()

      const localScroll = Math.min(sceneRange, Math.max(0, scrollY - sceneStart))
      x += (targetX - x) * 0.045 * dt
      y += (targetY - y) * 0.045 * dt
      spotlight.style.transform = `translate3d(${x - lightSize / 2}px, ${y + localScroll * 0.78 - lightSize / 2}px, 0)`

      if (ctx) {
        ctx.clearRect(0, 0, width, height)
        for (const particle of particles) {
          particle.y -= particle.v * dt
          if (particle.y < height * 0.34) particle.y = height * 0.88
          const alpha = 0.1 + (Math.sin(time * 0.0008 + particle.phase) + 1) * 0.13
          ctx.beginPath()
          ctx.fillStyle = `rgba(220, 224, 244, ${alpha})`
          ctx.arc(
            particle.x + Math.sin(time * 0.0002 + particle.phase) * 10,
            particle.y + localScroll * 0.04,
            particle.r,
            0,
            Math.PI * 2,
          )
          ctx.fill()
        }
      }

      frameId = window.requestAnimationFrame(render)
    }

    const onScroll = () => {
      scrollY = window.scrollY
      if (reduce.matches) staticFrame()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const rect = section.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      targetX = event.clientX
      targetY = event.clientY - rect.top
    }

    const start = () => {
      window.cancelAnimationFrame(frameId)
      if (!document.hidden && !reduce.matches) {
        last = performance.now()
        frameId = window.requestAnimationFrame(render)
      } else {
        staticFrame()
        ctx?.clearRect(0, 0, width, height)
      }
    }

    const onVisibility = () => start()
    const onReduceChange = () => start()

    resize()
    staticFrame()
    start()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    reduce.addEventListener('change', onReduceChange)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
      reduce.removeEventListener('change', onReduceChange)
    }
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="astra-hero" aria-label="Introduction">
      <div ref={progressRef} className="astra-progress" aria-hidden="true" />
      <div className="astra-sky" aria-hidden="true" />
      <div ref={gardenRef} className="astra-garden" aria-hidden="true" />
      <div className="astra-shade" aria-hidden="true" />
      <div ref={tintRef} className="astra-scroll-tint" aria-hidden="true" />
      <canvas ref={canvasRef} className="astra-particles" aria-hidden="true" />
      <div ref={spotlightRef} className="astra-spotlight" aria-hidden="true" />

      <div className="astra-copy">
        <p className="astra-kicker">{site.name} · systems · applied ai · open source</p>
        <h1 className="astra-title">
          <span className="astra-line astra-reveal">I like problems</span>
          <span className="astra-line astra-reveal astra-reveal-delay">
            <span className="astra-capsule">with sharp edges.</span>
          </span>
        </h1>
        <p className="astra-subtitle">
          I build systems, developer tools and applied-AI experiments that can be inspected, tested and challenged.
        </p>
      </div>

      <div className="astra-actions">
        <a href="#projects" className="astra-cta">
          Explore selected work
          <span aria-hidden="true">↘</span>
        </a>
        <div className="astra-links" aria-label="Profile links">
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <span aria-hidden="true">·</span>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <span aria-hidden="true">·</span>
          <a href={site.resume} download>Résumé</a>
        </div>
      </div>

      <div className="astra-meta" aria-hidden="true">
        <span>ayankhan.me</span>
        <span>build · inspect · refine</span>
        <span>scroll to enter ↓</span>
      </div>
    </section>
  )
}
