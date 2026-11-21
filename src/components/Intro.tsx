import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'
import { Blobs, SplitText } from './Fx'

const LOAD_MS = 3200

/**
 * Opening title sequence: name rises in, a ring fills around her photo,
 * then the Play button unlocks. Enter / Esc / Skip jump straight in.
 */
export default function Intro({ onDone }: { onDone: () => void }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), LOAD_MS)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') onDone()
    }
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey) }
  }, [onDone])

  const R = 62
  const C = 2 * Math.PI * R

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg overflow-hidden flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <Blobs />

      <button
        onClick={onDone}
        className="absolute top-5 right-5 sm:top-8 sm:right-10 text-sm font-semibold text-ink/70 hover:text-accent transition px-3 py-1.5 rounded border border-ink/20 hover:border-accent"
      >
        Skip ›
      </button>

      <div className="relative text-center px-6 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="h-px w-10 sm:w-20 bg-accent origin-right" />
          <span className="tracking-[0.45em] text-[10px] sm:text-xs text-muted font-semibold">A PORTFOLIO ORIGINAL</span>
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="h-px w-10 sm:w-20 bg-accent origin-left" />
        </motion.div>

        <h1 className="display text-accent leading-[0.9]" style={{ fontSize: 'clamp(5rem, 17vw, 12rem)' }}>
          <SplitText text={profile.name.toUpperCase()} delay={0.5} />
        </h1>
        <motion.h2
          initial={{ opacity: 0, letterSpacing: '0.1em' }} animate={{ opacity: 1, letterSpacing: '0.45em' }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="display text-2xl sm:text-5xl mt-2 pl-[0.45em]"
        >
          THE SERIES
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.9, duration: 0.6 }}
          className="relative mx-auto mt-8 sm:mt-10 w-32 h-32 sm:w-36 sm:h-36"
        >
          <svg viewBox="0 0 140 140" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="70" cy="70" r={R} fill="none" stroke="currentColor" strokeWidth="3" className="text-ink/10" />
            <motion.circle
              cx="70" cy="70" r={R} fill="none" strokeWidth="4" strokeLinecap="round" stroke="var(--color-accent)"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }} animate={{ strokeDashoffset: 0 }}
              transition={{ delay: 0.2 + 1.9, duration: (LOAD_MS - 2100) / 1000 + 0.9, ease: 'easeInOut' }}
            />
          </svg>
          <img src={profile.photo} alt="" className="absolute inset-[12px] w-[calc(100%-24px)] h-[calc(100%-24px)] rounded-full object-cover object-top shadow-xl shadow-accent/20" />
        </motion.div>

        <div className="mt-8 h-24 flex flex-col items-center justify-start">
          {ready ? (
            <>
              <motion.button
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                onClick={onDone}
                className="shine px-10 py-3 bg-ink text-bg font-semibold rounded hover:bg-accent transition"
                style={{ animation: 'pulseRing 2s ease-out infinite' }}
              >
                ▶ PLAY
              </motion.button>
              <p className="mt-3 text-xs text-muted">or press Enter</p>
            </>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-xs tracking-[0.3em] text-muted">
              LOADING EPISODE 1…
            </motion.p>
          )}
        </div>

        <p className="absolute -bottom-10 inset-x-0 text-[10px] text-muted/70 hidden sm:block">
          A fictional streaming-style portfolio. Not affiliated with any streaming service.
        </p>
      </div>
    </motion.div>
  )
}
