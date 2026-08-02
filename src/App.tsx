import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { OpenSource } from './components/OpenSource'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { AmbientBackground } from './components/AmbientBackground'
import { FloatingDock } from './components/FloatingDock'
import { useBackgroundMode } from './hooks/useBackgroundMode'

export default function App() {
  const { mode, selectMode } = useBackgroundMode()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        Skip to main content
      </a>
      <AmbientBackground mode={mode} />
      <Navigation backgroundMode={mode} onSelectBackground={selectMode} />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <OpenSource />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <FloatingDock />
    </>
  )
}
