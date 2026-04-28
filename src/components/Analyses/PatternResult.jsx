import { motion } from 'framer-motion'
import allDocs from '../../data/documents.json'

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

export default function PatternResult({ result, onPreview }) {
  if (!result) return null

  const { title, docsLinked, body, citations } = result

  const paragraphs = body.split('\n\n')

  return (
    <motion.div
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
            Pattern Analysis
          </div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}>
            "{title}"
          </h3>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-tertiary)', flexShrink: 0, marginLeft: 16 }}>
          <div>{docsLinked} documents linked</div>
          <div style={{ marginTop: 2 }}>Completed in {(1.2 + Math.random() * 0.8).toFixed(1)}s</div>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        {paragraphs.map((para, i) => (
          <p key={i} style={{
            fontSize: 14,
            color: 'var(--text-primary)',
            lineHeight: 1.75,
            marginBottom: i < paragraphs.length - 1 ? 16 : 0,
          }}>
            {para}
          </p>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {citations.map(({ label, docId }) => (
          <CitationChip key={docId} label={label} docId={docId} onPreview={onPreview} />
        ))}
      </div>
    </motion.div>
  )
}
