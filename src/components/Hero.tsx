import { CinematicHero } from './CinematicHero'
import { HeroShaderGradient } from './HeroShaderGradient'

/**
 * Primary portfolio hero.
 *
 * The ShaderGradient is intentionally scoped to the hero and composited as a
 * very soft atmospheric layer over the existing cinematic imagery. Keeping it
 * in this wrapper means nothing below the hero pays the WebGL/rendering cost.
 */
export function Hero() {
  return (
    <div className="relative isolate">
      <CinematicHero />
      <div className="pointer-events-none absolute inset-0 z-[5] opacity-30 mix-blend-screen">
        <div className="sticky top-0 h-svh overflow-hidden">
          <HeroShaderGradient />
        </div>
      </div>
    </div>
  )
}
