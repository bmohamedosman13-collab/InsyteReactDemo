import { useEffect, useRef, useState } from 'react'
import { AuthorBadge, ConfidenceBadge, RichText, SourceProvider, renderInline, useSource } from './Citation.jsx'
import SourcePanel, { SourceView } from './SourcePanel.jsx'
import Sparkline from './Sparkline.jsx'
import ExportModal from './ExportModal.jsx'
import { TIMING, relativeTime, sleep, stamp } from '../lib/simulate.js'
import { FALLBACK_COPY, routeQuery } from '../lib/queryRouting.js'
import { AUTHOR_TYPE_LABEL } from '../data/clinical/client1/docs.js'

/** True while the viewport is wide enough for the docked source rail. */
function useWideScreen() {
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1280px)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')
    const onChange = (e) => setWide(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return wide
}

/**
 * Shared workbench. Spec 3.3 to 3.7 and section 4.
 * Driven entirely by fixtures, so the clinical and org tracks are the same
 * component with different data.
 */
export default function Workbench({ corpus }) {
  const { docs, docsById, summary, outcomeSeries, buttons, queryPresets, exportConfig, title, subtitle } = corpus

  const [active, setActive] = useState(null)      // active module id
  const [loading, setLoading] = useState(null)
  const [ranAt, setRanAt] = useState({})
  const [history, setHistory] = useState(() => [
    { id: 'seed-1', label: 'Risk', kind: 'module', at: new Date(Date.now() - 2 * 864e5) },
    { id: 'seed-2', label: buttons[1].label, kind: 'module', at: new Date(Date.now() - 2 * 864e5) },
  ])
  const [queryOpen, setQueryOpen] = useState(false)
  const [queryResult, setQueryResult] = useState(null)
  const [notesOpen, setNotesOpen] = useState(false)
  const [notes, setNotes] = useState([])
  const [exportOpen, setExportOpen] = useState(false)
  const outputRef = useRef(null)
  const wide = useWideScreen()

  const runModule = async (id) => {
    const btn = buttons.find((b) => b.id === id)
    setQueryResult(null)
    setLoading(id)
    setActive(id)
    await sleep(TIMING.analysisButton)
    setLoading(null)
    setRanAt((prev) => ({ ...prev, [id]: new Date() }))
    setHistory((prev) => [{ id: `h${Date.now()}`, label: btn.label, kind: 'module', moduleId: id, at: new Date() }, ...prev])
    outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const runQuery = async (preset, typed) => {
    setLoading('query')
    setActive(null)
    await sleep(TIMING.analysisButton)
    setLoading(null)
    if (preset?.routesTo) {
      setQueryResult(null)
      setActive(preset.routesTo)
      setRanAt((prev) => ({ ...prev, [preset.routesTo]: new Date() }))
    } else {
      setQueryResult(preset ? { preset } : { fallback: true, typed })
    }
    setHistory((prev) => [
      { id: `h${Date.now()}`, label: preset ? preset.chipLabel : typed, kind: 'query', presetId: preset?.id, at: new Date() },
      ...prev,
    ])
    outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <SourceProvider docsById={docsById}>
      {({ request, clear }) => (
        <>
          <div className={`ins-workbench ${wide ? 'has-rail' : ''}`}>
            <Sidebar
              docs={docs}
              history={history}
              notes={notes}
              onReopen={(entry) => {
                if (entry.kind === 'module' && entry.moduleId) runModule(entry.moduleId)
                else if (entry.presetId) runQuery(queryPresets.find((p) => p.id === entry.presetId))
              }}
            />

            <main className="ins-main">
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, marginBottom: 22 }}>
                <div>
                  <h1 style={{ fontSize: 26, marginBottom: 3 }}>{title}</h1>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-tertiary)' }}>{subtitle}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button className="ins-btn" onClick={() => setNotesOpen(true)}>Add note</button>
                  <button className="ins-btn ins-btn-primary" onClick={() => setExportOpen(true)}>Export</button>
                </div>
              </header>

              <AutoSummary summary={summary} series={outcomeSeries} />

              <ButtonBar buttons={buttons} active={active} loading={loading} ranAt={ranAt} onRun={runModule} />

              <QueryBar
                open={queryOpen}
                setOpen={setQueryOpen}
                presets={queryPresets}
                onRun={runQuery}
                busy={loading === 'query'}
              />

              <div ref={outputRef}>
                {loading && loading !== 'query' && <Skeleton />}
                {loading === 'query' && <Skeleton />}
                {!loading && active && <ModuleOutput fixture={buttons.find((b) => b.id === active).fixture} ranAt={ranAt[active]} />}
                {!loading && queryResult && <QueryOutput result={queryResult} onPick={runQuery} presets={queryPresets} />}
                {!loading && !active && !queryResult && <RestingState />}
              </div>
            </main>

            {wide && (
              <aside className="ins-rail">
                {request ? (
                  <SourceView request={request} docsById={docsById} onClose={clear} docked />
                ) : (
                  <GlancePanel glance={corpus.glance} />
                )}
              </aside>
            )}
          </div>

          {notesOpen && (
            <NotesPanel
              onClose={() => setNotesOpen(false)}
              onSave={(note) => setNotes((prev) => [note, ...prev])}
              notes={notes}
            />
          )}
          {exportOpen && <ExportModal config={exportConfig} onClose={() => setExportOpen(false)} />}
          {!wide && <SourcePanel request={request} docsById={docsById} onClose={clear} />}
        </>
      )}
    </SourceProvider>
  )
}

