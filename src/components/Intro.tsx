import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'

/** Opening title card. Press Play (or Enter / Esc) to enter the site. */
export default function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') onDone()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDone])

  return (
    <motion.div className="fixed inset-0 z-[100] bg-bg flex items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="text-center px-6">
        <motion.p className="tracking-[0.5em] text-xs text-muted mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          A PORTFOLIO ORIGINAL
        </motion.p>
        <motion.h1 className="display text-accent text-7xl sm:text-9xl" initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}>
          {profile.name.toUpperCase()}
        </motion.h1>
        <motion.h2 className="display text-3xl sm:text-5xl tracking-[0.3em] mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          THE SERIES
        </motion.h2>
        <motion.img src={profile.photo} alt="" className="w-24 h-24 rounded-full object-cover object-top mx-auto mt-8 ring-2 ring-accent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }} />
        <motion.button
          onClick={onDone}
          className="mt-8 px-8 py-3 bg-ink text-bg font-semibold rounded hover:bg-accent transition"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}
        >
          ▶ PLAY
        </motion.button>
        <p className="mt-4 text-xs text-muted">Press Enter or Esc to skip. Not affiliated with any streaming service.</p>
      </div>
    </motion.div>
  )
}
