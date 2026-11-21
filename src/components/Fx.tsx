import { useEffect, useRef, useState, type ReactNode } from 'react'
import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'

/** True when the device has a precise pointer and the user has not asked for reduced motion. */
export function useFancyPointer() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const f = () => setOk(m.matches)
    f(); m.addEventListener('change', f)
    return () => m.removeEventListener('change', f)
  }, [])
  return ok
}

/** Thin accent bar at the top showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-accent to-gold z-[70]" />
}

/** Dot + trailing ring that grows over links and buttons. */
export function CustomCursor() {
  const fancy = useFancyPointer()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 220, damping: 22 })
  const ry = useSpring(y, { stiffness: 220, damping: 22 })
  const [big, setBig] = useState(false)
  useEffect(() => {
    if (!fancy) return
    document.documentElement.classList.add('no-cursor')
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY)
      setBig(!!(e.target as HTMLElement)?.closest?.('a, button, [role="button"]'))
    }
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mousemove', move); document.documentElement.classList.remove('no-cursor') }
  }, [fancy, x, y])
  if (!fancy) return null
  return (
    <>
      <motion.div style={{ x, y }} className="pointer-events-none fixed top-0 left-0 z-[200] -ml-1 -mt-1 w-2 h-2 rounded-full bg-accent" />
      <motion.div style={{ x: rx, y: ry }} className="pointer-events-none fixed top-0 left-0 z-[200]">
        <motion.div animate={{ scale: big ? 1.8 : 1, opacity: big ? 0.5 : 0.9 }} className="-ml-4 -mt-4 w-8 h-8 rounded-full border border-accent" />
      </motion.div>
    </>
  )
}

/** Wraps children so they are gently pulled toward the pointer. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const fancy = useFancyPointer()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })
  if (!fancy) return <>{children}</>
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

/** 3D tilt that follows the pointer, plus a soft light spot under it. */
export function Tilt({ children, className = '', max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const fancy = useFancyPointer()
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(0, { stiffness: 180, damping: 18 })
  const ry = useSpring(0, { stiffness: 180, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glow = useTransform([gx, gy], ([a, b]) => `radial-gradient(260px circle at ${a}% ${b}%, rgba(255,255,255,0.28), transparent 60%)`)
  const [hover, setHover] = useState(false)
  if (!fancy) return <div className={className}>{children}</div>
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      onMouseEnter={() => setHover(true)}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        ry.set((px - 0.5) * max * 2)
        rx.set(-(py - 0.5) * max * 2)
        gx.set(px * 100); gy.set(py * 100)
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); setHover(false) }}
    >
      {children}
      <motion.div style={{ background: glow, opacity: hover ? 1 : 0 }} className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300" />
    </motion.div>
  )
}

/** Counts from 0 to `to` when scrolled into view. Supports decimals. */
export function Counter({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>
}

/** Types out each phrase, pauses, deletes, and moves on. */
export function Typewriter({ phrases }: { phrases: string[] }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const full = phrases[i]
    const t = setTimeout(() => {
      if (!del) {
        setText(full.slice(0, text.length + 1))
        if (text.length + 1 === full.length) setTimeout(() => setDel(true), 1400)
      } else {
        setText(full.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDel(false); setI((n) => (n + 1) % phrases.length) }
      }
    }, del ? 35 : 75)
    return () => clearTimeout(t)
  }, [text, del, i, phrases])
  return (
    <span>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-[-0.12em]" style={{ animation: 'blink 1s steps(1) infinite' }} />
    </span>
  )
}

