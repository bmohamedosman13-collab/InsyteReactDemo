import { motion } from 'framer-motion'

const ANALYSES = [
  { id: 'keyword', label: '01', name: 'Keyword search' },
  { id: 'sentiment', label: '02', name: 'Sentiment' },
  { id: 'pattern', label: '03', name: 'Pattern' },
  { id: 'risk', label: '04', name: 'Risk' },
]

export default function AnalysisBar({ active, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
      }}
    >
      {ANALYSES.map(({ id, label, name }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            style={{
              padding: '16px 18px',
              background: isActive ? 'var(--accent)' : 'var(--card-bg)',
              border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-subtle)'}`,
              borderRadius: 10,
              backdropFilter: isActive ? 'none' : 'blur(12px)',
              WebkitBackdropFilter: isActive ? 'none' : 'blur(12px)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.background = 'rgba(180,164,232,0.05)'
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.background = 'var(--card-bg)'
              }
            }}
          >
            <div style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: isActive ? 'rgba(15,10,31,0.6)' : 'var(--text-tertiary)',
              marginBottom: 4,
              fontFamily: 'var(--font-sans)',
            }}>
              {label}
            </div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 17,
              fontWeight: 500,
              color: isActive ? '#0F0A1F' : 'var(--text-primary)',
            }}>
              {name}
            </div>
          </button>
        )
      })}
    </motion.div>
  )
}
