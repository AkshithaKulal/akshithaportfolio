import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Intro from './components/Intro'
import { CustomCursor, ScrollProgress } from './components/Fx'
import { ContinueWatching, Hero, Navbar, PlayIntro } from './components/Top'
import { About, Achievements, Footer, Journey, Originals, Resume, Skills } from './components/Sections'
import { profileOrder, type ProfileKind } from './data/portfolio'

const sections: Record<string, JSX.Element> = {
  about: <About key="about" />,
  journey: <Journey key="journey" />,
  originals: <Originals key="originals" />,
  skills: <Skills key="skills" />,
  achievements: <Achievements key="achievements" />,
  resume: <Resume key="resume" />,
}

export default function App() {
  const [kind, setKind] = useState<ProfileKind | null>(null)
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
      {kind && <ScrollProgress />}
      <AnimatePresence>{!kind && <Intro onDone={setKind} />}</AnimatePresence>
      {kind && (
        <>
          <Navbar kind={kind} onSwitch={() => setKind(null)} />
          <Hero onPlay={() => setPlaying(true)} />
          <ContinueWatching kind={kind} />
          {profileOrder[kind].map((s) => sections[s])}
          <Footer />
          <PlayIntro open={playing} onClose={() => setPlaying(false)} />
        </>
      )}
    </div>
  )
}
