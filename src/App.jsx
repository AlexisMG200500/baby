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
  { top: '12%', left: '6%', delay: 0, size: 10 },
  { top: '22%', right: '8%', delay: 0.8, size: 7 },
  { top: '60%', left: '4%', delay: 1.5, size: 6 },
  { top: '50%', right: '5%', delay: 0.4, size: 9 },
  { top: '78%', left: '10%', delay: 1.2, size: 5 },
  { top: '30%', right: '4%', delay: 2, size: 8 },
]

const PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: ((i * 3.17 + 3) % 98) + 1,
  size: 5 + (i * 2.1) % 10,
  duration: 10 + (i * 1.9) % 14,
  delay: (i * 0.9) % 13,
  type: ['leaf', 'star', 'dot', 'ring'][i % 4],
}))

const THEME_CARDS = [
  {
    icon: '👗',
    title: 'Dress code',
    desc: 'Colores tierra, verde y crema. ¡Ven cómodo y lindo para la ocasión!',
  },
  {
    icon: '🎂',
    title: 'Habrá',
    desc: 'Pastel temático, bocadillos, bebidas y muchas sorpresas preparadas con amor.',
  },
  {
    icon: '📸',
    title: 'Foto recuerdo',
    desc: 'Tendremos photobooth. Prepara tu mejor pose para el álbum de Thiago.',
  },
]

