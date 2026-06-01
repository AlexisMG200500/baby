import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import styles from './App.module.css'

const EVENT = new Date('2026-07-11T16:30:00')

const ANIMALS = [
  { emoji: '🦁', name: 'León' },
  { emoji: '🐘', name: 'Elefante' },
  { emoji: '🦒', name: 'Jirafa' },
  { emoji: '🐬', name: 'Delfín' },
  { emoji: '🐼', name: 'Panda' },
  { emoji: '🦊', name: 'Zorro' },
  { emoji: '🐸', name: 'Rana' },
  { emoji: '🦋', name: 'Mariposa' },
  { emoji: '🐨', name: 'Koala' },
  { emoji: '🦜', name: 'Loro' },
  { emoji: '🦔', name: 'Erizo' },
  { emoji: '🐧', name: 'Pingüino' },
]

const GATE_ANIMALS = ['🦁', '🐘', '🦒', '🐬']

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: ((i * 3.17 + 3) % 98) + 1,
  size: 4 + (i * 2.1) % 8,
  duration: 14 + (i * 1.9) % 14,
  delay: (i * 0.9) % 14,
  type: ['leaf', 'dot', 'ring', 'leaf'][i % 4],
}))

const INFO = [
  {
    label: 'Fecha',
    value: 'Sábado, 11 de Julio de 2026',
    sub: 'Marca este día en tu calendario',
  },
  {
    label: 'Hora',
    value: '4:30 de la tarde',
    sub: 'Las puertas abren a las 4:00 pm',
  },
  {
    label: 'Lugar',
    value: 'Nuestro hogar',
    sub: 'La dirección exacta, en el mapa de abajo',
  },
]

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

