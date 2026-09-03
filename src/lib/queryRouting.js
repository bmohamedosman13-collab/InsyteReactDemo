/**
 * Query bar routing. Spec 3.4.
 *
 * A typed query routes to a preset when token overlap exceeds 0.5. Anything
 * below that renders the fallback card. There is no model call and no
 * generated answer: if nothing matches, the demo says so.
 */

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'was', 'are', 'were', 'be', 'been', 'do', 'does',
  'did', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'and', 'or', 'but',
  'what', 'how', 'why', 'when', 'who', 'which', 'that', 'this', 'these',
  'those', 'me', 'my', 'our', 'we', 'us', 'it', 'its', 'i', 'you', 'your',
  'show', 'give', 'tell', 'get', 'can', 'could', 'would', 'should', 'about',
])

export const MATCH_THRESHOLD = 0.5

export function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
}

/**
 * Overlap of the typed query against a preset's match tokens, as a share of
 * the query's own meaningful tokens. Using the query as the denominator means
 * a short precise query can still match a preset with a long token list.
 *
 * @returns {number} 0 to 1
 */
export function overlapScore(query, matchTokens) {
  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) return 0
  const target = new Set(matchTokens.map((t) => t.toLowerCase()))
  const hits = queryTokens.filter((t) => target.has(t)).length
  return hits / queryTokens.length
}

/**
 * @param {string} query
 * @param {import('./types.js').QueryPreset[]} presets
 * @returns {{preset: import('./types.js').QueryPreset|null, score: number}}
 */
export function routeQuery(query, presets) {
  let best = null
  let bestScore = 0
  for (const preset of presets) {
    const score = overlapScore(query, preset.matchTokens)
    if (score > bestScore) {
      bestScore = score
      best = preset
    }
  }
  return bestScore > MATCH_THRESHOLD
    ? { preset: best, score: bestScore }
    : { preset: null, score: bestScore }
}

/** Spec 3.4, verbatim. Renders when nothing clears the threshold. */
export const FALLBACK_COPY = [
  'This demo answers five prepared questions from this document set.',
  'The full product answers open questions across your own files.',
  'Pick one below, or book a walkthrough to see it on your documents.',
].join('\n')
