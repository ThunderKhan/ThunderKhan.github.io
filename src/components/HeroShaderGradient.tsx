import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'
import { useReducedMotion } from 'motion/react'

/**
 * Deliberately restrained so it reads as atmosphere rather than an effect.
 * This is the main tuning knob for the experiment.
 */
export const HERO_GRADIENT_SPEED = 0.06

export function HeroShaderGradient() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        pixelDensity={1}
        fov={45}
        lazyLoad
        rootMargin="240px"
      >
        <ShaderGradient
          control="props"
          type="plane"
          animate={reducedMotion ? 'off' : 'on'}
          uSpeed={HERO_GRADIENT_SPEED}
          uStrength={0.42}
          uDensity={0.7}
          uFrequency={1.15}
          uAmplitude={0.45}
          color1="#07070b"
          color2="#a78bfa"
          color3="#fb7185"
          brightness={0.62}
          grain="on"
          grainBlending={0.055}
          lightType="3d"
          cAzimuthAngle={180}
          cPolarAngle={90}
          cDistance={3.8}
          cameraZoom={1}
          reflection={0.08}
        />
      </ShaderGradientCanvas>

      {/* Keep the brand colours present without letting the WebGL layer overpower the hero. */}
      <div className="absolute inset-0 bg-black/38" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,transparent_0%,rgba(7,7,11,0.18)_45%,rgba(7,7,11,0.58)_100%)]" />
    </div>
  )
}
