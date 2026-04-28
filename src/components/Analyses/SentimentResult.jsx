import { motion } from 'framer-motion'
import analysisResults from '../../data/analysisResults.json'
import allDocs from '../../data/documents.json'

function findDoc(docId) {
  return [...allDocs.org, ...allDocs.case].find(d => d.id === docId)
}

function SentimentBar({ score }) {
  const isPos = score >= 0
  const pct = Math.min(Math.abs(score) * 50, 50)
  return (
    <div style={{
      position: 'relative',
      height: 6,
      background: 'rgba(255,255,255,0.06)',
      borderRadius: 3,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        left: '50%',
        top: -2,
        bottom: -2,
        width: 1,
        background: 'var(--text-tertiary)',
      }} />
      {isPos ? (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: `${pct}%`,
          background: '#6BCFA8',
          borderRadius: '0 3px 3px 0',
        }} />
      ) : (
        <div style={{
          position: 'absolute',
          right: '50%',
          top: 0,
          bottom: 0,
          width: `${pct}%`,
          background: '#E89BB0',
          borderRadius: '3px 0 0 3px',
        }} />
      )}
    </div>
  )
}

export default function SentimentResult({ mode, onPreview }) {
  const data = analysisResults[mode].sentiment

  return (
    <div>
      <p style={{
        fontSize: 14,
        color: 'var(--text-primary)',
        lineHeight: 1.75,
        marginBottom: 24,
      }}>
        {data.summary}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {data.perGroup.map(({ label, score }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '150px 1fr 56px',
              gap: 14,
              alignItems: 'center',
              fontSize: 12,
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</div>
            <SentimentBar score={score} />
            <div style={{
              textAlign: 'right',
              fontFamily: 'var(--font-serif)',
              fontSize: 16,
              color: score >= 0 ? '#6BCFA8' : '#E89BB0',
            }}>
              {score >= 0 ? '+' : ''}{score.toFixed(2)}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {data.citations.map(({ label, docId }) => (
          <button
            key={docId}
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
        ))}
      </div>
    </div>
  )
}
