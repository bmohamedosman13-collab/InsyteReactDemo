import { useState } from 'react'
import { motion } from 'framer-motion'
import highlights from '../../data/documentHighlights.json'

function getHighlightsForDoc(mode, highlightContext, docId) {
  if (!highlightContext || !mode) return []
  const ctx = highlights[mode]?.[highlightContext]?.[docId]
  return ctx || []
}

function ConfidenceBadge({ label, confidence }) {
  return (
    <span style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      marginLeft: 5,
      padding: '1px 7px',
      background: 'rgba(180,164,232,0.12)',
      border: '1px solid rgba(180,164,232,0.3)',
      borderRadius: 4,
      fontSize: 10,
      fontWeight: 500,
      color: '#B4A4E8',
      fontFamily: "'DM Sans', sans-serif",
      whiteSpace: 'nowrap',
      letterSpacing: '0.01em',
    }}>
      {label} {confidence}%
    </span>
  )
}

function HighlightedSpan({ text, confidence, label, reason, animDelay }) {
  const [tooltip, setTooltip] = useState(false)
  const [timer, setTimer] = useState(null)

  function enter() {
    const t = setTimeout(() => setTooltip(true), 200)
    setTimer(t)
  }
  function leave() {
    clearTimeout(timer)
    setTooltip(false)
  }

  return (
    <motion.span
      initial={{ backgroundColor: 'rgba(180,164,232,0)' }}
      animate={{ backgroundColor: 'rgba(180,164,232,0.28)' }}
      whileHover={{ backgroundColor: 'rgba(180,164,232,0.38)' }}
      transition={{ duration: 0.35, delay: animDelay }}
      style={{
        position: 'relative',
        borderRadius: 3,
        padding: '1px 2px',
        cursor: 'default',
      }}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {text}
      <ConfidenceBadge label={label} confidence={confidence} />
      {tooltip && (
        <span style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          marginBottom: 6,
          background: '#1A1230',
          border: '1px solid rgba(180,164,232,0.25)',
          borderRadius: 6,
          padding: '8px 12px',
          fontSize: 12,
          color: 'rgba(255,255,255,0.85)',
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.5,
          width: 260,
          zIndex: 10,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          whiteSpace: 'normal',
          pointerEvents: 'none',
        }}>
          {reason}
        </span>
      )}
    </motion.span>
  )
}

function renderWithHighlights(text, docHighlights, usedIndices, baseDelay) {
  if (!docHighlights.length) return <span style={{ whiteSpace: 'pre-line' }}>{text}</span>

  const matches = []
  for (let i = 0; i < docHighlights.length; i++) {
    if (usedIndices.has(i)) continue
    const hl = docHighlights[i]
    const idx = text.indexOf(hl.text)
    if (idx !== -1) {
      matches.push({ start: idx, end: idx + hl.text.length, hl, hlIdx: i })
    }
  }

  matches.sort((a, b) => a.start - b.start)

  const deduped = []
  let lastEnd = 0
  for (const m of matches) {
    if (m.start >= lastEnd) {
      deduped.push(m)
      usedIndices.add(m.hlIdx)
      lastEnd = m.end
    }
  }

  if (!deduped.length) return <span style={{ whiteSpace: 'pre-line' }}>{text}</span>

  const parts = []
  let pos = 0
  let hlCount = 0
  for (const m of deduped) {
    if (m.start > pos) parts.push(<span key={`t-${pos}`} style={{ whiteSpace: 'pre-line' }}>{text.slice(pos, m.start)}</span>)
    parts.push(
      <HighlightedSpan
        key={`h-${m.start}`}
        text={text.slice(m.start, m.end)}
        confidence={m.hl.confidence}
        label={m.hl.label}
        reason={m.hl.reason}
        animDelay={baseDelay + hlCount * 0.05}
      />
    )
    hlCount++
    pos = m.end
  }
  if (pos < text.length) parts.push(<span key={`t-end`} style={{ whiteSpace: 'pre-line' }}>{text.slice(pos)}</span>)

  return <>{parts}</>
}