const RSVP_BADGES = [
  '🎁 Regalos bienvenidos con amor',
  '🧒 Niños bienvenidos',
  '🍽️ Comida y bebidas incluidas',
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

function Reveal({ children, delay = 0, y = 40 }) {
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
    setTimeout(() => fire({ particleCount: 90, spread: 60, origin: { x: 0.2, y: 0.7 } }), 0)
    setTimeout(() => fire({ particleCount: 90, spread: 60, origin: { x: 0.8, y: 0.7 } }), 200)
    setTimeout(() => fire({ particleCount: 70, spread: 100, origin: { x: 0.5, y: 0.5 } }), 400)
    setTimeout(() => fire({ particleCount: 50, spread: 80, origin: { x: 0.35, y: 0.4 } }), 650)
    setTimeout(() => fire({ particleCount: 50, spread: 80, origin: { x: 0.65, y: 0.4 } }), 900)
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

      <motion.div
        className={styles.orb1}
        animate={{ scale: [1, 1.18, 1], x: [0, 45, 0], y: [0, -35, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className={styles.orb2}
        animate={{ scale: [1, 1.22, 1], x: [0, -35, 0], y: [0, 28, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden="true"
      />
      <motion.div
        className={styles.orb3}
        animate={{ scale: [1, 1.35, 1], x: [0, 22, 0], y: [0, -22, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        aria-hidden="true"
      />

      {/* ── GATEKEEPER ── */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            className={styles.gate}
            key="gate"
            exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
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
                whileHover={{ scale: 1.07, y: -6 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                >
                  🌿
                </motion.span>
                Abrir Invitación
              </motion.button>
            </motion.div>

            <div className={styles.gateAnimals} aria-hidden="true">
              {GATE_ANIMALS.map((emoji, i) => (
                <motion.div
                  key={i}
                  className={styles.gateAnimalBubble}
                  initial={{ opacity: 0, y: 20, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.15, duration: 0.7, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.2, rotate: i % 2 === 0 ? 10 : -10 }}
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

      {/* ── MAIN ── */}
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
                <span
                  key={i}
                  className={styles.sparkle}
                  style={{ top: s.top, left: s.left, right: s.right, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
                  aria-hidden="true"
                />
              ))}

              <motion.div
                className={styles.heroInner}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className={styles.eyebrow}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.9 }}
                >
                  Baby Shower · Sábado 11 de Julio
                </motion.div>
                <h1 className={styles.heroName}>Thiago</h1>
                <motion.p
                  className={styles.heroSub}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  Estamos esperando a nuestro mayor tesoro y queremos<br />
                  que formes parte de este momento tan especial.
                </motion.p>
              </motion.div>

              <div className={styles.animalsGrid}>
                {ANIMALS.map((a, i) => (
                  <motion.div
                    key={a.name}
                    className={styles.animalCard}
                    initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.35 + i * 0.08, type: 'spring', stiffness: 240, damping: 15 }}
                    whileHover={{ y: -10, scale: 1.12, rotate: i % 2 === 0 ? 6 : -6 }}
                    whileTap={{ scale: 0.95 }}
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
                transition={{ delay: 2, duration: 1 }}
              >
                <motion.span
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >↓</motion.span>
                <span>Desliza para ver los detalles</span>
              </motion.div>
            </section>

            {/* ─ QUOTE ─ */}
            <Reveal delay={0.05}>
              <section className={styles.quoteSection}>
                <motion.div
                  className={styles.quoteCard}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div className={styles.quoteDecoTop}>❝</div>
                  <p className={styles.quoteText}>
                    Llega alguien tan pequeño que cabrá en nuestras manos,
                    pero tan grande que llenará completamente nuestros corazones.
                  </p>
                  <div className={styles.quoteDecoBtm}>Con todo el amor,</div>
                  <div className={styles.quoteAuthor}>Mamá y Papá 💚</div>
                </motion.div>
              </section>
            </Reveal>

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
                    <motion.div
                      key={l}
                      className={styles.tick}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.05, y: -4 }}
                    >
                      <div className={styles.tickNumWrap}>
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={v}
                            className={styles.tickNum}
                            initial={{ y: -28, opacity: 0, scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 28, opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
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

            {/* ─ THEME ─ */}
            <Reveal delay={0.05}>
              <section className={styles.section}>
                <div className={styles.sectionLabel}>🌿 Tema de la fiesta</div>
                <h2 className={styles.sectionTitle}>Animalitos del Bosque</h2>
                <div className={styles.themeGrid}>
                  {THEME_CARDS.map(({ icon, title, desc }, i) => (
                    <motion.div
                      key={title}
                      className={styles.themeCard}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -6, scale: 1.02 }}
                    >
                      <motion.div
                        className={styles.themeCardIcon}
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                      >
                        {icon}
                      </motion.div>
                      <div className={styles.themeCardTitle}>{title}</div>
                      <div className={styles.themeCardDesc}>{desc}</div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* ─ EVENT INFO ─ */}
            <Reveal delay={0.05}>
              <section className={styles.section}>
                <div className={styles.sectionLabel}>📋 Detalles del evento</div>
                <h2 className={styles.sectionTitle}>¿Cuándo y dónde?</h2>
                <div className={styles.infoList}>
                  {[
                    {
                      icon: '📅',
                      label: 'Fecha',
                      value: 'Sábado, 11 de Julio · 2026',
                      sub: 'Anota este día tan especial en tu agenda',
                    },
                    {
                      icon: '🕒',
                      label: 'Hora',
                      value: '4:30 de la tarde',
                      sub: 'Las puertas abren desde las 4:00 pm — ¡no llegues tarde!',
                    },
                    {
                      icon: '📍',
                      label: 'Lugar',
                      value: 'Nuestro dulce hogar',
                      sub: 'La dirección exacta la encuentras en el botón de Google Maps',
                    },
                    {
                      icon: '⏱️',
                      label: 'Duración',
                      value: 'Aproximadamente 3 horas',
                      sub: 'Tiempo suficiente para celebrar, reír y crear recuerdos',
                    },
                  ].map(({ icon, label, value, sub }, i) => (
                    <motion.div
                      key={label}
                      className={styles.infoRow}
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <motion.div
                        className={styles.infoIconWrap}
                        whileHover={{ rotate: [0, -12, 12, 0], scale: 1.12 }}
                        transition={{ duration: 0.45 }}
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

            {/* ─ RSVP ─ */}
            <Reveal delay={0.05}>
              <section className={styles.section}>
                <div className={styles.sectionLabel}>💌 Confirmación</div>
                <h2 className={styles.sectionTitle}>¿Vendrás a celebrar?</h2>
                <motion.div
                  className={styles.rsvpCard}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p className={styles.rsvpText}>
                    Para preparar todo con el cariño que mereces, te pedimos confirmar
                    tu asistencia antes del <strong>4 de julio de 2026</strong>.
                    Escríbenos por WhatsApp o deja saber a los papás — cada persona cuenta mucho para nosotros. 💚
                  </p>
                  <div className={styles.rsvpBadges}>
                    {RSVP_BADGES.map((b, i) => (
                      <motion.span
                        key={b}
                        className={styles.rsvpBadge}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                      >
                        {b}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </section>
            </Reveal>

            {/* ─ ACTIONS ─ */}
            <Reveal delay={0.05}>
              <section className={`${styles.section} ${styles.actionsSection}`}>
                <div className={styles.sectionLabel}>🗺️ Encuentra el lugar</div>
                <h2 className={styles.sectionTitle}>Cómo llegar</h2>
                <motion.a
                  href="https://maps.app.goo.gl/KjbMn9h8Q4rpLre67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaPrimary}
                  whileHover={{ scale: 1.04, y: -6 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                >
                  <span className={styles.ctaIcon}>📍</span>
                  <div className={styles.ctaText}>
                    <span className={styles.ctaLabel}>Abrir en Google Maps</span>
                    <span className={styles.ctaMain}>Ver Ubicación Exacta</span>
                  </div>
                  <motion.span
                    className={styles.ctaArrow}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >→</motion.span>
                </motion.a>

                <motion.a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Baby+Shower+Thiago&dates=20260711T213000Z/20260712T013000Z&details=¡Te+esperamos+en+el+Baby+Shower+de+Thiago!+Sábado+11+de+julio+a+las+4:30+pm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaSecondary}
                  whileHover={{ scale: 1.04, y: -6 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                >
                  <span className={styles.ctaIcon}>🗓️</span>
                  <div className={styles.ctaText}>
                    <span className={styles.ctaLabel}>Agregar al calendario</span>
                    <span className={styles.ctaMain}>Guardar la Fecha</span>
                  </div>
                  <motion.span
                    className={styles.ctaArrow}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
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
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                <p className={styles.footerWith}>Con todo el amor del mundo,</p>
                <p className={styles.footerSign}>Sus Papás</p>
                <p className={styles.footerNote}>
                  No pueden esperar a conocerte, Thiago 🌿
                </p>
                <div className={styles.footerLeaves}>
                  {['🌿', '🍃', '🌿'].map((leaf, i) => (
                    <motion.span
                      key={i}
                      animate={{ rotate: [0, i % 2 === 0 ? 18 : -18, 0], y: [0, -6, 0] }}
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
