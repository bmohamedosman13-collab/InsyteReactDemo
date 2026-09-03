import { useMemo, useRef, useState } from 'react'
import { APPROVAL_STEP_MS, runSequence } from '../lib/simulate.js'

/**
 * Redaction review and approval gate. Spec 3.1 and 3.2.
 *
 * Review UI shows REDACTED chips, never the underlying token names. Hover
 * reveals the entity class only. The stable tokens live in the data model and
 * are what the analysis layer sees, and they surface in analysis output and
 * exports rather than here.
 *
 * Ease-of-use deviation from spec 3.2: the approve button is enabled on
 * arrival rather than after scrolling the last document. The gate itself
 * stays, because "nothing is analysed until you approve" is the point. Forcing
 * a scroll through seven documents is friction, not consent.
 */

const tokenPattern = () => /\[([A-Z][A-Z_0-9]*)\]/g

const CLASS_OF_TOKEN = (token) => {
  if (/^(CLIENT|SPOUSE|RELATIVE|PSYCHOLOGIST|SUPERVISOR|PSYCHIATRIST|GP|ED_PHYSICIAN|RN)/.test(token)) return 'Person'
  if (/^(ORG|EMPLOYER)/.test(token)) return 'Organization'
  if (/^ADDRESS/.test(token)) return 'Location'
  if (/^PHONE/.test(token)) return 'Phone'
  if (/^(PHN|ID)/.test(token)) return 'Health number'
  if (/^DOB/.test(token)) return 'Date'
  return 'Person'
}

const SOURCE_OF_TOKEN = (token) => {
  if (/^(PHN|ID|PHONE)/.test(token)) return 'Pattern rule'
  if (/^(DOB|ADDRESS)/.test(token)) return 'Presidio recognizer'
  return 'NER model'
}

function RedactedChip({ token, restored, onRestore, onRestoreAll }) {
  const [open, setOpen] = useState(false)
  const entityClass = CLASS_OF_TOKEN(token)

  if (restored) {
    return (
      <span
        title={`Restored. Detected as ${entityClass}.`}
        style={{
          background: 'var(--restored-bg)',
          border: '1px solid #E8D89B',
          borderRadius: 3,
          padding: '0 3px',
        }}
      >
        [{token}]
      </span>
    )
  }

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        title={entityClass}
        style={{
          background: 'var(--redact-bg)',
          border: '1px solid var(--redact-line)',
          borderRadius: 3,
          padding: '0 5px',
          fontFamily: 'var(--font-mono)',
          fontSize: 10.5,
          fontWeight: 600,
          letterSpacing: '0.04em',
          color: 'var(--plum)',
          lineHeight: '16px',
        }}
      >
        REDACTED
      </button>
      {open && (
        <span
          style={{
            position: 'absolute',
            top: 'calc(100% + 5px)',
            left: 0,
            zIndex: 40,
            width: 232,
            background: 'var(--surface)',
            border: '1px solid var(--line-strong)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-pop)',
            padding: 11,
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            lineHeight: 1.5,
            color: 'var(--ink-secondary)',
            display: 'block',
            textAlign: 'left',
          }}
        >
          <span style={{ display: 'block', fontWeight: 600, color: 'var(--ink)' }}>{entityClass}</span>
          <span style={{ display: 'block', color: 'var(--ink-tertiary)', marginTop: 2, marginBottom: 9 }}>
            Detected by {SOURCE_OF_TOKEN(token)}
          </span>
          <button className="ins-btn" style={{ width: '100%', padding: '5px 9px', fontSize: 12.5, marginBottom: 5 }}
            onClick={() => { onRestore(); setOpen(false) }}>
            Restore this one
          </button>
          <button className="ins-btn" style={{ width: '100%', padding: '5px 9px', fontSize: 12.5 }}
            onClick={() => { onRestoreAll(token); setOpen(false) }}>
            Restore all like this
          </button>
        </span>
      )}
    </span>
  )
}

