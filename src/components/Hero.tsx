import { HeroShaderGradient } from './HeroShaderGradient'

/**
 * Temporary shader-only hero preview.
 *
 * The cinematic hero is intentionally disabled for now so the ShaderGradient
 * can be evaluated on its own without the existing imagery masking it.
 */
export function Hero() {
  return (
    <section id="hero" aria-label="Shader gradient preview" className="relative h-svh overflow-hidden bg-black">
      <div className="absolute inset-0">
        <HeroShaderGradient />
      </div>
    </section>
  )
}
