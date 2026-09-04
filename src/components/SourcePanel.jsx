import { useEffect, useLayoutEffect, useRef } from 'react'
import { AUTHOR_TYPE_LABEL } from '../data/clinical/client1/docs.js'

/**
 * Source document viewer. Spec 3.7: clicking a citation opens the document
 * scrolled to the cited passage, with that passage highlighted.
 *
 * Renders in two places. On a wide screen it lives docked in the right rail,
 * so following a citation does not cover the analysis you were reading. On a
 * narrow screen there is no rail and it opens as an overlay instead.
 *
 * Every document carries a visible Synthetic record marker. Spec section 8.
 */

export function SourceView({ request, docsById, onClose, docked }) {
  const markRef = useRef(null)
  const scrollRef = useRef(null)
  const doc = docsById[request.docId]
  const section = doc?.sections.find((s) => s.anchor === request.anchor)

  useLayoutEffect(() => {
    if (!markRef.current || !scrollRef.current) return
    const box = scrollRef.current
    box.scrollTop = Math.max(0, markRef.current.offsetTop - box.clientHeight / 3)
  }, [request])

  if (!doc) return null

  const idx = section ? doc.text.indexOf(section.find) : -1
  const before = idx >= 0 ? doc.text.slice(0, idx) : doc.text
  const hit = idx >= 0 ? doc.text.slice(idx, idx + section.find.length) : ''
  const after = idx >= 0 ? doc.text.slice(idx + section.find.length) : ''
  const dateLabel = doc.dateEnd ? `${doc.dateStart} to ${doc.dateEnd}` : doc.dateStart

  return (
    <>
      <header style={{ padding: docked ? '14px 16px 12px' : '18px 22px 14px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div className="ins-mono" style={{ color: 'var(--ink-tertiary)', marginBottom: 3 }}>
              DOCUMENT {doc.id}
            </div>
            <h3 style={{ fontSize: docked ? 15.5 : 19, margin: 0, lineHeight: 1.3 }}>{doc.title}</h3>
            <div style={{ fontSize: 11.5, color: 'var(--ink-tertiary)', marginTop: 5 }}>
              {doc.author} · {AUTHOR_TYPE_LABEL[doc.authorType] || doc.authorType} · {dateLabel}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close source"
            className="ins-btn"
            style={{ padding: '3px 9px', fontSize: 12, alignSelf: 'flex-start', flexShrink: 0 }}
          >
            Close
          </button>
        </div>
        {section && (
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-secondary)', flexWrap: 'wrap' }}>
            <span className="ins-mono" style={{ color: 'var(--plum)' }}>{section.anchor}</span>
            <span>{section.label}</span>
            {idx < 0 && <span style={{ color: 'var(--amber)' }}>passage not located</span>}
          </div>
        )}
      </header>

      <div ref={scrollRef} className="ins-source-scroll">
        <pre className="ins-doc-text">
          {before}
          {hit && <mark ref={markRef} className="ins-source-hit">{hit}</mark>}
          {after}
        </pre>
      </div>

      <footer className="ins-source-foot">
        <span>Synthetic record</span>
        <span>Identifiers tokenised</span>
      </footer>
    </>
  )
}

/** Overlay wrapper, used when the rail is not on screen. */
export default function SourcePanel({ request, docsById, onClose }) {
  useEffect(() => {
    if (!request) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [request, onClose])

  if (!request) return null

  return (
    <>
      <div onClick={onClose} className="ins-veil" style={{ zIndex: 80 }} />
      <aside role="dialog" aria-label={`Source document ${request.docId}`} className="ins-source-overlay">
        <SourceView request={request} docsById={docsById} onClose={onClose} />
      </aside>
    </>
  )
}