function Reveal({ children, delay = 0, y = 30 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
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
        colors: ['#A3C9A8', '#284634', '#D9A05B', '#ffffff', '#f0e6d3'],
        gravity: 0.85,
        ticks: 180,
        ...opts,
      })
    setTimeout(() => fire({ particleCount: 70, spread: 55, origin: { x: 0.2, y: 0.7 } }), 0)
    setTimeout(() => fire({ particleCount: 70, spread: 55, origin: { x: 0.8, y: 0.7 } }), 220)
    setTimeout(() => fire({ particleCount: 55, spread: 90, origin: { x: 0.5, y: 0.55 } }), 440)
    setTimeout(() => fire({ particleCount: 40, spread: 70, origin: { x: 0.35, y: 0.45 } }), 680)
    setTimeout(() => fire({ particleCount: 40, spread: 70, origin: { x: 0.65, y: 0.45 } }), 900)
  }

  return (
    <div className={styles.root}>
      {/* Particles */}
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

      {/* Orbs */}
      <motion.div className={styles.orb1} aria-hidden="true"
        animate={{ scale: [1, 1.14, 1], x: [0, 35, 0], y: [0, -28, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className={styles.orb2} aria-hidden="true"
        animate={{ scale: [1, 1.18, 1], x: [0, -28, 0], y: [0, 22, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── PORTADA ── */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            className={styles.gate}
            key="gate"
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className={styles.gateInner}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                className={styles.gateMeta}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Baby Shower · Julio 2026
              </motion.p>

              <div className={styles.gateRule} aria-hidden="true" />

              <h1 className={styles.gateName}>Thiago</h1>

              <p className={styles.gateSub}>
                Está en camino y queremos<br />celebrarlo a tu lado.
              </p>

              <motion.button
                className={styles.gateBtn}
                onClick={handleEnter}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 340, damping: 24 }}
              >
                Abrir invitación
                <span className={styles.gateBtnIcon}>→</span>
              </motion.button>
            </motion.div>

            {/* Gate animals */}
            <div className={styles.gateAnimals} aria-hidden="true">
              {GATE_ANIMALS.map((emoji, i) => (
                <motion.div
                  key={i}
                  className={styles.gateAnimalBubble}
                  initial={{ opacity: 0, y: 16, scale: 0.75 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.12, duration: 0.6, type: 'spring', stiffness: 220 }}
                >
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 + i * 0.3 }}
                    style={{ display: 'block' }}
                  >
                    {emoji}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INVITACIÓN ── */}
      <AnimatePresence>
        {entered && (
          <motion.div
            className={styles.main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >

            {/* ─ HERO ─ */}
            <section className={styles.hero}>
              <motion.div
                className={styles.heroInner}
                initial={{ opacity: 0, y: 56 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className={styles.eyebrow}>Baby Shower</p>
                <h1 className={styles.heroName}>Thiago</h1>
                <div className={styles.heroRule} aria-hidden="true" />
                <p className={styles.heroSub}>
                  Estamos esperando a nuestro mayor tesoro y queremos<br />
                  que seas parte de este momento tan especial.
                </p>
              </motion.div>

              {/* Animals */}
              <div className={styles.animalsGrid}>
                {ANIMALS.map((a, i) => (
                  <motion.div
                    key={a.name}
                    className={styles.animalCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -7, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
                  >
                    <span className={styles.animalEmoji} style={{ animationDelay: `${i * 0.4}s` }}>
                      {a.emoji}
                    </span>
                    <span className={styles.animalName}>{a.name}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className={styles.scrollHint}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
              >
                <motion.span
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >↓</motion.span>
                <span>Ver los detalles</span>
              </motion.div>
            </section>

            {/* ─ CITA ─ */}
            <Reveal>
              <section className={styles.quoteSection}>
                <div className={styles.quoteCard}>
                  <span className={styles.quoteMark}>❝</span>
                  <p className={styles.quoteText}>
                    Llega alguien tan pequeño que cabrá en nuestras manos,
                    pero tan grande que llenará completamente nuestros corazones.
                  </p>
                  <p className={styles.quoteAuthor}>— Con amor, Mamá y Papá</p>
                </div>
              </section>
            </Reveal>

            {/* ─ CUENTA REGRESIVA ─ */}
            <Reveal delay={0.05}>
              <section className={styles.section}>
                <p className={styles.sectionLabel}>Cuenta regresiva</p>
                <h2 className={styles.sectionTitle}>Faltan solo…</h2>
                <div className={styles.countdownRow}>
                  {[
                    { v: time.days, l: 'Días' },
                    { v: time.hours, l: 'Horas' },
                    { v: time.minutes, l: 'Min' },
                    { v: time.seconds, l: 'Seg' },
                  ].map(({ v, l }, i) => (
                    <motion.div
                      key={l}
                      className={styles.tick}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 320, damping: 22 } }}
                    >
                      <div className={styles.tickAccent} />
                      <div className={styles.tickNumWrap}>
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={v}
                            className={styles.tickNum}
                            initial={{ y: -22, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 22, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {String(v).padStart(2, '0')}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className={styles.tickLabel}>{l}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* ─ DETALLES ─ */}
            <Reveal delay={0.05}>
              <section className={styles.section}>
                <p className={styles.sectionLabel}>Detalles del evento</p>
                <h2 className={styles.sectionTitle}>¿Cuándo y dónde?</h2>
                <div className={styles.infoList}>
                  {INFO.map(({ label, value, sub }, i) => (
                    <motion.div
                      key={label}
                      className={styles.infoRow}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className={styles.infoIndex}>{String(i + 1).padStart(2, '0')}</span>
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

            {/* ─ ACCIONES ─ */}
            <Reveal delay={0.05}>
              <section className={styles.actionsSection}>
                <motion.a
                  href="https://maps.app.goo.gl/KjbMn9h8Q4rpLre67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaPrimary}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 24 }}
                >
                  <div className={styles.ctaText}>
                    <span className={styles.ctaLabel}>Google Maps</span>
                    <span className={styles.ctaMain}>Ver ubicación</span>
                  </div>
                  <span className={styles.ctaArrow}>→</span>
                </motion.a>

                <motion.a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Baby+Shower+Thiago&dates=20260711T213000Z/20260712T013000Z&details=Baby+Shower+de+Thiago+—+Sábado+11+de+julio+a+las+4:30+pm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaSecondary}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 24 }}
                >
                  <div className={styles.ctaText}>
                    <span className={styles.ctaLabel}>Google Calendar</span>
                    <span className={styles.ctaMain}>Guardar la fecha</span>
                  </div>
                  <span className={styles.ctaArrow}>→</span>
                </motion.a>
              </section>
            </Reveal>

            {/* ─ FOOTER ─ */}
            <footer className={styles.footer}>
              <motion.div
                className={styles.footerDivider}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 }}
              >
                <p className={styles.footerWith}>Con todo el amor del mundo,</p>
                <p className={styles.footerSign}>Sus Papás</p>
                <div className={styles.footerLeaves}>
                  {['🌿', '🍃', '🌿'].map((leaf, i) => (
                    <motion.span
                      key={i}
                      animate={{ rotate: [0, i % 2 === 0 ? 12 : -12, 0], y: [0, -4, 0] }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                    >
                      {leaf}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