function renderWithKeyword(text, keyword) {
  const lower = text.toLowerCase()
  const q = keyword.toLowerCase()
  if (!lower.includes(q)) return <span style={{ whiteSpace: 'pre-line' }}>{text}</span>

  const parts = []
  let pos = 0
  let count = 0
  let idx = lower.indexOf(q)
  while (idx !== -1) {
    if (idx > pos) parts.push(<span key={`t-${pos}`} style={{ whiteSpace: 'pre-line' }}>{text.slice(pos, idx)}</span>)
    parts.push(
      <motion.mark
        key={`kw-${idx}`}
        initial={{ backgroundColor: 'rgba(180,164,232,0)' }}
        animate={{ backgroundColor: 'rgba(180,164,232,0.28)' }}
        whileHover={{ backgroundColor: 'rgba(180,164,232,0.38)' }}
        transition={{ duration: 0.3, delay: count * 0.04 }}
        style={{ color: 'var(--accent)', borderRadius: 3, padding: '1px 2px', background: 'none' }}
      >
        {text.slice(idx, idx + keyword.length)}
      </motion.mark>
    )
    pos = idx + keyword.length
    count++
    idx = lower.indexOf(q, pos)
  }
  if (pos < text.length) parts.push(<span key="t-end" style={{ whiteSpace: 'pre-line' }}>{text.slice(pos)}</span>)
  return <>{parts}</>
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function DocumentRenderer({ doc, mode, highlightContext }) {
  if (!doc) return null

  const isKeyword = highlightContext?.startsWith('keyword:')
  const keywordQuery = isKeyword ? highlightContext.slice(8) : null

  const docHighlights = isKeyword ? [] : getHighlightsForDoc(mode, highlightContext, doc.id)
  const usedIndices = new Set()
  let globalHlDelay = 0.1

  const keywordMatchCount = keywordQuery
    ? doc.sections.reduce((n, s) => {
        const lower = s.body.toLowerCase()
        const q = keywordQuery.toLowerCase()
        let idx = lower.indexOf(q), count = 0
        while (idx !== -1) { count++; idx = lower.indexOf(q, idx + 1) }
        return n + count
      }, 0)
    : 0

  const orgName = (parseInt(doc.id.split('-')[1]) <= 14)
    ? 'Northbridge Youth Mental Health Society'
    : 'Northbridge Clinical Services, Edmonton AB'

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #2D1B4E', paddingBottom: 16, marginBottom: 24 }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#888',
          marginBottom: 6,
        }}>
          {orgName}
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 500, color: '#2D1B4E', marginBottom: 8, lineHeight: 1.3 }}>
          {doc.title}
        </h1>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#666', display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
          <span><strong>Author:</strong> {doc.author}</span>
          <span>·</span>
          <span><strong>Date:</strong> {formatDate(doc.date)}</span>
          {doc.pages && <><span>·</span><span><strong>Pages:</strong> {doc.pages}</span></>}
        </div>
      </div>

      {/* Highlight banner */}
      {(docHighlights.length > 0 || (isKeyword && keywordMatchCount > 0)) && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            marginBottom: 20,
            padding: '8px 14px',
            background: 'rgba(180,164,232,0.06)',
            border: '1px solid rgba(180,164,232,0.2)',
            borderRadius: 6,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: '#B4A4E8',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14 }}>◈</span>
          {isKeyword
            ? `${keywordMatchCount} match${keywordMatchCount !== 1 ? 'es' : ''} for "${keywordQuery}" in this document.`
            : `${docHighlights.length} passage${docHighlights.length !== 1 ? 's' : ''} flagged by this analysis. Hover any highlight to see why it was surfaced.`}
        </motion.div>
      )}

      {/* Sections */}
      {doc.sections.map((section, i) => {
        const paragraphs = section.body.split('\n\n')
        return (
          <div key={i} style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: 18, fontWeight: 500, color: '#2D1B4E', marginBottom: 10 }}>
              {section.heading}
            </h2>
            {paragraphs.map((para, j) => {
              const rendered = isKeyword
                ? renderWithKeyword(para, keywordQuery)
                : renderWithHighlights(para, docHighlights, usedIndices, globalHlDelay)
              globalHlDelay += 0.05
              return (
                <p key={j} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  lineHeight: 1.75,
                  color: '#2A2A2A',
                  marginBottom: j < paragraphs.length - 1 ? 12 : 0,
                }}>
                  {rendered}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
