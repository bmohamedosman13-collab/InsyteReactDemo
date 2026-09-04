/**
 * Tests for select-to-redact.
 *
 * The failure this guards against is silent: a selection that touches a chip
 * used to resolve to a null offset, so the redact button never appeared and
 * nothing was logged. These assert the offset mapping and the free-range
 * trimming directly.
 */
import { JSDOM } from 'jsdom'
import process from 'node:process'
import { absoluteOffset, anchorPosition, largestFreeRange, trimToWords } from '../src/lib/redactionSelection.js'

const dom = new JSDOM('<!doctype html><body></body>')
globalThis.window = dom.window
globalThis.document = dom.window.document

let failed = 0
function check(name, actual, expected) {
  const a = JSON.stringify(actual)
  const e = JSON.stringify(expected)
  if (a === e) {
    console.log(`  ok    ${name}`)
  } else {
    console.error(`  FAIL  ${name}\n        expected ${e}\n        got      ${a}`)
    failed += 1
  }
}

/* Build the shape the pane renders: text, chip, text. */
const pre = document.createElement('pre')
pre.innerHTML =
  '<span data-o="0" data-len="10">Called by </span>' +
  '<span data-o="10" data-len="14" data-chip="">REDACTED</span>' +
  '<span data-o="24" data-len="20"> on Tuesday morning.</span>'
document.body.appendChild(pre)

const [before, chip, after] = pre.children

check('offset inside plain text', absoluteOffset(before.firstChild, 7), 7)
check('offset at start of a chip', absoluteOffset(chip.firstChild, 0), 10)
check('offset inside a chip snaps to its end', absoluteOffset(chip.firstChild, 4), 24)
check('offset in text after a chip', absoluteOffset(after.firstChild, 4), 28)
check('offset outside the document', absoluteOffset(document.body, 0), null)

/* Free-range trimming around existing spans. */
const spans = [{ start: 10, end: 24 }, { start: 40, end: 50 }]

check('selection clear of every span', largestFreeRange(0, 10, spans), { start: 0, end: 10 })
check('selection that overlaps a chip keeps its longer side',
  largestFreeRange(5, 35, spans), { start: 24, end: 35 })
check('selection wholly inside a span yields nothing',
  largestFreeRange(12, 20, spans), null)
// Gaps here are 0-10 (10 wide), 24-40 (16 wide) and 50-60 (10 wide).
check('selection spanning two spans takes the widest gap',
  largestFreeRange(0, 60, spans), { start: 24, end: 40 })

/* Whitespace trimming. */
const text = '   hello world   '
check('trims whitespace to the words', trimToWords(text, 0, text.length), { start: 3, end: 14 })
check('leaves tight ranges alone', trimToWords('abc', 0, 3), { start: 0, end: 3 })

/* Where the redact control lands. */
const line = (left, top, width = 120, height = 16) =>
  ({ left, top, width, height, bottom: top + height, right: left + width })

check('anchors to the first line, not the bounding box',
  anchorPosition([line(300, 400), line(100, 420), line(100, 440)], 1600),
  { left: 300, top: 364 })
check('drops below when there is no room above',
  anchorPosition([line(300, 20)], 1600), { left: 300, top: 44 })
check('clamps to the left edge',
  anchorPosition([line(-40, 400)], 1600), { left: 8, top: 364 })
check('clamps to the right edge on a narrow screen',
  anchorPosition([line(760, 400)], 800), { left: 692, top: 364 })
check('no rects means no control', anchorPosition([], 1600), null)
check('a zero-size rect means no control',
  anchorPosition([{ left: 0, top: 0, width: 0, height: 0, bottom: 0 }], 1600), null)

console.log(failed === 0 ? '\nselection tests passed\n' : `\nselection tests FAILED: ${failed}\n`)
process.exit(failed ? 1 : 0)
