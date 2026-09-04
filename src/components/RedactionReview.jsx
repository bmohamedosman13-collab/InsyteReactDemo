import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { APPROVAL_STEP_MS, runSequence } from '../lib/simulate.js'

/**
 * Redaction review and approval gate. Spec 3.1 and 3.2.
 *
 * Left pane is the document as it arrived, with real values. Right pane is the
 * same text with every detected identity replaced by a REDACTED chip. Chips
 * never show the token name: hovering gives the entity class, and the popover
 * gives the detection source.
 *
 * Every redaction is reversible in both directions and the state is held for
 * the whole corpus, so a decision survives scrolling away and switching
 * documents. Selecting text in either pane offers to redact it.
 *
 * The approval gate cannot be passed until every document has been opened.
 */

const CLASS_HINT = {
  Person: 'A name or a relational reference to a person.',
  Organization: 'An organisation, employer, school or funder.',
  Location: 'An address, neighbourhood or named place.',
  Contact: 'A telephone number or email address.',
  Identifier: 'A file, claim, health or registration number.',
  Date: 'A date that could narrow identity.',
}

/* ------------------------------------------------------------------ helpers */

/** Merge detected spans with anything the reviewer redacted by hand. */
function useSpans(doc, manualForDoc) {
  return useMemo(() => {
    const all = [...doc.spans, ...manualForDoc]
    all.sort((a, b) => a.start - b.start)
    return all
  }, [doc, manualForDoc])
}

/** Walk the text, emitting plain segments and span segments in order. */
function segment(text, spans) {
  const out = []
  let cursor = 0
  for (const span of spans) {
    if (span.start < cursor) continue
    if (span.start > cursor) out.push({ kind: 'text', start: cursor, value: text.slice(cursor, span.start) })
    out.push({ kind: 'span', start: span.start, span })
    cursor = span.end
  }
  if (cursor < text.length) out.push({ kind: 'text', start: cursor, value: text.slice(cursor) })
  return out
}

/** Map a DOM selection point back to an absolute offset in the document text. */
function absoluteOffset(node, offset) {
  let el = node.nodeType === 3 ? node.parentElement : node
  while (el && el.dataset?.o === undefined) el = el.parentElement
  if (!el) return null
  return Number(el.dataset.o) + offset
}

/* -------------------------------------------------------------------- chips */

function RedactedChip({ span, onRemove, onRemoveAll, count }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [open])

  return (
    <span style={{ position: 'relative' }}>
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v) }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setOpen((v) => !v) } }}
        title={span.cls}
        className="ins-chip-redacted"
      >
        REDACTED
      </span>
      {open && (
        <span className="ins-pop" onClick={(e) => e.stopPropagation()}>
          <span className="ins-pop-title">{span.cls}</span>
          <span className="ins-pop-sub">{CLASS_HINT[span.cls]}</span>
          <span className="ins-pop-sub" style={{ marginBottom: 9 }}>
            Detected by {span.src}
            {count > 1 && ` · ${count} occurrences in this document set`}
          </span>
          <button className="ins-btn ins-pop-btn" onClick={() => { onRemove(); setOpen(false) }}>
            Remove redaction here
          </button>
          {count > 1 && (
            <button className="ins-btn ins-pop-btn" onClick={() => { onRemoveAll(); setOpen(false) }}>
              Remove everywhere ({count})
            </button>
          )}
        </span>
      )}
    </span>
  )
}

function RestoredSpan({ span, onRedact, onRedactAll, count }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [open])

  return (
    <span style={{ position: 'relative' }}>
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v) }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setOpen((v) => !v) } }}
        title={`Visible. Detected as ${span.cls}.`}
        className="ins-chip-restored"
      >
        {span.surface}
      </span>
      {open && (
        <span className="ins-pop" onClick={(e) => e.stopPropagation()}>
          <span className="ins-pop-title">Visible in the export</span>
          <span className="ins-pop-sub" style={{ marginBottom: 9 }}>
            Detected as {span.cls} by {span.src}, and released by you.
          </span>
          <button className="ins-btn ins-pop-btn" onClick={() => { onRedact(); setOpen(false) }}>
            Redact this again
          </button>
          {count > 1 && (
            <button className="ins-btn ins-pop-btn" onClick={() => { onRedactAll(); setOpen(false) }}>
              Redact everywhere ({count})
            </button>
          )}
        </span>
      )}
    </span>
  )
}