/* --------------------------------------------------------------------- rail */

/**
 * What the right rail shows when no citation is open. The column exists to
 * hold the source document; leaving it blank until someone clicks a citation
 * wastes the space, so it carries the figures a reader would otherwise have to
 * hunt for in the summary.
 */
function GlancePanel({ glance }) {
  if (!glance) return null
  return (
    <div className="ins-glance">
      <div className="ins-glance-head">{glance.title}</div>
      <div className="ins-glance-stats">
        {glance.stats.map((s) => (
          <div key={s.label} className="ins-glance-row">
            <div className="ins-glance-label">{s.label}</div>
            <div className="ins-glance-value">{s.value}</div>
            {s.note && <div className="ins-glance-note">{s.note}</div>}
          </div>
        ))}
      </div>
      <div className="ins-glance-foot">
        {glance.footer}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ sidebar */

function Sidebar({ docs, history, notes, onReopen }) {
  const { open } = useSource()
  return (
    <aside style={{ borderRight: '1px solid var(--line)', background: 'var(--surface)', padding: '22px 16px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
      <SectionLabel>Documents</SectionLabel>
      {docs.map((d) => (
        <button
          key={d.id}
          onClick={() => open(d.id, d.sections[0].anchor)}
          style={{
            display: 'block', width: '100%', textAlign: 'left', background: 'none',
            border: 'none', padding: '7px 8px', borderRadius: 'var(--radius-sm)', marginBottom: 1,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-hover)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
        >
          <span style={{ display: 'flex', gap: 7, alignItems: 'baseline' }}>
            <span className="ins-mono" style={{ color: 'var(--ink-faint)' }}>{d.id}</span>
            <span style={{ fontSize: 12.8, color: 'var(--ink-secondary)', lineHeight: 1.35 }}>{d.title}</span>
          </span>
          <span style={{ display: 'block', fontSize: 11, color: 'var(--ink-faint)', marginLeft: 25, marginTop: 1 }}>
            {AUTHOR_TYPE_LABEL[d.authorType] || d.authorType}
          </span>
        </button>
      ))}

      {notes.length > 0 && (
        <>
          <SectionLabel style={{ marginTop: 20 }}>Practitioner notes</SectionLabel>
          {notes.map((n) => (
            <div key={n.id} style={{ padding: '7px 8px', fontSize: 12.5, color: 'var(--ink-secondary)' }}>
              Note · {stamp(n.at)}
            </div>
          ))}
        </>
      )}

      <SectionLabel style={{ marginTop: 22 }}>History</SectionLabel>
      {history.map((h) => (
        <button
          key={h.id}
          onClick={() => onReopen(h)}
          style={{
            display: 'block', width: '100%', textAlign: 'left', background: 'none',
            border: 'none', padding: '6px 8px', borderRadius: 'var(--radius-sm)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-hover)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
        >
          <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink-secondary)', lineHeight: 1.35 }}>
            {h.label}
          </span>
          <span style={{ display: 'block', fontSize: 11, color: 'var(--ink-faint)' }}>
            {h.kind === 'query' ? 'query' : 'run'} · {relativeTime(h.at)}
          </span>
        </button>
      ))}
    </aside>
  )
}

function SectionLabel({ children, style }) {
  return (
    <div style={{
      fontSize: 10.5, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase',
      color: 'var(--ink-faint)', marginBottom: 7, paddingLeft: 8, ...style,
    }}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------- auto-summary */

function AutoSummary({ summary, series }) {
  return (
    <section className="ins-card" style={{ padding: '20px 22px', marginBottom: 22 }}>
      <h2 style={{ fontSize: 19, marginBottom: 2 }}>{summary.header}</h2>
      <div style={{ fontSize: 12.5, color: 'var(--ink-tertiary)', marginBottom: 14 }}>{summary.subhead}</div>
      <RichText text={summary.body} />
      {series && <Sparkline series={series} />}
      {summary.mandatoryReview && (
        <div className="ins-review-banner" style={{ marginTop: 16 }}>
          {summary.mandatoryReview}
        </div>
      )}
    </section>
  )
}

/* -------------------------------------------------------------- button bar */

function ButtonBar({ buttons, active, loading, ranAt, onRun }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${buttons.length}, 1fr)`, gap: 9, marginBottom: 14 }}>
      {buttons.map((b) => {
        const isActive = active === b.id
        const amber = b.tone === 'amber'
        return (
          <button
            key={b.id}
            onClick={() => onRun(b.id)}
            disabled={!!loading}
            className="ins-card ins-analysis-btn"
            style={{
              padding: '13px 14px', textAlign: 'left', cursor: loading ? 'wait' : 'pointer',
              borderColor: isActive ? (amber ? 'var(--amber)' : 'var(--violet)') : 'var(--line)',
              background: isActive ? (amber ? 'var(--amber-bg)' : 'var(--cream)') : 'var(--surface)',
              transition: 'border-color 0.15s ease, background 0.15s ease',
            }}
          >
            <div style={{ fontSize: 14.5, fontWeight: 600, color: amber ? 'var(--amber)' : 'var(--plum)' }}>
              {b.label}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-tertiary)', marginTop: 2 }}>
              {ranAt[b.id] ? `re-run ${stamp(ranAt[b.id])}` : b.blurb}
            </div>
          </button>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------- query bar */

function QueryBar({ open, setOpen, presets, onRun, busy }) {
  const [typed, setTyped] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!typed.trim()) return
    const { preset } = routeQuery(typed, presets)
    onRun(preset, typed)
    setTyped('')
  }

  return (
    <section className="ins-card" style={{ marginBottom: 22, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '13px 18px', fontSize: 14.5, color: 'var(--ink-secondary)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        Ask about these documents
        <span style={{ color: 'var(--ink-faint)', fontSize: 12 }}>{open ? 'Hide' : 'Show 5 questions'}</span>
      </button>
      <div className={`ins-collapse ${open ? 'open' : ''}`}>
        <div style={{ padding: open ? '0 18px 16px' : '0 18px', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '13px 0' }}>
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => onRun(p)}
                disabled={busy}
                className="ins-btn"
                style={{ textAlign: 'left', fontSize: 13.5, fontWeight: 400, padding: '8px 13px' }}
              >
                {p.chipLabel}
              </button>
            ))}
          </div>
          <form onSubmit={submit} style={{ display: 'flex', gap: 8 }}>
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="Or type a question"
              style={{
                flex: 1, padding: '8px 12px', fontSize: 13.5,
                border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)',
                background: 'var(--bg)', color: 'var(--ink)',
              }}
            />
            <button type="submit" className="ins-btn" disabled={busy}>Ask</button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- output */

function ModuleOutput({ fixture, ranAt }) {
  if (fixture.module === 'timeline') return <TimelineOutput fixture={fixture} />
  if (fixture.module === 'sentiment') return <SentimentOutput fixture={fixture} />
  if (fixture.module === 'risk') return <RiskOutput fixture={fixture} />
  return (
    <OutputShell header={fixture.header} subhead={fixture.subhead} ranAt={ranAt}>
      {fixture.findings.map((f) => (
        <FindingBlock key={f.id} finding={f} />
      ))}
      {fixture.table && <DataTable table={fixture.table} />}
      {fixture.footer && <FooterNote>{fixture.footer}</FooterNote>}
    </OutputShell>
  )
}

function OutputShell({ header, subhead, ranAt, children, tone }) {
  return (
    <section
      className="ins-card ins-fade"
      style={{
        padding: '22px 24px',
        borderColor: tone === 'amber' ? 'var(--amber-line)' : 'var(--line)',
        background: tone === 'amber' ? 'var(--amber-bg)' : 'var(--surface)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, marginBottom: subhead ? 2 : 15 }}>
        <h2 style={{ fontSize: 20, color: tone === 'amber' ? 'var(--amber)' : 'var(--plum)' }}>{header}</h2>
        {ranAt && <span style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>run {stamp(ranAt)}</span>}
      </div>
      {subhead && <div style={{ fontSize: 12.5, color: 'var(--ink-tertiary)', marginBottom: 16 }}>{subhead}</div>}
      {children}
    </section>
  )
}

function FindingBlock({ finding }) {
  return (
    <div style={{ paddingBottom: 18, marginBottom: 18, borderBottom: '1px solid var(--line)' }}>
      {finding.heading && (
        <h3 style={{ fontSize: 15.5, fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--ink)', marginBottom: 7 }}>
          {finding.heading}
        </h3>
      )}
      <RichText text={finding.body} />
      {(finding.confidence || finding.authorBadge) && (
        <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>
          <AuthorBadge kind={finding.authorBadge} />
          {finding.confidence && (
            <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: 'var(--ink-tertiary)' }}>
              Confidence <ConfidenceBadge level={finding.confidence} />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

function TimelineOutput({ fixture }) {
  const toneColor = { neutral: 'var(--line-strong)', amber: 'var(--amber)', 'amber-deep': '#8A5220', positive: 'var(--positive)' }
  return (
    <OutputShell header={fixture.header} subhead={fixture.subhead}>
      {fixture.phases.map((phase) => (
        <div key={phase.id} style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', gap: 9, alignItems: 'baseline', marginBottom: 9 }}>
            <span style={{ width: 3, height: 15, background: toneColor[phase.tone], borderRadius: 2, display: 'inline-block' }} />
            <h3 style={{ fontSize: 15, fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--ink)' }}>{phase.label}</h3>
            <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{phase.range}</span>
          </div>
          <div style={{ borderLeft: `2px solid ${toneColor[phase.tone]}`, marginLeft: 6, paddingLeft: 16 }}>
            {phase.events.map((ev, i) => (
              <div key={i} style={{ marginBottom: 11 }}>
                <div style={{ display: 'flex', gap: 9, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span className="ins-mono" style={{ color: 'var(--ink-tertiary)', minWidth: 74 }}>{ev.date}</span>
                  <span style={{ fontSize: 13.8, fontWeight: 600, color: 'var(--ink)' }}>{ev.label}</span>
                </div>
                {(ev.body || ev.cite) && (
                  <div style={{ fontSize: 13.5, color: 'var(--ink-secondary)', marginLeft: 83, lineHeight: 1.6 }}>
                    {ev.body} {renderInline(ev.cite || '')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <FooterNote>
        {fixture.footer} {renderInline(fixture.footerCitation || '')}
      </FooterNote>
    </OutputShell>
  )
}

function SentimentOutput({ fixture }) {
  const [tab, setTab] = useState('all')
  const shown = fixture.findings.filter((f) => tab === 'all' || f.scope === tab)
  return (
    <OutputShell header={fixture.header} subhead={fixture.subhead}>
      <div style={{ display: 'flex', gap: 7, marginBottom: 9 }}>
        {fixture.tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="ins-btn"
            style={{
              fontSize: 12.5, padding: '6px 12px',
              background: tab === t.id ? 'var(--plum)' : 'var(--surface)',
              color: tab === t.id ? '#fff' : 'var(--ink-secondary)',
              borderColor: tab === t.id ? 'var(--plum)' : 'var(--line-strong)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--ink-tertiary)', fontStyle: 'italic', marginBottom: 17 }}>
        {fixture.caption}
      </div>
      {shown.map((f) => <FindingBlock key={f.id} finding={f} />)}
      {fixture.trendBlock && (
        <div style={{ background: 'var(--surface-sunk)', borderRadius: 'var(--radius-sm)', padding: '15px 17px' }}>
          <h3 style={{ fontSize: 14, fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--ink)', marginBottom: 7 }}>
            {fixture.trendBlock.heading}
          </h3>
          <RichText text={fixture.trendBlock.body} />
        </div>
      )}
    </OutputShell>
  )
}

function RiskOutput({ fixture }) {
  return (
    <OutputShell header={fixture.header} tone="amber">
      <div className="ins-review-banner" style={{ marginBottom: 18, background: 'var(--surface)' }}>
        <strong>{fixture.mandatoryReview.split('\n')[0]}</strong>
        {fixture.mandatoryReview.split('\n').slice(1).join(' ')}
      </div>
      {fixture.chronology && <DataTable table={fixture.chronology} />}
      {fixture.sections.map((s) => (
        <div key={s.id} style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 15, fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--ink)', marginBottom: 7 }}>
            {s.heading}
          </h3>
          <RichText text={s.body} />
        </div>
      ))}
      <FooterNote>{fixture.footer}</FooterNote>
    </OutputShell>
  )
}

function DataTable({ table }) {
  return (
    <div style={{ overflowX: 'auto', margin: '14px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {table.columns.map((c) => (
              <th key={c} style={{
                textAlign: 'left', padding: '7px 9px', borderBottom: '1px solid var(--line-strong)',
                fontSize: 11.5, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
                color: 'var(--ink-tertiary)', whiteSpace: 'nowrap',
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} style={{ opacity: table.greyRows?.includes(ri) ? 0.55 : 1 }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '7px 9px', borderBottom: '1px solid var(--line)',
                  color: 'var(--ink-secondary)', verticalAlign: 'top', lineHeight: 1.5,
                }}>
                  {renderInline(String(cell))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function QueryOutput({ result, onPick, presets }) {
  if (result.fallback) {
    return (
      <section className="ins-card ins-fade" style={{ padding: '22px 24px' }}>
        <RichText text={FALLBACK_COPY} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 15 }}>
          {presets.map((p) => (
            <button key={p.id} onClick={() => onPick(p)} className="ins-btn" style={{ textAlign: 'left', fontWeight: 400, fontSize: 13.5 }}>
              {p.chipLabel}
            </button>
          ))}
        </div>
      </section>
    )
  }
  const p = result.preset
  return (
    <OutputShell header={p.chipLabel}>
      <RichText text={p.answer} />
      {p.table && <DataTable table={p.table} />}
    </OutputShell>
  )
}

function FooterNote({ children }) {
  return (
    <div style={{ marginTop: 16, paddingTop: 13, borderTop: '1px solid var(--line)', fontSize: 12.5, color: 'var(--ink-tertiary)' }}>
      {children}
    </div>
  )
}

function RestingState() {
  return (
    <div style={{ padding: '30px 24px', textAlign: 'center', color: 'var(--ink-faint)', fontSize: 13.5 }}>
      The summary above ran on load. Pick an analysis to go deeper.
    </div>
  )
}

function Skeleton() {
  return (
    <section className="ins-card ins-fade" style={{ padding: '22px 24px' }}>
      {[92, 100, 100, 74].map((w, i) => (
        <div key={i} style={{
          height: 11, width: `${w}%`, borderRadius: 4, marginBottom: 10,
          background: 'linear-gradient(90deg, var(--cream) 25%, var(--surface-hover) 37%, var(--cream) 63%)',
          backgroundSize: '400% 100%', animation: 'ins-shimmer 1.3s ease infinite',
        }} />
      ))}
      <style>{'@keyframes ins-shimmer{0%{background-position:100% 50%}100%{background-position:0 50%}}'}</style>
    </section>
  )
}

/* --------------------------------------------------------------- notes panel */

function NotesPanel({ onClose, onSave, notes }) {
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(null)

  const save = async () => {
    if (!text.trim()) return
    setSaving(true)
    await sleep(TIMING.notePass)
    const redacted = text
      .replace(/\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g, '[PERSON_N]')
      .replace(/\b\d{3}-\d{3}-\d{4}\b/g, '[PHONE_N]')
    const note = { id: `n${Date.now()}`, at: new Date(), raw: text, redacted }
    onSave(note)
    setSaved(note)
    setSaving(false)
    setText('')
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(31,24,48,0.18)', zIndex: 70, animation: 'ins-veil-in 200ms ease both' }} />
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(460px, 92vw)',
        background: 'var(--surface)', borderLeft: '1px solid var(--line-strong)', zIndex: 71,
        display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 32px rgba(45,27,78,0.10)',
          animation: 'ins-slide-in 260ms cubic-bezier(0.22,0.61,0.36,1) both',
      }}>
        <header style={{ padding: '18px 22px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: 18 }}>Practitioner note</h3>
          <button onClick={onClose} className="ins-btn" style={{ padding: '4px 11px' }}>Close</button>
        </header>
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 22px' }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a note. It runs through the same redaction pass as an uploaded document."
            style={{
              width: '100%', minHeight: 150, padding: 12, fontSize: 13.5, lineHeight: 1.6,
              border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)',
              background: 'var(--bg)', color: 'var(--ink)', resize: 'vertical',
            }}
          />
          <button className="ins-btn ins-btn-primary" onClick={save} disabled={saving || !text.trim()} style={{ marginTop: 11 }}>
            {saving ? 'Redacting' : 'Save note'}
          </button>

          {saved && (
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500, marginBottom: 7 }}>
                Note saved and redacted. Stored with the document set.
              </div>
              <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: 12, fontSize: 13, color: 'var(--ink-secondary)', whiteSpace: 'pre-wrap' }}>
                {saved.redacted}
              </div>
            </div>
          )}

          {notes.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <SectionLabel style={{ paddingLeft: 0 }}>Saved notes</SectionLabel>
              {notes.map((n) => (
                <div key={n.id} style={{ padding: '9px 0', borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--ink-secondary)' }}>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-faint)', marginBottom: 3 }}>{stamp(n.at)}</div>
                  {n.redacted}
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
