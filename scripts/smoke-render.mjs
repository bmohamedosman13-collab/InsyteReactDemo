/**
 * Mount every screen in a real DOM and fail on any error.
 *
 * There is no browser in this environment, so this stands in for loading the
 * app: jsdom plus react-dom/client exercises the real component tree with the
 * real fixtures, runs effects, and surfaces anything thrown during render or
 * commit. It catches the class of failure that a build and a lint cannot.
 */
import { JSDOM } from 'jsdom'
import { createElement as h, act } from 'react'

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'https://insytedemo.pages.dev/',
  pretendToBeVisual: true,
})

globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.HTMLElement = dom.window.HTMLElement
globalThis.Node = dom.window.Node
globalThis.getComputedStyle = dom.window.getComputedStyle
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0)
globalThis.cancelAnimationFrame = clearTimeout
globalThis.IS_REACT_ACT_ENVIRONMENT = true

// jsdom has no matchMedia. The workbench uses it to decide whether the source
// rail is on screen, so report a wide viewport.
dom.window.matchMedia = (query) => ({
  matches: /min-width:\s*1280px/.test(query),
  media: query,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
})

const { createRoot } = await import('react-dom/client')
const { client1 } = await import('../src/data/clinical/client1/index.js')
const { client2 } = await import('../src/data/clinical/client2/index.js')
const { org } = await import('../src/data/org/index.js')
const { default: Workbench } = await import('../src/components/Workbench.jsx')
const { default: RedactionReview } = await import('../src/components/RedactionReview.jsx')
const { default: ExportModal } = await import('../src/components/ExportModal.jsx')
const { default: App } = await import('../src/App.jsx')

let failures = 0
const errors = []
const origError = console.error
console.error = (...args) => {
  const msg = args.map((a) => (a instanceof Error ? a.message : String(a))).join(' ')
  if (!/not wrapped in act|ReactDOMTestUtils/i.test(msg)) errors.push(msg)
}

async function mount(label, element, expect = []) {
  errors.length = 0
  const host = dom.window.document.createElement('div')
  dom.window.document.body.appendChild(host)
  const root = createRoot(host)
  try {
    await act(async () => { root.render(element) })
    const html = host.innerHTML
    const text = host.textContent
    const missing = expect.filter((t) => !text.includes(t))
    if (errors.length) {
      origError(`  ERROR ${label}: ${errors[0].slice(0, 160)}`)
      failures += 1
    } else if (missing.length) {
      origError(`  FAIL  ${label}: mounted but missing ${JSON.stringify(missing)}`)
      failures += 1
    } else if (html.length < 500) {
      origError(`  FAIL  ${label}: rendered almost nothing (${html.length} chars)`)
      failures += 1
    } else {
      origError(`  ok    ${label}  (${html.length.toLocaleString()} chars)`)
    }
  } catch (err) {
    origError(`  CRASH ${label}: ${err.message}`)
    origError(`        ${(err.stack || '').split('\n').slice(1, 3).map((l) => l.trim()).join(' | ')}`)
    failures += 1
  } finally {
    await act(async () => { root.unmount() })
    host.remove()
  }
}

for (const corpus of [client1, client2, org]) {
  await mount(`redaction review · ${corpus.id}`,
    h(RedactionReview, {
      docs: corpus.docs,
      spansByDoc: corpus.spansByDoc,
      header: corpus.redaction.header,
      mergedIdentity: corpus.redaction.mergedIdentity,
      callout: corpus.redaction.callout,
      calloutDoc: corpus.redaction.calloutDoc,
      onApprove: () => {},
    }),
    ['REDACTED', 'Next unreviewed', 'Nothing is analysed until you approve'])

  await mount(`workbench · ${corpus.id}`, h(Workbench, { corpus }),
    ['Document summary', corpus.glance.title, 'Export'])

  await mount(`export modal · ${corpus.id}`,
    h(ExportModal, { config: corpus.exportConfig, onClose: () => {} }),
    ['Export', corpus.exportConfig.cards[0].label])
}

// The entry point itself: if this crashes the page is blank, which is the
// failure mode that looks like "the site does not work".
await mount('app entry (landing)', h(App), ['Insyte', 'Casework', 'Organization'])

// And the narrow path, where the rail collapses and the source is an overlay.
dom.window.matchMedia = (query) => ({
  matches: false, media: query,
  addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
})
await mount('workbench · narrow viewport', h(Workbench, { corpus: client1 }), ['Document summary'])

console.error = origError
console.log(failures === 0 ? '\nsmoke mount passed\n' : `\nsmoke mount FAILED: ${failures}\n`)
process.exit(failures ? 1 : 0)
