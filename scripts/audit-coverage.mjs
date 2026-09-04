/**
 * Find identifier-shaped text in the source documents that no span covers.
 *
 * A redaction demo that leaves a phone number in the clear beside a REDACTED
 * chip is worse than no redaction, because it teaches the viewer the wrong
 * thing about what the tool does. This fails the build on any miss.
 */
import process from 'node:process'

const PATTERNS = [
  ['phone', /\(?\d{3}\)?[ .–-]\d{3}[ .–-]\d{4}/g],
  ['email', /[\w.+-]+@[\w-]+\.[\w.]+/g],
  ['postal code', /\b[A-Z]\d[A-Z] ?\d[A-Z]\d\b/g],
  ['registration', /#\s?\d{3,6}/g],
  ['long digit run', /\b\d{5,}\b/g],
  ['health number', /\b\d{5}[ -]\d{4}\b/g],
]

const CORPORA = [
  ['client1', '../src/data/clinical/client1/redactionSpans.js'],
  ['client2', '../src/data/clinical/client2/redactionSpans.js'],
  ['org', '../src/data/org/redactionSpans.js'],
]

// Figures that look like identifiers but are not. Dollar amounts, measure
// scores and counts are the substance of these documents.
const ALLOW = [
  /^\$/,
  /^\d{4}$/,          // bare years
]

let misses = 0

for (const [name, path] of CORPORA) {
  const { redactionSpans } = await import(path)
  for (const [docId, doc] of Object.entries(redactionSpans)) {
    let masked = doc.original
    for (const span of [...doc.spans].sort((a, b) => b.start - a.start)) {
      masked = masked.slice(0, span.start) + ' '.repeat(span.end - span.start) + masked.slice(span.end)
    }
    for (const [label, re] of PATTERNS) {
      for (const m of masked.matchAll(re)) {
        if (ALLOW.some((a) => a.test(m[0]))) continue
        console.error(`  MISSED  ${name} ${docId}  ${label.padEnd(15)} ${JSON.stringify(m[0])}`)
        misses += 1
      }
    }
  }
}

if (misses > 0) {
  console.error(`\ncoverage audit FAILED: ${misses} identifier(s) left in the clear\n`)
  process.exit(1)
}
console.log('coverage audit passed: no uncovered identifiers\n')
