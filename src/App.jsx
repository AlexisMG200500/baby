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

const SPARKLES = [
  { top: '12%', left: '6%', delay: 0, size: 9 },
  { top: '22%', right: '8%', delay: 0.8, size: 6 },
  { top: '60%', left: '4%', delay: 1.5, size: 5 },
  { top: '50%', right: '5%', delay: 0.4, size: 8 },
  { top: '78%', left: '10%', delay: 1.2, size: 5 },
  { top: '30%', right: '4%', delay: 2, size: 7 },
]

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: ((i * 3.17 + 3) % 98) + 1,
  size: 4 + (i * 2.1) % 9,
  duration: 12 + (i * 1.9) % 14,
  delay: (i * 0.9) % 13,
  type: ['leaf', 'star', 'dot', 'ring'][i % 4],
}))

const INFO = [
  {
    icon: '📅',
    label: 'Fecha',
    value: 'Sábado, 11 de Julio de 2026',
    sub: 'Marca este día en tu calendario',
  },
  {
    icon: '🕒',
    label: 'Hora',
    value: '4:30 de la tarde',
    sub: 'Puntualidad apreciada — te esperamos con los brazos abiertos',
  },
  {
    icon: '📍',
    label: 'Lugar',
    value: 'Nuestro hogar',
    sub: 'La dirección exacta la encuentras en el mapa',
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

function Reveal({ children, delay = 0, y = 36 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
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
    setTimeout(() => fire({ particleCount: 60, spread: 100, origin: { x: 0.5, y: 0.5 } }), 420)
    setTimeout(() => fire({ particleCount: 45, spread: 80, origin: { x: 0.35, y: 0.4 } }), 650)
    setTimeout(() => fire({ particleCount: 45, spread: 80, origin: { x: 0.65, y: 0.4 } }), 880)
  }

  return (
    <div className={styles.root}>
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

      <motion.div className={styles.orb1} aria-hidden="true"
        animate={{ scale: [1, 1.16, 1], x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className={styles.orb2} aria-hidden="true"
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 26, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div className={styles.orb3} aria-hidden="true"
        animate={{ scale: [1, 1.3, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* ── PORTADA ── */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            className={styles.gate}
            key="gate"
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className={styles.gateInner}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                className={styles.gateBadge}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Invitación especial
              </motion.p>

              <h1 className={styles.gateName}>Thiago</h1>

              <p className={styles.gateSub}>
                Está en camino y queremos<br />celebrarlo a tu lado.
              </p>

              <motion.button
                className={styles.gateBtn}
                onClick={handleEnter}
                whileHover={{ scale: 1.06, y: -5 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              >
                <motion.span
                  animate={{ rotate: [0, 14, -14, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
                >
                  🌿
                </motion.span>
                Abrir invitación
              </motion.button>
            </motion.div>

            <div className={styles.gateAnimals} aria-hidden="true">
              {GATE_ANIMALS.map((emoji, i) => (
                <motion.div
                  key={i}
                  className={styles.gateAnimalBubble}
                  initial={{ opacity: 0, y: 18, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.14, duration: 0.7, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.18, rotate: i % 2 === 0 ? 8 : -8 }}
                >
                  <motion.span
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 2.4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: 1.6 + i * 0.2 }}
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
            transition={{ duration: 0.5, delay: 0.3 }}
          >

            {/* ─ HERO ─ */}
            <section className={styles.hero}>
              {SPARKLES.map((s, i) => (
                <span key={i} className={styles.sparkle} aria-hidden="true"
                  style={{ top: s.top, left: s.left, right: s.right, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
                />
              ))}

              <motion.div
                className={styles.heroInner}
                initial={{ opacity: 0, y: 64 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.p
                  className={styles.eyebrow}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.9 }}
                >
                  Baby Shower
                </motion.p>
                <h1 className={styles.heroName}>Thiago</h1>
                <motion.p
                  className={styles.heroSub}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  Estamos esperando a nuestro mayor tesoro y queremos<br />
                  que seas parte de este momento tan especial.
                </motion.p>
              </motion.div>

              <div className={styles.animalsGrid}>
                {ANIMALS.map((a, i) => (
                  <motion.div
                    key={a.name}
                    className={styles.animalCard}
                    initial={{ opacity: 0, scale: 0.4, rotate: -18 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 230, damping: 16 }}
                    whileHover={{ y: -9, scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className={styles.animalEmoji} style={{ animationDelay: `${i * 0.35}s` }}>
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
                transition={{ delay: 1.9, duration: 1 }}
              >
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >↓</motion.span>
                <span>Ver los detalles</span>
              </motion.div>
            </section>

            {/* ─ CITA ─ */}
            <Reveal delay={0.05}>
              <section className={styles.quoteSection}>
                <motion.div
                  className={styles.quoteCard}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <div className={styles.quoteDecoTop}>❝</div>
                  <p className={styles.quoteText}>
                    Llega alguien tan pequeño que cabrá en nuestras manos,
                    pero tan grande que llenará completamente nuestros corazones.
                  </p>
                  <div className={styles.quoteLine} />
                  <p className={styles.quoteAuthor}>Con amor, Mamá y Papá</p>
                </motion.div>
              </section>
            </Reveal>

            {/* ─ CUENTA REGRESIVA ─ */}
            <Reveal>
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
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.05, y: -4 }}
                    >
                      <div className={styles.tickNumWrap}>
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={v}
                            className={styles.tickNum}
                            initial={{ y: -26, opacity: 0, scale: 0.85 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 26, opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
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
                  {INFO.map(({ icon, label, value, sub }, i) => (
                    <motion.div
                      key={label}
                      className={styles.infoRow}
                      initial={{ opacity: 0, x: -36 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.11, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ x: 4, transition: { duration: 0.18 } }}
                    >
                      <motion.div
                        className={styles.infoIconWrap}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        {icon}
                      </motion.div>
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
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                >
                  <span className={styles.ctaIcon}>📍</span>
                  <div className={styles.ctaText}>
                    <span className={styles.ctaLabel}>Google Maps</span>
                    <span className={styles.ctaMain}>Ver ubicación</span>
                  </div>
                  <motion.span className={styles.ctaArrow}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >→</motion.span>
                </motion.a>

                <motion.a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Baby+Shower+Thiago&dates=20260711T213000Z/20260712T013000Z&details=Baby+Shower+de+Thiago+—+Sábado+11+de+julio+a+las+4:30+pm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaSecondary}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                >
                  <span className={styles.ctaIcon}>🗓️</span>
                  <div className={styles.ctaText}>
                    <span className={styles.ctaLabel}>Google Calendar</span>
                    <span className={styles.ctaMain}>Guardar la fecha</span>
                  </div>
                  <motion.span className={styles.ctaArrow}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >→</motion.span>
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
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                <p className={styles.footerWith}>Con todo el amor del mundo,</p>
                <p className={styles.footerSign}>Sus Papás</p>
                <div className={styles.footerLeaves}>
                  {['🌿', '🍃', '🌿'].map((leaf, i) => (
                    <motion.span
                      key={i}
                      animate={{ rotate: [0, i % 2 === 0 ? 16 : -16, 0], y: [0, -5, 0] }}
                      transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
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
