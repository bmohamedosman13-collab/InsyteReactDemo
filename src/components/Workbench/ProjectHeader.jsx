import { motion } from 'framer-motion'

export default function ProjectHeader({ mode, analysesRun }) {
  const isOrg = mode === 'org'

  const title = isOrg ? 'Q1 2026 Program Review' : 'M.J.'
  const subtitle = isOrg
    ? 'Northbridge Youth Mental Health Society · Last updated April 14'
    : '21yo · MDD moderate · Treating: Dr. R. Marcoux · Since Feb 17'

  const stats = isOrg
    ? [
        { value: '14', label: 'Documents' },
        { value: String(analysesRun), label: 'Analyses run' },
      ]
    : [
        { value: '9', label: 'Current PHQ-9' },
        { value: '−8', label: 'From intake' },
      ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 28,
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: 4,
          letterSpacing: '-0.01em',
        }}>
          {title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          {subtitle}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {stats.map(({ value, label }) => (
          <div key={label} style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 26,
              fontWeight: 500,
              color: 'var(--accent)',
              lineHeight: 1.1,
            }}>
              {value}
            </div>
            <div style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-tertiary)',
              marginTop: 2,
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
