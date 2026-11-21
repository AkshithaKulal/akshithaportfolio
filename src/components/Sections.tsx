import { useEffect, useState } from 'react'
import { Counter, Marquee, ScrollRail, Tilt } from './Fx'
import { AnimatePresence, motion } from 'framer-motion'
import {
  profile, projects, seasons, skillGenres, topPicks, achievements, certifications, type Project,
} from '../data/portfolio'

function Title({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
      <p className="text-accent text-xs tracking-[0.3em] font-semibold">{eyebrow}</p>
      <h2 className="display text-5xl sm:text-7xl">{children}</h2>
    </motion.div>
  )
}
const wrap = 'px-5 sm:px-10 py-20 xl:py-28 max-w-[1500px] mx-auto'

export function About() {
  return (
    <section id="about" className={wrap}>
      <Title eyebrow="EPISODE 1">The Pilot</Title>
      <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
        <motion.img whileHover={{ rotateY: 8, rotateX: -4 }} style={{ transformPerspective: 800 }} src={profile.photo} alt={profile.fullName} className="rounded-lg w-full max-w-xs object-cover aspect-[3/4] object-top shadow-2xl shadow-accent/20" />
        <div>
          <p className="text-lg sm:text-xl text-ink/75 leading-relaxed">{profile.summary}</p>
          <div className="mt-6 flex max-w-md">
            <div className="bg-card rounded-lg px-8 py-4 text-center hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 transition">
              <div className="display text-4xl text-accent"><Counter to={8.39} decimals={2} /></div>
              <div className="text-xs text-muted">CGPA</div>
            </div>
          </div>
          <p className="mt-6 text-muted">📍 {profile.location}</p>
        </div>
      </div>
    </section>
  )
}