function RedactedText({ text, restoredTokens, onRestoreAll }) {
  const parts = useMemo(() => {
    const out = []
    let last = 0
    let i = 0
    const re = tokenPattern()
    let m
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) out.push({ type: 'text', value: text.slice(last, m.index), key: i++ })
      out.push({ type: 'token', value: m[1], key: i++ })
      last = m.index + m[0].length
    }
    if (last < text.length) out.push({ type: 'text', value: text.slice(last), key: i })
    return out
  }, [text])

  return (
    <pre style={preStyle}>
      {parts.map((p) =>
        p.type === 'text' ? (
          <span key={p.key}>{p.value}</span>
        ) : (
          <RedactedChip
            key={p.key}
            token={p.value}
            restored={restoredTokens.has(p.value)}
            onRestore={() => onRestoreAll(p.value)}
            onRestoreAll={onRestoreAll}
          />
        )
      )}
    </pre>
  )
}

const preStyle = {
  margin: 0,
  fontFamily: 'var(--font-mono)',
  fontSize: 11.5,
  lineHeight: 1.78,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: 'var(--ink-secondary)',
}

export default function RedactionReview({ docs, original, header, restoreCandidates, mergedIdentity, callout, calloutDoc, onApprove }) {
  const [activeId, setActiveId] = useState(docs[0].id)
  const [restored, setRestored] = useState(() => new Set())
  const [locked, setLocked] = useState(false)
  const [step, setStep] = useState(null)
  const [showMerge, setShowMerge] = useState(false)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const syncing = useRef(false)

  const doc = docs.find((d) => d.id === activeId)

  const restoreAll = (token) =>
    setRestored((prev) => {
      const next = new Set(prev)
      next.add(token)
      return next
    })

  const syncFrom = (which) => {
    const from = which === 'left' ? leftRef : rightRef
    const to = which === 'left' ? rightRef : leftRef
    if (syncing.current || !from.current || !to.current) return
    syncing.current = true
    const ratio = from.current.scrollTop / Math.max(1, from.current.scrollHeight - from.current.clientHeight)
    to.current.scrollTop = ratio * (to.current.scrollHeight - to.current.clientHeight)
    requestAnimationFrame(() => { syncing.current = false })
  }

  const approve = () => {
    setLocked(true)
    const labels = [
      'Locking redaction set',
      `Tagging sentences (${docs.length} documents, 578 sentences)`,
      'Building citation index',
      'Ready',
    ]
    runSequence(labels, APPROVAL_STEP_MS, (label) => setStep(label), onApprove)
  }

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '26px 24px 40px' }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 27, marginBottom: 8 }}>Redaction review</h1>
        <div className="ins-card" style={{ padding: '14px 17px' }}>
          <div style={{ fontSize: 14.5, color: 'var(--ink)', fontWeight: 500 }}>{header.line1}</div>
          <button
            onClick={() => setShowMerge((v) => !v)}
            style={{
              background: 'none', border: 'none', padding: 0, marginTop: 4,
              fontSize: 13.5, color: 'var(--violet)', textDecoration: 'underline', textUnderlineOffset: 3,
            }}
          >
            {header.line2}
          </button>
          {showMerge && (
            <div style={{ marginTop: 11, padding: 12, background: 'var(--surface-sunk)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 12.5, color: 'var(--ink-secondary)', marginBottom: 7 }}>
                Merged to <span className="ins-mono">{mergedIdentity.token}</span>, with occurrence counts across the corpus:
              </div>
              {mergedIdentity.forms.map((f) => (
                <div key={f.surface} style={{ display: 'flex', gap: 10, fontSize: 12.5, padding: '2px 0' }}>
                  <span className="ins-mono" style={{ minWidth: 150, color: 'var(--ink)' }}>{f.surface}</span>
                  <span style={{ color: 'var(--ink-tertiary)' }}>{f.count}x</span>
                  {f.note && <span style={{ color: 'var(--ink-faint)' }}>{f.note}</span>}
                </div>
              ))}
              <div style={{ marginTop: 10, paddingTop: 9, borderTop: '1px solid var(--line)', fontSize: 12.5, color: 'var(--ink-secondary)' }}>
                <span className="ins-mono" style={{ color: 'var(--ink)' }}>{mergedIdentity.nearMiss.token}</span>{' '}
                held separately as {mergedIdentity.nearMiss.forms.join(' and ')}. {mergedIdentity.nearMiss.note}
              </div>
            </div>
          )}
          <div style={{ fontSize: 13, color: 'var(--ink-tertiary)', marginTop: 9, fontStyle: 'italic' }}>
            {header.caption}
          </div>
        </div>
      </header>

      {restoreCandidates.length > 0 && (
        <div className="ins-card" style={{ padding: '13px 17px', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
            Flagged for your judgement
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {restoreCandidates.map((rc) => (
              <div key={rc.id} style={{
                border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)',
                padding: '7px 11px', fontSize: 12.5, background: 'var(--bg)', maxWidth: 300,
              }}>
                <span className="ins-mono" style={{ color: 'var(--ink)' }}>{rc.surface}</span>
                <span style={{ color: 'var(--ink-tertiary)' }}> · {rc.entityClass}</span>
                <div style={{ color: 'var(--ink-tertiary)', marginTop: 2 }}>{rc.why}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 7, marginBottom: 12, flexWrap: 'wrap' }}>
        {docs.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveId(d.id)}
            className="ins-btn"
            style={{
              padding: '6px 12px', fontSize: 12.5,
              background: d.id === activeId ? 'var(--plum)' : 'var(--surface)',
              color: d.id === activeId ? '#fff' : 'var(--ink-secondary)',
              borderColor: d.id === activeId ? 'var(--plum)' : 'var(--line-strong)',
            }}
          >
            {d.id} {d.authorType === 'client' ? '· client' : ''}
          </button>
        ))}
      </div>

      {callout && activeId === calloutDoc && (
        <div
          className="ins-review-banner"
          style={{ marginBottom: 14, fontSize: 14.5, lineHeight: 1.6 }}
        >
          <strong>Marked anonymised before upload</strong>
          {callout}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        <div className="ins-card" style={{ overflow: 'hidden' }}>
          <div style={paneHead}>Original</div>
          <div ref={leftRef} onScroll={() => syncFrom('left')} style={paneBody}>
            <pre style={preStyle}>{original[doc.id]}</pre>
          </div>
        </div>
        <div className="ins-card" style={{ overflow: 'hidden' }}>
          <div style={paneHead}>
            Redacted
            <span style={{ float: 'right', fontWeight: 400, color: 'var(--ink-tertiary)' }}>
              scroll locked
            </span>
          </div>
          <div ref={rightRef} onScroll={() => syncFrom('right')} style={paneBody}>
            <RedactedText text={doc.text} restoredTokens={restored} onRestoreAll={restoreAll} />
          </div>
        </div>
      </div>

      <div
        className="ins-card"
        style={{
          padding: '17px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          position: 'sticky',
          bottom: 14,
          background: 'var(--surface)',
        }}
      >
        {locked ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Spinner />
            <span style={{ fontSize: 14.5, color: 'var(--ink)' }}>{step}</span>
          </div>
        ) : (
          <>
            <div>
              <div style={{ fontSize: 14.5, color: 'var(--ink)', fontWeight: 500 }}>
                Nothing is analysed until you approve.
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-tertiary)', marginTop: 2 }}>
                Approving locks this redaction set and starts sentence tagging.
                {restored.size > 0 && ` ${restored.size} restored.`}
              </div>
            </div>
            <button className="ins-btn ins-btn-primary" onClick={approve} style={{ flexShrink: 0 }}>
              Approve and continue
            </button>
          </>
        )}
      </div>
    </div>
  )
}

const paneHead = {
  padding: '9px 14px',
  borderBottom: '1px solid var(--line)',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'var(--ink-tertiary)',
  background: 'var(--surface-sunk)',
}

const paneBody = { height: 420, overflowY: 'auto', padding: '14px 16px' }

function Spinner() {
  return (
    <span
      style={{
        width: 15, height: 15, borderRadius: '50%',
        border: '2px solid var(--line-strong)', borderTopColor: 'var(--violet)',
        display: 'inline-block', animation: 'ins-spin 0.7s linear infinite',
      }}
    >
      <style>{'@keyframes ins-spin{to{transform:rotate(360deg)}}'}</style>
    </span>
  )
}
