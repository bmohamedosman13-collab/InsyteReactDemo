import { motion } from 'framer-motion'

const CHIPS = {
  org: {
    keyword: ['fraud', 'burnout', 'waitlist', 'suicidal ideation'],
    sentiment: ['All documents', 'Just the program reports', 'Just internal emails'],
    pattern: ['Programs by performance', 'Staff turnover and retention', 'Disciplinary actions across programs'],
    risk: ['Fraud or financial irregularity', 'Duty of care or client safety'],
  },
  case: {
    keyword: ['suicidal ideation', 'sleep', 'PHQ-9', 'safety plan'],
    sentiment: ['Full trajectory', 'Journal entries only', 'Clinical notes only'],
    pattern: ['Mood trajectory across journal', 'Sleep and mood pattern', 'Social withdrawal trajectory'],
    risk: ['Suicidal ideation or self-harm'],
  },
}

const CHIP_TO_SCENARIO = {
  'Programs by performance': 'performance',
  'Staff turnover and retention': 'turnover',
  'Disciplinary actions across programs': 'disciplinary',
  'Fraud or financial irregularity': 'fraud',
  'Duty of care or client safety': 'dutyOfCare',
  'Mood trajectory across journal': 'mood',
  'Sleep and mood pattern': 'sleep',
  'Social withdrawal trajectory': 'social',
  'Suicidal ideation or self-harm': 'ideation',
  'Full trajectory': 'all',
  'Journal entries only': 'all',
  'Clinical notes only': 'all',
  'All documents': 'all',
  'Just the program reports': 'all',
  'Just internal emails': 'all',
}

export default function SuggestedChips({ mode, activeAnalysis, activeChip, onChipClick }) {
  const chips = CHIPS[mode]?.[activeAnalysis] || []
  if (!chips.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
        padding: '12px 14px',
        background: 'rgba(180,164,232,0.04)',
        border: '1px solid rgba(180,164,232,0.12)',
        borderRadius: 10,
      }}
    >
      <span style={{
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--accent)',
        fontFamily: 'var(--font-sans)',
        marginRight: 2,
        flexShrink: 0,
      }}>
        Try
      </span>

      {chips.map(chip => {
        const isActive = activeChip === chip
        return (
          <button
            key={chip}
            onClick={() => onChipClick(chip, CHIP_TO_SCENARIO[chip] || chip)}
            style={{
              padding: '5px 12px',
              background: isActive ? 'rgba(180,164,232,0.15)' : 'var(--card-bg)',
              border: isActive ? '1px solid var(--accent)' : '1px solid var(--border-active)',
              borderRadius: 100,
              fontSize: 12,
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.borderColor = 'var(--accent)'
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.borderColor = 'var(--border-active)'
              }
            }}
          >
            {chip}
          </button>
        )
      })}
    </motion.div>
  )
}