/* --------------------------------------------------------------- main screen */

export default function RedactionReview({
  docs, spansByDoc, header, mergedIdentity, callout, calloutDoc, onApprove,
}) {
  const [activeId, setActiveId] = useState(docs[0].id)
  const [released, setReleased] = useState(() => new Set())
  const [manual, setManual] = useState({})
  const [visited, setVisited] = useState(() => new Set([docs[0].id]))
  const [locked, setLocked] = useState(false)
  const [step, setStep] = useState(null)
  const [showMerge, setShowMerge] = useState(false)
  const [selection, setSelection] = useState(null)

  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const syncing = useRef(false)

  const source = spansByDoc[activeId]
  const manualForDoc = manual[activeId] || []
  const spans = useSpans(source, manualForDoc)
  const segments = useMemo(() => segment(source.original, spans), [source, spans])

  /** Occurrences of each token across the whole corpus, for "everywhere". */
  const tokenCounts = useMemo(() => {
    const counts = {}
    for (const d of Object.values(spansByDoc)) {
      for (const s of d.spans) counts[s.token] = (counts[s.token] || 0) + 1
    }
    return counts
  }, [spansByDoc])

  const overRedacted = useMemo(() => {
    const groups = new Map()
    for (const [docId, d] of Object.entries(spansByDoc)) {
      for (const s of d.spans) {
        if (!s.over) continue
        if (!groups.has(s.token)) {
          groups.set(s.token, { token: s.token, surface: s.surface, cls: s.cls, why: s.why, ids: [], docs: new Set() })
        }
        const g = groups.get(s.token)
        g.ids.push(s.id)
        g.docs.add(docId)
      }
    }
    return [...groups.values()]
  }, [spansByDoc])

  const nextUnreviewed = docs.find((d) => !visited.has(d.id))

  const openDoc = (id) => {
    setActiveId(id)
    setVisited((prev) => new Set(prev).add(id))
    setSelection(null)
  }

  const setReleasedFor = useCallback((ids, release) => {
    setReleased((prev) => {
      const next = new Set(prev)
      for (const id of ids) (release ? next.add(id) : next.delete(id))
      return next
    })
  }, [])

  const idsForToken = useCallback((token) => {
    const ids = []
    for (const d of Object.values(spansByDoc)) {
      for (const s of d.spans) if (s.token === token) ids.push(s.id)
    }
    return ids
  }, [spansByDoc])

  /* -- text selection to redact ------------------------------------------- */
  const captureSelection = () => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) { setSelection(null); return }
    const a = absoluteOffset(sel.anchorNode, sel.anchorOffset)
    const b = absoluteOffset(sel.focusNode, sel.focusOffset)
    if (a === null || b === null) { setSelection(null); return }
    const start = Math.min(a, b)
    const end = Math.max(a, b)
    const surface = source.original.slice(start, end).trim()
    if (!surface || end - start < 2) { setSelection(null); return }
    const trimStart = start + source.original.slice(start, end).indexOf(surface)
    if (spans.some((s) => !(end <= s.start || trimStart >= s.end))) { setSelection(null); return }
    // Position against the selection rectangle rather than the pointer, so the
    // button lands on the text however the selection was made and wherever the
    // pane happens to be scrolled.
    const rect = sel.getRangeAt(0).getBoundingClientRect()
    setSelection({
      start: trimStart,
      end: trimStart + surface.length,
      surface,
      x: rect.left + rect.width / 2,
      y: rect.top,
      bottom: rect.bottom,
    })
  }

  const redactSelection = () => {
    const entry = {
      id: `m${activeId}-${selection.start}`,
      start: selection.start,
      end: selection.end,
      surface: selection.surface,
      token: `MANUAL_${selection.start}`,
      cls: 'Person',
      src: 'Reviewer',
      manual: true,
    }
    setManual((prev) => ({ ...prev, [activeId]: [...(prev[activeId] || []), entry] }))
    window.getSelection()?.removeAllRanges()
    setSelection(null)
  }

  /* -- scroll lock --------------------------------------------------------- */
  const syncFrom = (which) => {
    const from = which === 'left' ? leftRef : rightRef
    const to = which === 'left' ? rightRef : leftRef
    if (syncing.current || !from.current || !to.current) return
    syncing.current = true
    const ratio = from.current.scrollTop / Math.max(1, from.current.scrollHeight - from.current.clientHeight)
    to.current.scrollTop = ratio * (to.current.scrollHeight - to.current.clientHeight)
    requestAnimationFrame(() => { syncing.current = false })
  }

  /* -- approval ------------------------------------------------------------ */
  const allVisited = visited.size === docs.length
  const remaining = docs.length - visited.size
  const totalSpans = Object.values(spansByDoc).reduce((n, d) => n + d.spans.length, 0)
  const releasedCount = released.size
  const manualCount = Object.values(manual).reduce((n, a) => n + a.length, 0)

  const approve = () => {
    setLocked(true)
    runSequence(
      [
        'Locking redaction set',
        `Tagging sentences (${docs.length} documents)`,
        'Building citation index',
        'Ready',
      ],
      APPROVAL_STEP_MS,
      (label) => setStep(label),
      onApprove
    )
  }

  return (
    <div className="ins-fade" style={{ maxWidth: 1280, margin: '0 auto', padding: '26px 24px 120px' }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 27, marginBottom: 8 }}>Redaction review</h1>
        <div className="ins-card" style={{ padding: '14px 17px' }}>
          <div style={{ fontSize: 14.5, color: 'var(--ink)', fontWeight: 500 }}>{header.line1}</div>
          <button className="ins-link" onClick={() => setShowMerge((v) => !v)} style={{ marginTop: 4 }}>
            {header.line2}
          </button>
          <div className={`ins-collapse ${showMerge ? 'open' : ''}`}>
            <div style={{ marginTop: 11, padding: 12, background: 'var(--surface-sunk)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 12.5, color: 'var(--ink-secondary)', marginBottom: 7 }}>
                Merged to one identity, with occurrence counts across the corpus:
              </div>
              {mergedIdentity.forms.map((f) => (
                <div key={f.surface} style={{ display: 'flex', gap: 10, fontSize: 12.5, padding: '2px 0' }}>
                  <span className="ins-mono" style={{ minWidth: 210, color: 'var(--ink)' }}>{f.surface}</span>
                  <span style={{ color: 'var(--ink-tertiary)' }}>{f.count}x</span>
                  {f.note && <span style={{ color: 'var(--ink-faint)' }}>{f.note}</span>}
                </div>
              ))}
              <div style={{ marginTop: 10, paddingTop: 9, borderTop: '1px solid var(--line)', fontSize: 12.5, color: 'var(--ink-secondary)' }}>
                Held separately: {mergedIdentity.nearMiss.forms.join(' and ')}. {mergedIdentity.nearMiss.note}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-tertiary)', marginTop: 9, fontStyle: 'italic' }}>
            {header.caption}
          </div>
        </div>
      </header>

      {overRedacted.length > 0 && (
        <div className="ins-card" style={{ padding: '14px 17px', marginBottom: 14 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>
            Flagged for your judgement
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-tertiary)', marginBottom: 11 }}>
            These were detected correctly but are public information. Insyte redacts them by default and leaves the call to you.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(268px, 1fr))', gap: 9 }}>
            {overRedacted.map((g) => {
              const allReleased = g.ids.every((id) => released.has(id))
              return (
                <div key={g.token} className="ins-flag-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                    <span className="ins-mono" style={{ color: 'var(--ink)', fontSize: 12.5 }}>{g.surface}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{g.cls}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-tertiary)', margin: '4px 0 9px', lineHeight: 1.45 }}>{g.why}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className="ins-btn"
                      style={{ flex: 1, padding: '5px 8px', fontSize: 12, ...(allReleased ? {} : activeChoice) }}
                      onClick={() => setReleasedFor(g.ids, false)}
                    >
                      Keep redacted
                    </button>
                    <button
                      className="ins-btn"
                      style={{ flex: 1, padding: '5px 8px', fontSize: 12, ...(allReleased ? activeChoice : {}) }}
                      onClick={() => setReleasedFor(g.ids, true)}
                    >
                      Remove redaction
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="ins-card ins-doctabs">
        <div className="ins-doctabs-head">
          <span>
            Documents
            <span style={{ color: 'var(--ink-faint)', fontWeight: 400 }}>
              {'  '}{visited.size} of {docs.length} reviewed
            </span>
          </span>
          {nextUnreviewed && (
            <button className="ins-btn" style={{ padding: '4px 11px', fontSize: 12.5 }} onClick={() => openDoc(nextUnreviewed.id)}>
              Next unreviewed
            </button>
          )}
        </div>
        <div className="ins-doctabs-strip">
          {docs.map((d) => {
            const seen = visited.has(d.id)
            const active = d.id === activeId
            return (
              <button
                key={d.id}
                onClick={() => openDoc(d.id)}
                className="ins-doctab"
                style={{
                  background: active ? 'var(--plum)' : 'var(--surface)',
                  color: active ? '#fff' : seen ? 'var(--ink-tertiary)' : 'var(--ink)',
                  borderColor: active ? 'var(--plum)' : 'var(--line-strong)',
                }}
                title={d.title}
              >
                <span className="ins-doctab-dot" style={{ background: seen ? 'var(--positive)' : 'var(--amber)' }} />
                <span className="ins-mono" style={{ opacity: 0.6, fontSize: 10.5 }}>{d.id}</span>
                {shortTitle(d)}
              </button>
            )
          })}
        </div>
      </div>

      {callout && activeId === calloutDoc && (
        <div className="ins-review-banner ins-fade" style={{ marginBottom: 12, fontSize: 14.5, lineHeight: 1.6 }}>
          <strong>Marked anonymised before upload</strong>
          {callout}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
        <div className="ins-card" style={{ overflow: 'hidden' }}>
          <div className="ins-pane-head">Original, as uploaded</div>
          <div ref={leftRef} onScroll={() => syncFrom('left')} className="ins-pane-body">
            <pre className="ins-doc-text">{source.original}</pre>
          </div>
        </div>

        <div className="ins-card" style={{ overflow: 'hidden' }}>
          <div className="ins-pane-head">
            After redaction
            <span style={{ float: 'right', fontWeight: 400, color: 'var(--ink-tertiary)', textTransform: 'none', letterSpacing: 0 }}>
              select any text to redact it
            </span>
          </div>
          <div
            ref={rightRef}
            onScroll={() => syncFrom('right')}
            onMouseUp={captureSelection}
            className="ins-pane-body"
          >
            <pre className="ins-doc-text">
              {segments.map((seg) =>
                seg.kind === 'text' ? (
                  <span key={seg.start} data-o={seg.start}>{seg.value}</span>
                ) : released.has(seg.span.id) ? (
                  <RestoredSpan
                    key={seg.span.id}
                    span={seg.span}
                    count={tokenCounts[seg.span.token] || 1}
                    onRedact={() => setReleasedFor([seg.span.id], false)}
                    onRedactAll={() => setReleasedFor(idsForToken(seg.span.token), false)}
                  />
                ) : (
                  <RedactedChip
                    key={seg.span.id}
                    span={seg.span}
                    count={tokenCounts[seg.span.token] || 1}
                    onRemove={() => setReleasedFor([seg.span.id], true)}
                    onRemoveAll={() => setReleasedFor(idsForToken(seg.span.token), true)}
                  />
                )
              )}
            </pre>
          </div>
        </div>
      </div>

      {selection && (
        <div
          className="ins-selection-tip"
          style={{
            left: Math.max(12, Math.min(selection.x - 80, window.innerWidth - 190)),
            top: selection.y > 60 ? selection.y - 42 : selection.bottom + 10,
          }}
        >
          <button className="ins-btn ins-btn-primary ins-selection-btn" onClick={redactSelection}>
            Redact “{selection.surface.length > 22 ? `${selection.surface.slice(0, 21)}…` : selection.surface}”
          </button>
        </div>
      )}

      <div className="ins-card ins-approve-bar">
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
                {allVisited
                  ? `All ${docs.length} documents reviewed. ${totalSpans} spans redacted, ${releasedCount} released, ${manualCount} added by you.`
                  : `${visited.size} of ${docs.length} documents reviewed. Open the remaining ${remaining} to continue.`}
              </div>
            </div>
            <button
              className="ins-btn ins-btn-primary"
              onClick={approve}
              disabled={!allVisited}
              style={{ flexShrink: 0 }}
              title={allVisited ? '' : 'Every document must be reviewed first'}
            >
              Approve and continue
            </button>
          </>
        )}
      </div>
    </div>
  )
}

const activeChoice = {
  background: 'var(--cream)',
  borderColor: 'var(--violet)',
  color: 'var(--plum)',
  fontWeight: 600,
}

function shortTitle(doc) {
  const t = doc.title.replace(/,.*$/, '')
  return t.length > 30 ? `${t.slice(0, 29)}…` : t
}

function Spinner() {
  return <span className="ins-spinner" />
}
