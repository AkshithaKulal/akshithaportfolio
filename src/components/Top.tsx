import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { profile, continueWatching, projects } from '../data/portfolio'
import { Blobs, Magnetic, ScrollRail, SplitText, Typewriter } from './Fx'

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 120)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = ['about', 'journey', 'originals', 'skills', 'achievements', 'resume']
  return (
    <motion.nav animate={{ y: hidden ? -80 : 0 }} className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-bg via-bg/80 to-transparent">
      <div className="flex items-center justify-between px-5 sm:px-10 h-16 xl:h-20 max-w-[1500px] mx-auto">
        <a href="#top" className="display text-accent text-3xl">{profile.name.toUpperCase()}</a>
        <div className="hidden md:flex gap-6 text-sm text-ink/75">
          {links.map((l) => (
            <a key={l} href={`#${l}`} className="capitalize hover:text-ink transition">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="md:hidden text-2xl" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-bg/95 px-5 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l} href={`#${l}`} onClick={() => setOpen(false)} className="capitalize text-ink/75">{l}</a>
          ))}
        </div>
      )}
    </motion.nav>
  )
}

const dots = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100, top: (i * 53) % 100, size: 2 + (i % 3), delay: (i % 7) * 0.4,
}))

export function Hero({ onPlay }: { onPlay: () => void }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])
  return (
    <header id="top" className="relative min-h-screen overflow-hidden flex items-end pb-20 md:items-center md:pb-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f1e3d3] via-bg to-[#ead9c6]" />
      <Blobs />
      {dots.map((d, i) => (
        <span key={i} className="absolute rounded-full bg-accent/40" style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, animation: `floaty ${4 + (i % 4)}s ease-in-out ${d.delay}s infinite` }} />
      ))}
      <div className="absolute inset-y-0 w-1/5 bg-gradient-to-r from-transparent via-white/50 to-transparent" style={{ animation: 'streak 7s linear infinite' }} />
      {/* phones/tablets: photo as a faded banner at the top */}
      <motion.img style={{ y }} src={profile.photo} alt={profile.fullName} className="md:hidden absolute right-0 top-0 w-full h-[62vh] object-cover object-top opacity-80 [mask-image:linear-gradient(to_bottom,black_45%,transparent)]" />
      <div className="md:hidden absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-5 sm:px-10 pt-[48vh] md:pt-24 md:pb-10 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
       <div>
        <p className="text-accent font-semibold tracking-[0.3em] text-xs mb-3">A PORTFOLIO ORIGINAL SERIES</p>
        <h1 style={{ fontSize: 'clamp(4.5rem, 10vw, 11rem)' }} className="display leading-[0.88]">
          <SplitText text="AKSHITHA" delay={0.1} /><br />
          <SplitText text="KULAL" delay={0.5} />
        </h1>
        <p className="mt-5 text-xl sm:text-2xl xl:text-3xl text-ink/80 min-h-[1.6em]"><Typewriter phrases={[profile.role, 'RAG & LLM Builder', 'Deep Learning Enthusiast', 'Computer Vision Tinkerer']} /></p>
        <p className="mt-3 text-muted max-w-md xl:max-w-lg xl:text-lg">{profile.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {profile.chips.map((c) => (
            <span key={c} className="text-xs px-3 py-1 rounded-full bg-ink/10 backdrop-blur border border-ink/15">{c}</span>
          ))}
        </div>
        <div className="mt-8 flex gap-3 flex-wrap">
          <Magnetic><button onClick={onPlay} className="shine px-7 py-3 bg-ink text-bg font-semibold rounded hover:bg-accent transition">▶ Play Intro</button></Magnetic>
          <Magnetic><a href="#originals" className="inline-block px-7 py-3 bg-ink/15 backdrop-blur font-semibold rounded hover:bg-accent/40 transition">ⓘ More Info</a></Magnetic>
        </div>
       </div>
       {/* desktop: framed portrait */}
       <motion.div style={{ y }} className="hidden md:block relative justify-self-center w-full max-w-[520px]">
        <div className="absolute -inset-4 translate-x-5 translate-y-5 rounded-[2rem] bg-accent/20" />
        <div className="absolute -inset-4 -translate-x-3 -translate-y-3 rounded-[2rem] border-2 border-gold/60" />
        <img src={profile.photo} alt={profile.fullName} className="relative w-full aspect-[3/4] max-h-[72vh] object-cover object-top rounded-[2rem] shadow-2xl shadow-accent/30" />
        <div className="absolute -bottom-6 -left-6 bg-card rounded-xl px-5 py-3 shadow-xl border border-ink/10">
          <div className="display text-3xl text-accent">8.39 CGPA</div>
          <div className="text-xs text-muted">Final-year AI/ML · Canara Engineering College</div>
        </div>
       </motion.div>
      </div>
    </header>
  )
}

export function ContinueWatching() {
  return (
    <section className="px-5 sm:px-10 pt-6 relative z-10 max-w-[1500px] mx-auto">
      <h3 className="text-lg font-semibold mb-3">Continue Watching</h3>
      <ScrollRail>
        {continueWatching.map((c) => {
          const p = projects.find((x) => x.id === c.id)!
          return (
            <a key={c.id} href="#originals" className={`snap-start shrink-0 w-64 sm:w-72 aspect-video rounded-md bg-gradient-to-br ${p.gradient} p-4 text-white flex flex-col justify-end relative overflow-hidden hover:scale-105 transition`}>
              <span className="display text-3xl">{c.title}</span>
              <span className="text-xs text-white/85">{p.genre}</span>
              <span className="absolute bottom-0 left-0 h-1 bg-accent" style={{ width: `${c.progress}%` }} />
            </a>
          )
        })}
      </ScrollRail>
    </section>
  )
}