/** Letters rise into place one after another. */
export function SplitText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((ch, n) => (
        <span key={n} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 6 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ delay: delay + n * 0.04, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Endless horizontal ticker. Pauses on hover. */
export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items]
  return (
    <div className="group overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="inline-flex gap-4 py-2 group-hover:[animation-play-state:paused]" style={{ animation: `marquee 32s linear infinite ${reverse ? 'reverse' : ''}` }}>
        {row.map((t, n) => (
          <span key={n} className="display text-4xl sm:text-5xl px-6 py-2 rounded-full border border-ink/15 text-ink/80 hover:bg-accent hover:text-white hover:border-accent transition-colors">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Soft colored blobs drifting in the background. */
export function Blobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute -top-32 -left-24 w-[34rem] h-[34rem] rounded-full bg-accent/20 blur-3xl" style={{ animation: 'drift 18s ease-in-out infinite' }} />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-gold/25 blur-3xl" style={{ animation: 'drift 22s ease-in-out infinite reverse' }} />
      <div className="absolute -bottom-40 left-1/3 w-[28rem] h-[28rem] rounded-full bg-[#7a5c4a]/15 blur-3xl" style={{ animation: 'drift 26s ease-in-out infinite' }} />
    </div>
  )
}

/**
 * Horizontal row you can scroll everywhere: swipe on touch, drag with a mouse,
 * wheel/trackpad, arrow buttons, and a progress bar underneath.
 */
export function ScrollRail({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [left, setLeft] = useState(false)
  const [right, setRight] = useState(false)
  const [progress, setProgress] = useState({ start: 0, size: 100 })
  const drag = useRef({ down: false, x: 0, sl: 0, moved: false })

  const update = () => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setLeft(el.scrollLeft > 4)
    setRight(el.scrollLeft < max - 4)
    const size = el.scrollWidth ? (el.clientWidth / el.scrollWidth) * 100 : 100
    setProgress({ size, start: max > 0 ? (el.scrollLeft / max) * (100 - size) : 0 })
  }
  useEffect(() => {
    update()
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    Array.from(el.children).forEach((c) => ro.observe(c))
    window.addEventListener('resize', update)
    return () => { ro.disconnect(); window.removeEventListener('resize', update) }
  }, [])

  const endDrag = () => {
    if (!drag.current.down) return
    drag.current.down = false
    const el = ref.current
    if (el) { el.style.scrollSnapType = ''; el.style.scrollBehavior = '' }
  }

  const by = (dir: 1 | -1) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <div className={`relative group/rail ${className}`}>
      <div
        ref={ref}
        onScroll={update}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') return
          drag.current = { down: true, x: e.clientX, sl: ref.current!.scrollLeft, moved: false }
          ref.current!.style.scrollSnapType = 'none'
          ref.current!.style.scrollBehavior = 'auto'
        }}
        onPointerMove={(e) => {
          const d = drag.current
          if (!d.down) return
          const dx = e.clientX - d.x
          if (Math.abs(dx) > 5) d.moved = true
          ref.current!.scrollLeft = d.sl - dx
        }}
        onPointerUp={() => endDrag()}
        onPointerLeave={() => endDrag()}
        onClickCapture={(e) => { if (drag.current.moved) { e.stopPropagation(); e.preventDefault(); drag.current.moved = false } }}
        className="flex gap-4 sm:gap-6 overflow-x-auto hide-scroll snap-x snap-mandatory scroll-smooth pb-4 cursor-grab active:cursor-grabbing overscroll-x-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </div>

      <button
        aria-label="Scroll left" onClick={() => by(-1)}
        className={`hidden sm:flex absolute left-1 top-[40%] -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-ink text-bg shadow-lg hover:bg-accent transition ${left ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >←</button>
      <button
        aria-label="Scroll right" onClick={() => by(1)}
        className={`hidden sm:flex absolute right-1 top-[40%] -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-ink text-bg shadow-lg hover:bg-accent transition ${right ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >→</button>

      <div className="mt-1 h-1 rounded-full bg-ink/10 overflow-hidden" aria-hidden>
        <div className="h-full rounded-full bg-accent transition-[margin,width] duration-150" style={{ width: `${progress.size}%`, marginLeft: `${progress.start}%` }} />
      </div>
    </div>
  )
}
