import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import allDocs from '../../data/documents.json'
import analysisResults from '../../data/analysisResults.json'

function findDoc(docId) {
  return [...allDocs.org, ...allDocs.case].find(d => d.id === docId)
}

function CitationChip({ label, docId, onPreview }) {
  return (
    <button
      onClick={() => { const doc = findDoc(docId); if (doc) onPreview(doc) }}
      style={{
        padding: '4px 10px',
        background: 'rgba(180,164,232,0.08)',
        border: '1px solid rgba(180,164,232,0.2)',
        borderRadius: 4,
        fontSize: 11,
        color: 'var(--accent)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(180,164,232,0.15)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(180,164,232,0.08)'}
    >
      {label}
    </button>
  )
}

const PREBUILT = {
  org: {
    'fraud': 'fraud',
    'financial': 'fraud',
    'irregularity': 'fraud',
    'petty cash': 'fraud',
    'duty of care': 'dutyOfCare',
    'client safety': 'dutyOfCare',
    'safety': 'dutyOfCare',
    'suicidal': 'dutyOfCare',
    'waitlist': 'dutyOfCare',
  },
  case: {
    'suicidal': 'ideation',
    'ideation': 'ideation',
    'self-harm': 'ideation',
    'self harm': 'ideation',
    'risk': 'ideation',
    'safety': 'ideation',
  },
}

function matchQuery(query, mode) {
  const q = query.toLowerCase()
  const map = PREBUILT[mode] || {}
  for (const [key, val] of Object.entries(map)) {
    if (q.includes(key)) return val
  }
  return null
}

export default function RiskResult({ mode, initialScenario, onPreview }) {
  const [query, setQuery] = useState('')
  const [scenario, setScenario] = useState(initialScenario || null)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (initialScenario) {
      setScenario(initialScenario)
      setShowFallback(false)
    }
  }, [initialScenario])

  const riskData = analysisResults[mode].risk

  function handleRun(q) {
    const match = matchQuery(q || query, mode)
    if (match && riskData[match]) {
      setScenario(match)
      setShowFallback(false)
    } else {
      setScenario(null)
      setShowFallback(true)
    }
  }

  function handleChipClick(s) {
    setScenario(s)
    setShowFallback(false)
    setQuery('')
  }

  const result = scenario ? riskData[scenario] : null

  return (
    <div>
      {/* Search bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleRun(query) }}
          placeholder="Describe a risk to investigate..."
          style={{
            flex: 1,
            padding: '11px 16px',
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--border-active)',
            borderRadius: 8,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
          }}
        />
        <button
          onClick={() => handleRun(query)}
          style={{
            padding: '11px 20px',
            background: 'var(--accent)',
            color: '#0F0A1F',
            border: 'none',
            borderRadius: 8,
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Run analysis
        </button>
      </div>

      {/* Fallback */}
      {showFallback && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            padding: '14px 16px',
            background: 'rgba(180,164,232,0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            fontSize: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          This pattern requires the full Insyte product. Try one of the suggested patterns above to see a live demo result.
        </motion.div>
      )}

      {/* Result */}
      {result && (
        <motion.div
          key={scenario}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 120, damping: 14 }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 16,
            paddingBottom: 16,
            borderBottom: '1px solid var(--border-subtle)',
          }}>
            <div>
              <div style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent)',
                marginBottom: 4,
                fontFamily: 'var(--font-sans)',
              }}>
                Risk Analysis
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}>
                {result.title}
              </h3>
            </div>
            <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-tertiary)', flexShrink: 0, marginLeft: 16 }}>
              <div>{result.docsLinked} documents flagged</div>
              <div style={{ marginTop: 2 }}>Completed in {(1.5 + Math.random() * 0.8).toFixed(1)}s</div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            {result.body.split('\n\n').map((para, i, arr) => (
              <p key={i} style={{
                fontSize: 14,
                color: 'var(--text-primary)',
                lineHeight: 1.75,
                marginBottom: i < arr.length - 1 ? 16 : 0,
              }}>
                {para}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {result.citations.map(({ label, docId }) => (
              <CitationChip key={docId} label={label} docId={docId} onPreview={onPreview} />
            ))}
          </div>
        </motion.div>
      )}

      {!result && !showFallback && (
        <div style={{ color: 'var(--text-tertiary)', fontSize: 14, padding: '8px 0' }}>
          Enter a risk query above or select a suggested scenario to begin.
        </div>
      )}
    </div>
  )
}
