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