const SLIDE_MS = 4500

type Slide = { kicker: string; title: string; sub: string; chip?: string; cta?: boolean }
const slides: Slide[] = [
  { kicker: 'Meet', title: profile.fullName, sub: profile.role, chip: 'Mangalore, India' },
  { kicker: 'Education', title: 'Final-year AI/ML', sub: 'Canara Engineering College, Mangalore', chip: '8.39 CGPA' },
  { kicker: 'Original 01', title: 'SilentTalk', sub: 'Indian Sign Language, spoken aloud in Tulu', chip: 'Computer Vision' },
  { kicker: 'Original 02', title: 'AI Knowledge Bot', sub: 'A RAG chatbot grounded in your own documents', chip: 'Generative AI' },
  { kicker: 'Original 03', title: 'Listenly', sub: 'Eight emotions read from speech, live on Vercel', chip: 'Deep Learning' },
  { kicker: 'Next episode', title: 'Let’s build together', sub: profile.email, cta: true },
]

/** Fullscreen highlight reel. Each slide fills its progress bar, then advances; stops on the last. */
export function PlayIntro({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const last = slides.length - 1
  const go = (n: number) => setI(Math.min(last, Math.max(0, n)))

  useEffect(() => { if (open) { setI(0); setPaused(false) } }, [open])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === ' ') { e.preventDefault(); setPaused((p) => !p) }
      if (e.key === 'ArrowRight') setI((n) => Math.min(last, n + 1))
      if (e.key === 'ArrowLeft') setI((n) => Math.max(0, n - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, last])

  const s = slides[i]
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] bg-[#231a17] text-white overflow-hidden"
          initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full bg-accent/30 blur-3xl" style={{ animation: 'drift 16s ease-in-out infinite' }} />
          <div className="absolute -bottom-48 -right-24 w-[32rem] h-[32rem] rounded-full bg-gold/25 blur-3xl" style={{ animation: 'drift 20s ease-in-out infinite reverse' }} />

          {/* progress segments */}
          <div className="absolute top-0 inset-x-0 z-20 flex gap-1.5 p-4 sm:px-10">
            {slides.map((_, n) => (
              <button key={n} onClick={() => go(n)} aria-label={`Go to slide ${n + 1}`} className="h-1.5 flex-1 bg-white/20 rounded overflow-hidden">
                <div
                  key={n === i ? `a${i}` : `b${n}`}
                  className="h-full bg-white"
                  style={n < i ? { width: '100%' } : n > i ? { width: '0%' } : {
                    animation: `segfill ${SLIDE_MS}ms linear forwards`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                  onAnimationEnd={() => { if (n === i && i < last) go(i + 1) }}
                />
              </button>
            ))}
          </div>

          <div className="relative z-10 h-full max-w-[1300px] mx-auto px-6 sm:px-12 grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center pt-16 pb-28">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.45 }}>
                <p className="text-gold font-semibold tracking-[0.35em] text-xs sm:text-sm">{s.kicker.toUpperCase()}</p>
                <h2 className="display mt-3 leading-[0.92]" style={{ fontSize: 'clamp(3.2rem, 9vw, 8.5rem)' }}>{s.title}</h2>
                <p className="mt-4 text-lg sm:text-2xl text-white/80 break-words">{s.sub}</p>
                {s.chip && <span className="inline-block mt-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm">{s.chip}</span>}
                {s.cta && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={`mailto:${profile.email}`} className="px-7 py-3 bg-accent text-white font-semibold rounded hover:brightness-110 transition">✉ Email me</a>
                    <a href="#originals" onClick={onClose} className="px-7 py-3 bg-white/15 font-semibold rounded hover:bg-white/25 transition">See the projects</a>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={`p${i}`}
              initial={{ opacity: 0, rotate: i % 2 ? 4 : -4, scale: 0.92 }} animate={{ opacity: 1, rotate: i % 2 ? 2 : -2, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block justify-self-center w-full max-w-[380px]"
            >
              <img src={profile.photo} alt="" className="w-full aspect-[3/4] object-cover object-top rounded-3xl shadow-2xl shadow-black/50 border-4 border-white/10" />
            </motion.div>
          </div>

          <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between gap-3 px-4 sm:px-10 py-5 text-sm">
            <span className="text-white/60 tabular-nums whitespace-nowrap">{i + 1}/{slides.length}</span>
            <div className="flex gap-2">
              <button onClick={() => go(i - 1)} disabled={i === 0} className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-30 transition" aria-label="Previous">←</button>
              <button onClick={() => setPaused(!paused)} className="px-3 sm:px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition sm:min-w-[6.5rem] whitespace-nowrap">{paused ? '▶' : '⏸'}<span className="hidden sm:inline">{paused ? ' Resume' : ' Pause'}</span></button>
              <button onClick={() => go(i + 1)} disabled={i === last} className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-30 transition" aria-label="Next">→</button>
            </div>
            <button onClick={onClose} className="px-3 sm:px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gold transition whitespace-nowrap">✕ Close</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
