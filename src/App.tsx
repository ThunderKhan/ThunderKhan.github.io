import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { OpenSource } from './components/OpenSource'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        Skip to main content
      </a>
      <Navigation />
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
    </>
  )
}
