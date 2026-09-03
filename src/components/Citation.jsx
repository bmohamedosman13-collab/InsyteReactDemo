/* eslint-disable react-refresh/only-export-components --
   This module intentionally pairs the citation components with the parser that
   emits them. renderInline returns those components, so splitting it out would
   create a cycle for no benefit. */
import { createContext, useContext, useMemo, useState } from 'react'
import { AUTHOR_TYPE_LABEL } from '../data/clinical/client1/docs.js'

/**
 * Citation system. Spec 3.7.
 *
 * Analysis copy carries inline [[docId §anchor]] markers. RichText parses them,
 * resolves each against the active corpus, and renders a chip. A marker that
 * does not resolve renders as nothing at all, which is how spec rule 4 is kept:
 * the UI cannot show a citation that has no source behind it.
 */

const SourceContext = createContext({ docsById: {}, open: () => {} })

export function SourceProvider({ docsById, children }) {
  const [request, setRequest] = useState(null)
  const value = useMemo(
    () => ({ docsById, open: (docId, anchor) => setRequest({ docId, anchor, at: Date.now() }) }),
    [docsById]
  )
  return (
    <SourceContext.Provider value={value}>
      {typeof children === 'function' ? children({ request, clear: () => setRequest(null) }) : children}
    </SourceContext.Provider>
  )
}

export function useSource() {
  return useContext(SourceContext)
}

const citePattern = () => /\[\[(\d{2}|W\d)\s+(§[^\]]+)\]\]/g

export function CitationChip({ docId, anchor }) {
  const { docsById, open } = useSource()
  const [hover, setHover] = useState(false)
  const doc = docsById[docId]
  if (!doc) return null
  const section = doc.sections.find((s) => s.anchor === anchor)
  if (!section) return null

  const dateLabel = doc.dateEnd ? `${doc.dateStart} to ${doc.dateEnd}` : doc.dateStart

  return (
    <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
      <button
        onClick={() => open(docId, anchor)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-label={`Source: ${doc.title}, ${section.label}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 3,
          background: 'var(--redact-bg)',
          border: '1px solid var(--redact-line)',
          borderRadius: 4,
          padding: '0px 5px',
          margin: '0 1px',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          lineHeight: '17px',
          color: 'var(--plum)',
          verticalAlign: 'baseline',
          transition: 'background 0.12s ease',
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = '#E1D6F5' }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'var(--redact-bg)' }}
      >
        {docId} {anchor}
      </button>
      {hover && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 7px)',
            left: 0,
            zIndex: 60,
            width: 268,
            background: 'var(--surface)',
            border: '1px solid var(--line-strong)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-pop)',
            padding: '10px 12px',
            whiteSpace: 'normal',
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            lineHeight: 1.45,
            color: 'var(--ink-secondary)',
            textAlign: 'left',
            pointerEvents: 'none',
          }}
        >
          <span style={{ display: 'block', fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>
            {doc.title}
          </span>
          <span style={{ display: 'block' }}>{section.label}</span>
          <span style={{ display: 'block', marginTop: 5, color: 'var(--ink-tertiary)' }}>
            {doc.author} · {AUTHOR_TYPE_LABEL[doc.authorType] || doc.authorType} · {dateLabel}
          </span>
        </span>
      )}
    </span>
  )
}

/**
 * Renders a string containing [[docId §anchor]] markers, __CLINICIAN_ENTRY__
 * placeholders and blank-line paragraphs.
 */
export function RichText({ text, style }) {
  const paragraphs = (text || '').split(/\n\n+/)
  return (
    <>
      {paragraphs.map((para, pi) => (
        <p
          key={pi}
          style={{
            margin: pi === 0 ? '0 0 0' : '13px 0 0',
            fontSize: 14.5,
            lineHeight: 1.68,
            color: 'var(--ink-secondary)',
            whiteSpace: 'pre-wrap',
            ...style,
          }}
        >
          {renderInline(para)}
        </p>
      ))}
    </>
  )
}

export function renderInline(text) {
  const out = []
  let last = 0
  let key = 0
  const src = text || ''
  const re = citePattern()
  let m
  while ((m = re.exec(src)) !== null) {
    if (m.index > last) out.push(...renderPlain(src.slice(last, m.index), key++))
    out.push(<CitationChip key={`c${key++}`} docId={m[1]} anchor={m[2].trim()} />)
    last = m.index + m[0].length
  }
  if (last < src.length) out.push(...renderPlain(src.slice(last), key))
  return out
}

const entryPattern = () => /__(CLINICIAN|ORG)_ENTRY__/g

function renderPlain(chunk, keyBase) {
  const out = []
  let last = 0
  let i = 0
  const re = entryPattern()
  let m
  while ((m = re.exec(chunk)) !== null) {
    if (m.index > last) out.push(<span key={`t${keyBase}-${i++}`}>{chunk.slice(last, m.index)}</span>)
    out.push(<EntryFlag key={`e${keyBase}-${i++}`} kind={m[1]} />)
    last = m.index + m[0].length
  }
  if (last < chunk.length) out.push(<span key={`t${keyBase}-${i}`}>{chunk.slice(last)}</span>)
  return out
}

/** Amber inline flag for fields Insyte will not fill. Spec 4.9 rule 2. */
export function EntryFlag({ kind }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: 'var(--amber-bg)',
        border: '1px solid var(--amber-line)',
        borderRadius: 4,
        padding: '0 6px',
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--amber)',
        lineHeight: '18px',
      }}
    >
      Requires {kind === 'ORG' ? 'organisation' : 'clinician'} entry
    </span>
  )
}

/** Grey italic for fields the sources genuinely do not support. Spec 4.9 rule 1. */
export function NotDocumented({ searched }) {
  const [hover, setHover] = useState(false)
  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={{ color: 'var(--ink-faint)', fontStyle: 'italic', fontSize: 13.5 }}>
        Not documented in source
      </span>
      {searched && hover && (
        <span
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: 0,
            zIndex: 60,
            width: 240,
            background: 'var(--surface)',
            border: '1px solid var(--line-strong)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-pop)',
            padding: '9px 11px',
            fontSize: 12,
            lineHeight: 1.45,
            color: 'var(--ink-secondary)',
            fontStyle: 'normal',
          }}
        >
          Searched: {searched}
        </span>
      )}
    </span>
  )
}

export function ConfidenceBadge({ level }) {
  if (!level) return null
  const high = level === 'High'
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '2px 7px',
        borderRadius: 4,
        background: high ? 'var(--positive-bg)' : 'var(--cream)',
        color: high ? 'var(--positive)' : 'var(--ink-tertiary)',
        border: `1px solid ${high ? '#CFE3DC' : 'var(--line-strong)'}`,
      }}
    >
      {level}
    </span>
  )
}

export function AuthorBadge({ kind }) {
  if (!kind) return null
  const client = kind.startsWith('CLIENT')
  const outline = kind === 'CLIENT REPORTED'
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: '0.05em',
        padding: '2px 7px',
        borderRadius: 4,
        background: outline ? 'transparent' : client ? 'var(--badge-client-bg)' : 'var(--badge-clinician-bg)',
        color: client ? 'var(--badge-client)' : 'var(--badge-clinician)',
        border: `1px solid ${client ? '#D8C9EE' : '#D3DAE6'}`,
      }}
    >
      {kind}
    </span>
  )
}
