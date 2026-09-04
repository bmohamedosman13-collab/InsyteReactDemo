import { docs, docsById, clientCode, displayName } from './docs.js'
import { redactionSpans } from './redactionSpans.js'
import { analyses, outcomeSeries, summary } from './analyses.js'
import { queryPresets } from './queries.js'
import { mergedIdentity, redactionHeader, redactionStats } from './redaction.js'
import { dap, episodeSummary, exportCards, sessionOptions, soap } from './exports.js'

/** Assembled corpus for [CLIENT_1]. One object per track, consumed by Workbench. */
export const client1 = {
  id: 'client1',
  code: clientCode,
  title: displayName,
  subtitle: `7 documents · 330 days · 2 client-authored · ${redactionStats.spans} spans redacted`,
  sidebarLabel: '[CLIENT_1]',
  sidebarMeta: '7 documents · 330 days',
  glance: {
    title: 'Record at a glance',
    stats: [
      { label: 'Documents', value: '7', note: 'from 3 organizations' },
      { label: 'Span of care', value: '330 days', note: '2025-01-14 intake to 2025-12-09 discharge' },
      { label: 'Written by the client', value: '2 of 7', note: 'thought diary and wellness plan' },
      { label: 'PHQ-9', value: '22 to 5', note: 'peak 26 on 2025-05-13' },
      { label: 'Measurements', value: '15', note: 'no gaps except the day of the ED presentation' },
      { label: 'Identifiers redacted', value: '96', note: 'across 20 distinct identities' },
    ],
    footer: 'Click any citation to open the source document here.',
  },
  docs,
  docsById,
  spansByDoc: redactionSpans,
  summary,
  outcomeSeries,
  redaction: { header: redactionHeader, stats: redactionStats, mergedIdentity },
  buttons: [
    { id: 'patterns', label: 'Patterns', blurb: 'Cross-document themes', fixture: analyses.patterns },
    { id: 'timeline', label: 'Timeline', blurb: '330 days, 4 phases', fixture: analyses.timeline },
    { id: 'sentiment', label: 'Sentiment & Trends', blurb: 'Scored by author', fixture: analyses.sentiment },
    { id: 'risk', label: 'Risk', blurb: 'As documented', tone: 'amber', fixture: analyses.risk },
  ],
  queryPresets,
  exportConfig: {
    cards: exportCards,
    scopes: sessionOptions,
    resolve: (cardId, scopeId) => {
      if (cardId === 'episode') return episodeSummary
      if (cardId === 'soap') return soap[scopeId] || soap['2025-11-25']
      if (cardId === 'dap') return dap[scopeId] || dap['2025-11-25']
      return null
    },
  },
}
