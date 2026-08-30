import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')!

// Blog route HTML can contain a build-time static article fallback for crawlers
// and no-JS readers. The interactive React app replaces that fallback on load.
if (rootElement.dataset.prerendered === 'true') {
  rootElement.replaceChildren()
  delete rootElement.dataset.prerendered
}

createRoot(rootElement).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
