import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Intro from './components/Intro'
import { CustomCursor, ScrollProgress } from './components/Fx'
import { ContinueWatching, Hero, Navbar, PlayIntro } from './components/Top'
import { About, Achievements, Footer, Journey, Originals, Resume, Skills } from './components/Sections'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis()
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    })
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  return (
    <div className="grain">
      <CustomCursor />
      {entered && <ScrollProgress />}
      <AnimatePresence>{!entered && <Intro onDone={() => setEntered(true)} />}</AnimatePresence>
      {entered && (
        <>
          <Navbar />
          <Hero onPlay={() => setPlaying(true)} />
          <ContinueWatching />
          <About />
          <Journey />
          <Originals />
          <Skills />
          <Achievements />
          <Resume />
          <Footer />
          <PlayIntro open={playing} onClose={() => setPlaying(false)} />
        </>
      )}
    </div>
  )
}
