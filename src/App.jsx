import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import styles from './App.module.css'

const EVENT = new Date('2026-07-11T16:30:00')

const ANIMALS = [
  { src: 'https://img.icons8.com/fluency/96/lion.png', name: 'León' },
  { src: 'https://img.icons8.com/fluency/96/elephant.png', name: 'Elefante' },
  { src: 'https://img.icons8.com/fluency/96/giraffe.png', name: 'Jirafa' },
  { src: 'https://img.icons8.com/fluency/96/dolphin.png', name: 'Delfín' },
]

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: ((i * 4.61 + 3) % 98) + 1,
  size: 5 + (i * 2.1) % 9,
  duration: 10 + (i * 1.9) % 12,
  delay: (i * 1.1) % 9,
  type: ['leaf', 'star', 'dot', 'ring'][i % 4],
}))

function useCountdown(target) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}

function Reveal({ children, delay = 0, y = 50 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const time = useCountdown(EVENT)

  const handleEnter = () => {
    setEntered(true)
    const fire = (opts) =>
      confetti({
        colors: ['#A3C9A8', '#284634', '#D9A05B', '#ffffff', '#f0e6d3', '#c8e6c9'],
        gravity: 0.8,
        ticks: 200,
        ...opts,
      })
    setTimeout(() => fire({ particleCount: 80, spread: 60, origin: { x: 0.2, y: 0.7 } }), 0)
    setTimeout(() => fire({ particleCount: 80, spread: 60, origin: { x: 0.8, y: 0.7 } }), 200)
    setTimeout(() => fire({ particleCount: 60, spread: 100, origin: { x: 0.5, y: 0.5 } }), 400)
  }

  return (
    <div className={styles.root}>
      {/* Floating background particles */}
      <div className={styles.particlesBg} aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className={`${styles.particle} ${styles[`p_${p.type}`]}`}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Mesh gradient orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      {/* ── GATEKEEPER ── */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            className={styles.gate}
            key="gate"
            exit={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className={styles.gateInner}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className={styles.gateBadge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                ✦ Invitación Especial ✦
              </motion.div>

              <h1 className={styles.gateName}>Thiago</h1>

              <p className={styles.gateSub}>
                Está en camino y queremos<br />celebrarlo a tu lado
              </p>

              <motion.button
                className={styles.gateBtn}
                onClick={handleEnter}
                whileHover={{ scale: 1.07, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              >
                <span>🌿</span> Abrir Invitación
              </motion.button>
            </motion.div>

            {/* Gate decorative animals */}
            <div className={styles.gateAnimals} aria-hidden="true">
              {ANIMALS.map((a, i) => (
                <motion.img
                  key={a.name}
                  src={a.src}
                  alt=""
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.18, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.8 }}
                  style={{ width: 48 + (i % 2) * 12 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN INVITATION ── */}
      <AnimatePresence>
        {entered && (
          <motion.div
            className={styles.main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >

            {/* ─ HERO ─ */}
            <section className={styles.hero}>
              <motion.div
                className={styles.heroInner}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.eyebrow}>Baby Shower</div>
                <h1 className={styles.heroName}>Thiago</h1>
                <p className={styles.heroSub}>
                  Estamos muy felices de compartir contigo<br />
                  la llegada de nuestro mayor tesoro.
                </p>
              </motion.div>

              {/* Animals grid */}
              <div className={styles.animalsRow}>
                {ANIMALS.map((a, i) => (
                  <motion.div
                    key={a.name}
                    className={styles.animalCard}
                    initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.13,
                      type: 'spring',
                      stiffness: 260,
                      damping: 16,
                    }}
                    whileHover={{ y: -12, scale: 1.14, rotate: i % 2 === 0 ? 5 : -5 }}
                  >
                    <img src={a.src} alt={a.name} />
                    <span>{a.name}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className={styles.scrollHint}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
              >
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ↓
                </motion.span>
                <span>Desliza para ver los detalles</span>
              </motion.div>
            </section>

            {/* ─ COUNTDOWN ─ */}
            <Reveal>
              <section className={styles.section}>
                <div className={styles.sectionLabel}>⏳ La espera pronto termina</div>
                <h2 className={styles.sectionTitle}>Faltan solo…</h2>
                <div className={styles.countdownRow}>
                  {[
                    { v: time.days, l: 'Días' },
                    { v: time.hours, l: 'Horas' },
                    { v: time.minutes, l: 'Min' },
                    { v: time.seconds, l: 'Seg' },
                  ].map(({ v, l }, i) => (
                    <div key={l} className={styles.tick}>
                      <div className={styles.tickNumWrap}>
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={v}
                            className={styles.tickNum}
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 30, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {String(v).padStart(2, '0')}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className={styles.tickLabel}>{l}</span>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* ─ EVENT INFO ─ */}
            <Reveal delay={0.1}>
              <section className={styles.section}>
                <div className={styles.sectionLabel}>📋 Detalles del evento</div>
                <h2 className={styles.sectionTitle}>¿Cuándo y dónde?</h2>
                <div className={styles.infoList}>
                  {[
                    {
                      icon: '📅',
                      label: 'Fecha',
                      value: 'Sábado, 11 de Julio · 2026',
                      sub: 'Marca el día en tu calendario',
                    },
                    {
                      icon: '🕒',
                      label: 'Hora',
                      value: '4:30 de la tarde',
                      sub: 'Te esperamos puntual',
                    },
                    {
                      icon: '📍',
                      label: 'Lugar',
                      value: 'Nuestro dulce hogar',
                      sub: 'Te compartimos la ubicación abajo',
                    },
                  ].map(({ icon, label, value, sub }, i) => (
                    <motion.div
                      key={label}
                      className={styles.infoRow}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className={styles.infoIconWrap}>{icon}</div>
                      <div className={styles.infoText}>
                        <span className={styles.infoLabel}>{label}</span>
                        <span className={styles.infoValue}>{value}</span>
                        <span className={styles.infoSub}>{sub}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* ─ ACTIONS ─ */}
            <Reveal delay={0.1}>
              <section className={`${styles.section} ${styles.actionsSection}`}>
                <motion.a
                  href="https://maps.app.goo.gl/KjbMn9h8Q4rpLre67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaPrimary}
                  whileHover={{ scale: 1.04, y: -5 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                >
                  <span className={styles.ctaIcon}>📍</span>
                  <div className={styles.ctaText}>
                    <span className={styles.ctaLabel}>Google Maps</span>
                    <span className={styles.ctaMain}>Ver Ubicación</span>
                  </div>
                  <span className={styles.ctaArrow}>→</span>
                </motion.a>

                <motion.a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Baby+Shower+Thiago&dates=20260711T213000Z/20260712T013000Z&details=¡Te+esperamos+en+el+Baby+Shower+de+Thiago!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaSecondary}
                  whileHover={{ scale: 1.04, y: -5 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                >
                  <span className={styles.ctaIcon}>🗓️</span>
                  <div className={styles.ctaText}>
                    <span className={styles.ctaLabel}>Calendario</span>
                    <span className={styles.ctaMain}>Agendar Evento</span>
                  </div>
                  <span className={styles.ctaArrow}>→</span>
                </motion.a>
              </section>
            </Reveal>

            {/* ─ FOOTER ─ */}
            <footer className={styles.footer}>
              <div className={styles.footerDivider} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              >
                <p className={styles.footerWith}>Con todo el amor del mundo,</p>
                <p className={styles.footerSign}>Sus Papás</p>
                <div className={styles.footerLeaves}>🌿 🍃 🌿</div>
              </motion.div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
