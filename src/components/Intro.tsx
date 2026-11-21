import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, type ProfileKind } from '../data/portfolio'

/** Opening card -> "Who's watching?" profile picker. */
export default function Intro({ onDone }: { onDone: (p: ProfileKind) => void }) {
  const [stage, setStage] = useState<'opening' | 'profiles'>('opening')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (stage === 'opening' && (e.key === 'Enter' || e.key === 'Escape')) setStage('profiles')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage])

  const profiles: { kind: ProfileKind; color: string; emoji: string }[] = [
    { kind: 'Recruiter', color: 'bg-[#b4532a]', emoji: '💼' },
    { kind: 'Developer', color: 'bg-[#c9953c]', emoji: '💻' },
    { kind: 'Creative', color: 'bg-[#7a5c4a]', emoji: '🎨' },
  ]

  return (
    <motion.div className="fixed inset-0 z-[100] bg-bg flex items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <AnimatePresence mode="wait">
        {stage === 'opening' ? (
          <motion.div key="o" className="text-center px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
              onClick={() => setStage('profiles')}
              className="mt-8 px-8 py-3 bg-ink text-bg font-semibold rounded hover:bg-accent transition"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}
            >
              ▶ PLAY
            </motion.button>
            <p className="mt-4 text-xs text-muted">Press Enter or Esc to skip. Not affiliated with any streaming service.</p>
          </motion.div>
        ) : (
          <motion.div key="p" className="text-center px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl sm:text-5xl font-semibold mb-10">Who's watching?</h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {profiles.map((p, i) => (
                <motion.button
                  key={p.kind}
                  onClick={() => onDone(p.kind)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                  className="group flex flex-col items-center gap-3 text-muted hover:text-ink"
                >
                  <span className={`w-28 h-28 sm:w-36 sm:h-36 rounded-md flex items-center justify-center text-5xl ${p.color} group-hover:ring-4 ring-ink transition`}>{p.emoji}</span>
                  <span className="text-lg">{p.kind}</span>
                </motion.button>
              ))}
            </div>
            <p className="mt-10 text-xs text-muted">Your choice only changes the order of sections.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
