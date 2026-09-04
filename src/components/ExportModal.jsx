import { useEffect, useState } from 'react'
import { RichText, renderInline } from './Citation.jsx'
import { TIMING, sleep } from '../lib/simulate.js'

/**
 * Export layer. Spec 4.9.
 *
 * Provenance toggle defaults on. With it off, citation chips are suppressed so
 * the output reads as a finished document; with it on, every populated field
 * carries its source. That toggle is the export layer's whole argument.
 */
export default function ExportModal({ config, onClose }) {
  const [cardId, setCardId] = useState(config.cards.find((c) => c.default)?.id || config.cards[0].id)
  const [scopeId, setScopeId] = useState(config.scopes?.find((s) => s.default)?.id || config.scopes?.[0]?.id)
  const [stage, setStage] = useState('choose')
  const [provenance, setProvenance] = useState(true)
  const [copied, setCopied] = useState(false)

  const card = config.cards.find((c) => c.id === cardId)
  const doc = config.resolve(cardId, scopeId)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const generate = async () => {
    setStage('generating')
    await sleep(TIMING.exportGeneration)
    setStage('done')
  }

  const plainText = () => {
    if (!doc) return ''
    const strip = (s) => s.replace(/\[\[[^\]]+\]\]/g, '').replace(/__(CLINICIAN|ORG)_ENTRY__/g, 'Requires review')
    return [
      doc.title,
      ...(doc.meta || []),
      '',
      ...(doc.blocks || []).flatMap((b) => [b.label, strip(b.body), '']),
      ...(doc.fields ? doc.fields.map((f) => `${f.label}  ${strip(f.value || '')}`) : []),
      '',
      doc.footer || '',
    ].join('\n')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(plainText())
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(31,24,48,0.28)', zIndex: 90, animation: 'ins-veil-in 200ms ease both' }} />
      <div
        role="dialog"
        aria-label="Export"
        style={{
          position: 'fixed', top: '3vh', left: '50%', transform: 'translateX(-50%)',
          width: 'min(820px, 94vw)', maxHeight: '94vh', background: 'var(--surface)',
          border: '1px solid var(--line-strong)', borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-pop)', zIndex: 91, display: 'flex', flexDirection: 'column',
          animation: 'ins-fade-up 260ms cubic-bezier(0.22,0.61,0.36,1) both',
        }}
      >
        <header style={{ padding: '17px 22px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 19 }}>Export</h2>
          <button onClick={onClose} className="ins-btn" style={{ padding: '4px 11px' }}>Close</button>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px' }}>
          {stage === 'choose' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(config.cards.length, 3)}, 1fr)`, gap: 10, marginBottom: 16 }}>
                {config.cards.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCardId(c.id)}
                    className="ins-card"
                    style={{
                      padding: '14px 15px', textAlign: 'left',
                      borderColor: cardId === c.id ? 'var(--violet)' : 'var(--line)',
                      background: cardId === c.id ? 'var(--cream)' : 'var(--surface)',
                    }}
                  >
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--plum)' }}>{c.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-tertiary)', marginTop: 3 }}>{c.blurb}</div>
                  </button>
                ))}
              </div>

              {card?.scope === 'session' && config.scopes && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-tertiary)', marginBottom: 6 }}>Session</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {config.scopes.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setScopeId(s.id)}
                        className="ins-btn"
                        style={{
                          textAlign: 'left', fontWeight: 400, fontSize: 13.5,
                          borderColor: scopeId === s.id ? 'var(--violet)' : 'var(--line-strong)',
                          background: scopeId === s.id ? 'var(--cream)' : 'var(--surface)',
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button className="ins-btn ins-btn-primary" onClick={generate}>Generate</button>
            </>
          )}

          {stage === 'generating' && (
            <div style={{ padding: '46px 0', textAlign: 'center', color: 'var(--ink-tertiary)', fontSize: 14 }}>
              Generating from source documents
            </div>
          )}

          {stage === 'done' && doc && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--ink-secondary)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={provenance} onChange={(e) => setProvenance(e.target.checked)} />
                  Show citations
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="ins-btn" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
                  <button className="ins-btn" onClick={() => setStage('choose')}>Back</button>
                </div>
              </div>

              <div className="ins-export-note">
                <strong>Identifiers are restored in the exported file.</strong>
                Export writes a file to this machine and puts the real names, dates and
                numbers back, because the file is going into your own record system where
                those values belong. Tokens exist to keep identities out of the analysis
                layer, not out of your records. Nothing is uploaded and nothing leaves
                this machine.
              </div>

              {doc.banner && (
                <div className="ins-review-banner" style={{ marginBottom: 16 }}>{doc.banner}</div>
              )}

              <article style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: '20px 22px' }}>
                <h3 style={{ fontSize: 16, fontFamily: 'var(--font-sans)', letterSpacing: '0.06em', marginBottom: 9 }}>
                  {doc.title}
                </h3>
                {(doc.meta || []).map((m, i) => (
                  <div key={i} className="ins-mono" style={{ color: 'var(--ink-tertiary)', lineHeight: 1.7 }}>{m}</div>
                ))}

                {(doc.blocks || []).map((b) => (
                  <div key={b.key} style={{ marginTop: 18 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 700, letterSpacing: '0.07em',
                      color: 'var(--plum)', marginBottom: 6,
                    }}>{b.label}</div>
                    <ProvenanceText text={b.body} provenance={provenance} />
                  </div>
                ))}

                {doc.fields && (
                  <div style={{ marginTop: 16 }}>
                    {doc.fields.map((f, i) =>
                      f.section ? (
                        <div key={i} style={{
                          fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', color: 'var(--plum)',
                          marginTop: 18, marginBottom: 7, paddingBottom: 4, borderBottom: '1px solid var(--line)',
                        }}>{f.section}</div>
                      ) : (
                        <div key={i} style={{ display: 'flex', gap: 14, padding: '5px 0', alignItems: 'baseline', flexWrap: 'wrap' }}>
                          <span style={{ minWidth: 210, fontSize: 12.5, color: 'var(--ink-tertiary)' }}>{f.label}</span>
                          <span style={{ flex: 1, minWidth: 200, fontSize: 13.2, color: 'var(--ink-secondary)' }}>
                            {f.state === 'not-documented'
                              ? <span style={{ color: 'var(--ink-faint)', fontStyle: 'italic' }}>Not documented in source</span>
                              : <ProvenanceText text={f.value} provenance={provenance} inline />}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}

                <div style={{ marginTop: 20, paddingTop: 13, borderTop: '1px solid var(--line)', fontSize: 12, color: 'var(--ink-tertiary)', lineHeight: 1.6 }}>
                  {doc.footer}
                </div>
              </article>
            </>
          )}
        </div>
      </div>
    </>
  )
}

function ProvenanceText({ text, provenance, inline }) {
  const cleaned = provenance ? text : (text || '').replace(/\s*\[\[[^\]]+\]\]/g, '')
  if (inline) return <>{renderInline(cleaned)}</>
  return <RichText text={cleaned} style={{ fontSize: 13.5 }} />
}