export function Journey() {
  return (
    <section id="journey" className={wrap}>
      <Title eyebrow="EPISODE 2">My Journey</Title>
      <div className="space-y-4 relative">
        <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} className="hidden md:block absolute -left-6 top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-accent via-gold to-transparent" />
        {seasons.map((s, i) => (
          <motion.div key={s.season} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-lg p-6 border-l-4 border-accent">
            <div className="flex flex-wrap justify-between gap-2">
              <span className="display text-2xl text-accent">{s.season}</span>
              <span className="text-sm text-muted">{s.period}</span>
            </div>
            <h3 className="text-xl font-semibold mt-1">{s.title}</h3>
            <p className="text-ink/75">{s.detail}</p>
            <ul className="mt-3 text-sm text-muted space-y-1">
              {s.episodes.map((e, n) => (<li key={e}>E{n + 1} · {e}</li>))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <Tilt className="shrink-0 rounded-xl">
    <motion.button layoutId={`card-${p.id}`} onClick={onOpen} whileHover={{ scale: 1.03 }} className={`w-[80vw] sm:w-[420px] xl:w-[500px] aspect-[4/5] xl:aspect-[4/4.4] rounded-xl bg-gradient-to-br ${p.gradient} p-6 text-left text-white flex flex-col justify-end relative overflow-hidden`}>
      <span className="absolute top-4 left-4 text-xs tracking-widest bg-black/40 px-2 py-1 rounded">ORIGINAL</span>
      <span className="absolute top-3 right-5 display text-8xl text-white/10">{p.title[0]}</span>
      <span className="text-xs text-white/80">{p.genre} · {p.year}</span>
      <h3 className="display text-5xl mt-1">{p.title}</h3>
      <p className="text-sm text-white/85 mt-1">{p.tagline}</p>
      <span className="mt-4 text-sm underline">View details →</span>
    </motion.button>
    </Tilt>
  )
}

export function Originals() {
  const [active, setActive] = useState<Project | null>(null)
  useEffect(() => {
    if (!active) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [active])

  return (
    <section id="originals">
      <div className={wrap + ' pb-10'}>
        <Title eyebrow="EPISODE 3">Originals</Title>
        <ScrollRail>
          {projects.map((p) => (<div key={p.id} className="snap-start shrink-0"><ProjectCard p={p} onOpen={() => setActive(p)} /></div>))}
          <div className="snap-start shrink-0 w-[60vw] sm:w-[320px] flex items-center text-muted display text-4xl">More episodes coming soon…</div>
        </ScrollRail>
      </div>

      <div className={wrap + ' pt-0'}>
        <motion.a
          href="https://listenly-ten.vercel.app/" target="_blank" rel="noreferrer"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="group mb-14 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-card border border-ink/10 p-5 sm:p-6 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 transition"
        >
          <div className="flex items-center gap-4">
            <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full rounded-full bg-[#6b7a4f] opacity-60 animate-ping" /><span className="relative inline-flex h-3 w-3 rounded-full bg-[#6b7a4f]" /></span>
            <div>
              <p className="text-xs tracking-[0.25em] text-accent font-semibold">LIVE NOW</p>
              <p className="display text-3xl sm:text-4xl leading-none mt-1">Try Listenly</p>
              <p className="text-sm text-muted mt-1">Speech emotion recognition, deployed on Vercel · listenly-ten.vercel.app</p>
            </div>
          </div>
          <span className="shine px-6 py-2.5 bg-ink text-bg font-semibold rounded group-hover:bg-accent transition">▶ Open live demo</span>
        </motion.a>
        <h3 className="text-lg font-semibold mb-3">Top 10 Picks in Skills</h3>
        <ScrollRail>
          {topPicks.map((t, i) => (
            <div key={t} className="snap-start shrink-0 flex items-end">
              <span className="display text-[7rem] sm:text-[9rem] leading-[0.8] text-transparent [-webkit-text-stroke:3px_#c9b8a6] select-none">{i + 1}</span>
              <span className="bg-card rounded-md px-4 py-6 w-32 text-sm font-medium -ml-3">{t}</span>
            </div>
          ))}
        </ScrollRail>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[80] bg-[#231a17]/80 backdrop-blur flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div layoutId={`card-${active.id}`} onClick={(e) => e.stopPropagation()} className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-gradient-to-br ${active.gradient} bg-card`}>
              <div className="p-6 sm:p-10 bg-black/55 text-white min-h-full">
                <button onClick={() => setActive(null)} className="float-right text-2xl" aria-label="Close">✕</button>
                <p className="text-xs text-white/80">{active.genre} · {active.year}</p>
                <h3 className="display text-6xl">{active.title}</h3>
                <p className="mt-3 text-white/85">{active.description}</p>
                <ul className="mt-5 space-y-2 text-white/80 list-disc pl-5">
                  {active.highlights.map((h) => (<li key={h}>{h}</li>))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {active.stack.map((s) => (<span key={s} className="text-xs bg-white/15 px-3 py-1 rounded-full">{s}</span>))}
                </div>
                <div className="mt-6 flex gap-3">
                  {active.live && <a href={active.live} target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-white text-black font-semibold rounded">▶ Live Demo</a>}
                  {active.repo && <a href={active.repo} target="_blank" rel="noreferrer" className="px-6 py-2.5 bg-white/20 font-semibold rounded">GitHub</a>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className={wrap}>
      <Title eyebrow="EPISODE 4">Skills by Genre</Title>
      <div className="mb-10 -mx-5 sm:-mx-10 space-y-3">
        <Marquee items={skillGenres.flatMap((g) => g.skills).slice(0, 14)} />
        <Marquee items={skillGenres.flatMap((g) => g.skills).slice(10)} reverse />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {skillGenres.map((g, i) => (
          <motion.div key={g.genre} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-card rounded-xl p-6 hover:shadow-xl hover:shadow-accent/10 transition-shadow">
            <h3 className="display text-3xl text-accent">{g.genre}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.skills.map((s) => (<span key={s} className="text-sm bg-ink/5 border border-ink/15 px-3 py-1 rounded-full hover:bg-accent hover:text-white hover:border-accent hover:-translate-y-0.5 transition">{s}</span>))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function Achievements() {
  return (
    <section id="achievements" className={wrap}>
      <Title eyebrow="EPISODE 5">Awards &amp; Certifications</Title>
      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {achievements.map((a) => (
          <div key={a.title} className="rounded-xl p-6 bg-gradient-to-br from-[#c9953c]/25 to-card border border-[#c9953c]/40">
            <div className="text-3xl">🏆</div>
            <h3 className="display text-3xl mt-2">{a.title}</h3>
            <p className="text-sm text-ink/75 mt-1">{a.detail}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3 overflow-x-auto hide-scroll pb-2">
        {certifications.map((c) => (
          <div key={c} className="shrink-0 w-60 bg-card rounded-lg p-4 text-sm">🎓 {c}</div>
        ))}
      </div>
    </section>
  )
}

export function Resume() {
  const [open, setOpen] = useState(false)
  return (
    <section id="resume" className={wrap}>
      <Title eyebrow="EPISODE 6">The Resume</Title>
      <div className="bg-card text-ink border border-ink/10 shadow-xl shadow-accent/10 rounded-lg p-6 sm:p-10 max-w-3xl">
        <h3 className="text-3xl font-bold">{profile.fullName}</h3>
        <p className="text-muted">{profile.role} · {profile.location}</p>
        <p className="mt-4 text-sm">{profile.summary}</p>
        <div className="mt-6 flex gap-3 flex-wrap">
          <button onClick={() => setOpen(true)} className="shine px-6 py-2.5 bg-ink text-bg rounded font-semibold">View PDF</button>
          <a href={profile.resume} download className="px-6 py-2.5 border border-ink rounded font-semibold">Download</a>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-[85] bg-[#231a17]/90 text-white p-4 flex flex-col" onClick={() => setOpen(false)}>
          <button className="self-end text-2xl mb-2" onClick={() => setOpen(false)}>✕</button>
          <iframe title="Resume" src={profile.resume} className="flex-1 bg-white rounded" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}

export function Footer() {
  const links = [['About', '#about'], ['Journey', '#journey'], ['Originals', '#originals'], ['Skills', '#skills'], ['Achievements', '#achievements'], ['Resume', '#resume']]
  return (
    <footer className="bg-ink text-bg mt-10">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-16 grid gap-12 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.2fr_1fr_1.4fr]">
        <div>
          <a href="#top" className="display text-5xl text-white">{profile.name.toUpperCase()}</a>
          <p className="mt-1 text-sm text-bg/70">{profile.role}</p>
          <p className="mt-4 text-sm text-bg/70 max-w-sm">{profile.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <h4 className="text-xs tracking-[0.25em] text-gold font-semibold mb-4">EXPLORE</h4>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map(([l, h]) => (
              <li key={l}><a href={h} className="text-bg/75 hover:text-white transition">{l}</a></li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-2 lg:col-span-1">
          <h4 className="text-xs tracking-[0.25em] text-gold font-semibold mb-4">GET IN TOUCH</h4>
          <ul className="space-y-2 text-sm">
            <li><a href={`mailto:${profile.email}`} className="text-bg/75 hover:text-white break-words transition">✉ {profile.email}</a></li>
            <li className="text-bg/75">📍 {profile.location}</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="px-5 py-2 text-sm font-semibold rounded border border-bg/30 hover:bg-bg hover:text-ink transition">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="px-5 py-2 text-sm font-semibold rounded border border-bg/30 hover:bg-bg hover:text-ink transition">LinkedIn</a>
            <a href={profile.resume} download className="shine px-5 py-2 text-sm font-semibold rounded bg-accent text-white hover:brightness-110 transition">Resume</a>
          </div>
        </div>
      </div>
      <div className="border-t border-bg/15">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-bg/60">
          <p>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</p>
          <a href="#top" className="hover:text-white transition">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
