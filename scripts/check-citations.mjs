/**
 * Enforces spec section 0 rule 4: nothing in the UI may fabricate a source.
 *
 * Every section `find` string must exist verbatim in its document text, and
 * every citation raised by an analysis fixture must point at a real document
 * and a real anchor. Fails the build if not.
 */
import process from 'node:process'

const modules = [
  { label: 'clinical/client1', path: '../src/data/clinical/client1/docs.js', tokenCheck: true },
  { label: 'clinical/client2', path: '../src/data/clinical/client2/docs.js' },
  { label: 'org', path: '../src/data/org/documentText.js' },
]

let failures = 0
let checkedSections = 0

for (const { label, path, tokenCheck } of modules) {
  let mod
  try {
    mod = await import(path)
  } catch (err) {
    console.error(`  FAIL  ${label}: could not load (${err.message})`)
    failures += 1
    continue
  }

  for (const doc of mod.docs) {
    if (!doc.text || doc.text.length < 100) {
      console.error(`  FAIL  ${label} doc ${doc.id}: missing or truncated text`)
      failures += 1
      continue
    }
    for (const section of doc.sections) {
      checkedSections += 1
      if (!doc.text.includes(section.find)) {
        console.error(
          `  FAIL  ${label} doc ${doc.id} ${section.anchor}: find string not present\n` +
            `        looked for: ${JSON.stringify(section.find)}`
        )
        failures += 1
      }
    }

    // Tokenisation check: no real surname may survive into the analysis layer.
    const leaks = tokenCheck && doc.text.match(
      /Ramanathan|Fontaine-Berg|Okonjo|Achterberg|Villanueva|Devereux|Ilesanmi|Osei-Bonsu|Halverson|Priya/g
    )
    if (leaks) {
      console.error(`  FAIL  ${label} doc ${doc.id}: ${leaks.length} untokenised name(s): ${[...new Set(leaks)].join(', ')}`)
      failures += 1
    }
  }
}

/* Every [[docId §anchor]] raised by a fixture must resolve to a real anchor. */
const fixtures = [
  {
    label: 'clinical/client1',
    docs: '../src/data/clinical/client1/docs.js',
    mods: [
      '../src/data/clinical/client1/analyses.js',
      '../src/data/clinical/client1/queries.js',
      '../src/data/clinical/client1/exports.js',
    ],
  },
  { label: 'clinical/client2', docs: '../src/data/clinical/client2/docs.js', mods: ['../src/data/clinical/client2/index.js'] },
  { label: 'org', docs: '../src/data/org/documentText.js', mods: ['../src/data/org/index.js'] },
]

const CITE = /\[\[(\d{2}|W\d)\s+(§[^\]]+)\]\]/g
let checkedCites = 0

for (const f of fixtures) {
  const { docsById } = await import(f.docs)
  for (const modPath of f.mods) {
    const mod = await import(modPath)
    const blob = JSON.stringify(Object.values(mod), (k, v) => (typeof v === 'function' ? undefined : v))
    CITE.lastIndex = 0
    const seen = new Set()
    let m
    while ((m = CITE.exec(blob)) !== null) {
      const anchor = m[2].trim()
      const key = `${m[1]}|${anchor}`
      if (seen.has(key)) continue
      seen.add(key)
      checkedCites += 1
      const doc = docsById[m[1]]
      if (!doc) {
        console.error(`  FAIL  ${f.label} ${modPath}: citation to unknown document ${m[1]}`)
        failures += 1
      } else if (!doc.sections.some((s) => s.anchor === anchor)) {
        console.error(`  FAIL  ${f.label} ${modPath}: doc ${m[1]} has no anchor ${anchor}`)
        failures += 1
      }
    }
  }
}

console.log(`\ncitation check: ${checkedSections} section anchors verified`)
console.log(`citation check: ${checkedCites} distinct citation markers resolved`)
if (failures > 0) {
  console.error(`citation check FAILED with ${failures} problem(s)\n`)
  process.exit(1)
}
console.log('citation check passed\n')
