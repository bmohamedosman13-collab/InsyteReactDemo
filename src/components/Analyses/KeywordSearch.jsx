import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import documents from '../../data/documents.json'
import analysisResults from '../../data/analysisResults.json'

function searchDocs(query, mode) {
  if (!query.trim()) return []
  const q = query.toLowerCase().trim()
  const docs = mode === 'org' ? documents.org : documents.case
  const priorityIds = analysisResults[mode].keyword[q] || []

  const results = []
  for (const doc of docs) {
    const hits = []
    for (const section of doc.sections) {
      const fullText = section.heading + ' ' + section.body
      const lower = fullText.toLowerCase()
      let idx = lower.indexOf(q)
      while (idx !== -1 && hits.length < 3) {
        const start = Math.max(0, idx - 60)
        const end = Math.min(fullText.length, idx + q.length + 60)
        const snippet = (start > 0 ? '...' : '') + fullText.slice(start, end) + (end < fullText.length ? '...' : '')
        hits.push({ snippet, matchStart: idx - start + (start > 0 ? 3 : 0), matchLen: q.length, section: section.heading })
        idx = lower.indexOf(q, idx + 1)
      }
    }
    if (hits.length > 0) {
      results.push({ doc, hits, priority: priorityIds.includes(doc.id) })
    }
  }

  results.sort((a, b) => {
    if (a.priority && !b.priority) return -1
    if (!a.priority && b.priority) return 1
    return 0
  })

  return results
}

function HighlightedSnippet({ snippet, query }) {
  if (!query) return <span>{snippet}</span>
  const lower = snippet.toLowerCase()
  const q = query.toLowerCase()
  const idx = lower.indexOf(q)
  if (idx === -1) return <span>{snippet}</span>
  return (
    <span>
      {snippet.slice(0, idx)}
      <mark style={{ background: 'rgba(180,164,232,0.25)', color: 'var(--accent)', borderRadius: 2, padding: '0 2px' }}>
        {snippet.slice(idx, idx + query.length)}
      </mark>
      {snippet.slice(idx + query.length)}
    </span>
  )
}

export default function KeywordSearch({ mode, initialQuery, onPreview }) {
  const [query, setQuery] = useState(initialQuery || '')
  const [submitted, setSubmitted] = useState(initialQuery || '')
  const [results, setResults] = useState(initialQuery ? searchDocs(initialQuery, mode) : [])

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      setSubmitted(initialQuery)
      setResults(searchDocs(initialQuery, mode))
    } else {
      setQuery('')
      setSubmitted('')
      setResults([])
    }
  }, [initialQuery, mode])

  function handleSearch(q) {
    const r = searchDocs(q, mode)
    setSubmitted(q)
    setResults(r)
  }

  return (
    <div>
      {/* Search input */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSearch(query) }}
          placeholder="Search across all documents..."
          style={{
            flex: 1,
            padding: '11px 16px',
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--border-active)',
            borderRadius: 8,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
          }}
        />
        <button
          onClick={() => handleSearch(query)}
          style={{
            padding: '11px 20px',
            background: 'var(--accent)',
            color: 'var(--plum-deep)',
            border: 'none',
            borderRadius: 8,
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 13,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Search
        </button>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {submitted && (
          <motion.div
            key={submitted}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {results.length === 0 ? (
              <div style={{ color: 'var(--text-secondary)', fontSize: 14, padding: '12px 0' }}>
                No matches found for "{submitted}". Try one of the suggested terms above.
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>
                  {results.reduce((n, r) => n + r.hits.length, 0)} matches across {results.length} documents
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {results.map(({ doc, hits }) => (
                    <div
                      key={doc.id}
                      style={{
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 8,
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{
                        padding: '10px 14px',
                        borderBottom: '1px solid var(--border-subtle)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
                          {doc.title}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                            {hits.length} {hits.length === 1 ? 'match' : 'matches'}
                          </span>
                          <button
                            onClick={() => onPreview(doc)}
                            style={{
                              padding: '3px 8px',
                              background: 'transparent',
                              border: '1px solid var(--border-active)',
                              borderRadius: 4,
                              color: 'var(--accent)',
                              fontSize: 11,
                              cursor: 'pointer',
                              fontFamily: 'var(--font-sans)',
                            }}
                          >
                            Open
                          </button>
                        </div>
                      </div>
                      {hits.slice(0, 2).map((hit, i) => (
                        <div key={i} style={{
                          padding: '10px 14px',
                          fontSize: 13,
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          borderBottom: i < Math.min(hits.length, 2) - 1 ? '1px solid var(--border-subtle)' : 'none',
                        }}>
                          <span style={{ color: 'var(--text-tertiary)', fontSize: 11, display: 'block', marginBottom: 4 }}>
                            {hit.section}
                          </span>
                          <HighlightedSnippet snippet={hit.snippet} query={submitted} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
