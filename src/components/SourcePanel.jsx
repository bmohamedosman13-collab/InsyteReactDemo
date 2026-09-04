import { useEffect, useLayoutEffect, useRef } from 'react'
import { AUTHOR_TYPE_LABEL } from '../data/clinical/client1/docs.js'

/**
 * Source panel. Spec 3.7: clicking a citation opens the document scrolled to
 * the cited passage with that passage highlighted.
 *
 * Every document carries a visible Synthetic record marker. Spec section 8.
 */
export default function SourcePanel({ request, docsById, onClose }) {
  const markRef = useRef(null)
  const scrollRef = useRef(null)
  const doc = request ? docsById[request.docId] : null
  const section = doc?.sections.find((s) => s.anchor === request.anchor)

  useEffect(() => {
    if (!request) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [request, onClose])

  useLayoutEffect(() => {
    if (!markRef.current || !scrollRef.current) return
    const mark = markRef.current
    const box = scrollRef.current
    box.scrollTop = Math.max(0, mark.offsetTop - box.clientHeight / 3)
  }, [request])

  if (!request || !doc) return null

  const idx = section ? doc.text.indexOf(section.find) : -1
  const before = idx >= 0 ? doc.text.slice(0, idx) : doc.text
  const hit = idx >= 0 ? doc.text.slice(idx, idx + section.find.length) : ''
  const after = idx >= 0 ? doc.text.slice(idx + section.find.length) : ''
  const dateLabel = doc.dateEnd ? `${doc.dateStart} to ${doc.dateEnd}` : doc.dateStart

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(31,24,48,0.18)', zIndex: 80, animation: 'ins-veil-in 200ms ease both' }}
      />
      <aside
        role="dialog"
        aria-label={`Source document ${doc.id}`}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(620px, 92vw)',
          background: 'var(--surface)',
          borderLeft: '1px solid var(--line-strong)',
          boxShadow: '-8px 0 32px rgba(45,27,78,0.10)',
          animation: 'ins-slide-in 260ms cubic-bezier(0.22,0.61,0.36,1) both',
          zIndex: 81,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header style={{ padding: '18px 22px 14px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ minWidth: 0 }}>
              <div className="ins-mono" style={{ color: 'var(--ink-tertiary)', marginBottom: 3 }}>
                DOCUMENT {doc.id}
              </div>
              <h3 style={{ fontSize: 19, margin: 0 }}>{doc.title}</h3>
              <div style={{ fontSize: 12.5, color: 'var(--ink-tertiary)', marginTop: 5 }}>
                {doc.author} · {AUTHOR_TYPE_LABEL[doc.authorType] || doc.authorType} · {dateLabel} · {doc.pages} pp
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close source panel"
              className="ins-btn"
              style={{ padding: '4px 11px', alignSelf: 'flex-start', flexShrink: 0 }}
            >
              Close
            </button>
          </div>
          {section && (
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12.5,
                color: 'var(--ink-secondary)',
              }}
            >
              <span className="ins-mono" style={{ color: 'var(--plum)' }}>{section.anchor}</span>
              <span>{section.label}</span>
              {idx < 0 && (
                <span style={{ color: 'var(--amber)' }}>passage not located</span>
              )}
            </div>
          )}
        </header>

        <div
          ref={scrollRef}
          style={{ flex: 1, overflowY: 'auto', padding: '20px 22px', background: 'var(--bg)' }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 12.5,
              lineHeight: 1.72,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: 'var(--ink-secondary)',
            }}
          >
            {before}
            {hit && (
              <mark
                ref={markRef}
                style={{
                  background: '#FFF1C2',
                  color: 'var(--ink)',
                  padding: '1px 2px',
                  borderRadius: 3,
                  boxShadow: '0 0 0 3px #FFF1C2',
                }}
              >
                {hit}
              </mark>
            )}
            {after}
          </pre>
        </div>

        <footer
          style={{
            padding: '11px 22px',
            borderTop: '1px solid var(--line)',
            fontSize: 12,
            color: 'var(--ink-tertiary)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Synthetic record</span>
          <span>Identifiers replaced with stable tokens</span>
        </footer>
      </aside>
    </>
  )
}
