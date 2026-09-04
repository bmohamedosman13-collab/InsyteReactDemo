/**
 * Pure helpers behind select-to-redact.
 *
 * These live outside the component so they can be tested directly. The bug
 * they replace was invisible: a selection that touched a chip resolved to a
 * null offset and the redact button simply never appeared, with nothing in the
 * console to say why.
 */

/**
 * Map a DOM selection point back to an absolute offset in the document text.
 *
 * Every rendered piece carries its own start offset in `data-o`. Plain text
 * also carries `data-len`, so an offset inside it maps directly. A chip renders
 * the word REDACTED rather than the value it hides, so an offset inside a chip
 * cannot be mapped character for character: it snaps to whichever end of the
 * span the selection reached.
 *
 * @returns {number|null} null when the point is outside the document text
 */
export function absoluteOffset(node, offset) {
  let el = node?.nodeType === 3 ? node.parentElement : node
  while (el && el.dataset?.o === undefined) el = el.parentElement
  if (!el) return null
  const start = Number(el.dataset.o)
  if (el.dataset.chip !== undefined) {
    return offset > 0 ? start + Number(el.dataset.len) : start
  }
  return start + offset
}

/**
 * The longest stretch of [start, end) that no existing span already covers.
 * Selections routinely brush against a chip, and trimming to the free part is
 * far better than refusing the whole selection.
 *
 * @returns {{start: number, end: number}|null}
 */
export function largestFreeRange(start, end, spans) {
  const blocking = spans
    .filter((s) => s.end > start && s.start < end)
    .sort((a, b) => a.start - b.start)
  let best = null
  let cursor = start
  const consider = (from, to) => {
    if (to > from && (!best || to - from > best.end - best.start)) best = { start: from, end: to }
  }
  for (const span of blocking) {
    consider(cursor, Math.min(span.start, end))
    cursor = Math.max(cursor, span.end)
  }
  consider(cursor, end)
  return best
}

/** Trim whitespace off both ends so a chip covers words, not the gap around them. */
export function trimToWords(text, start, end) {
  let a = start
  let b = end
  while (a < b && /\s/.test(text[a])) a += 1
  while (b > a && /\s/.test(text[b - 1])) b -= 1
  return { start: a, end: b }
}
