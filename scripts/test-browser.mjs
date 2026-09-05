/**
 * Real-browser test of select-to-redact.
 *
 * Everything else in this repo checks the app without ever laying it out.
 * This drives Chromium against the production build: it makes a real text
 * selection with the mouse and asserts that the Redact control lands on the
 * highlight rather than somewhere else on the screen.
 *
 * Run against a local preview server:  npm run test:browser
 */
import { chromium } from 'playwright-core'
import process from 'node:process'

const BASE = process.env.BASE_URL || 'http://localhost:4331'
let failed = 0

function check(name, ok, detail = '') {
  if (ok) console.log(`  ok    ${name}`)
  else {
    console.error(`  FAIL  ${name}${detail ? `\n        ${detail}` : ''}`)
    failed += 1
  }
}

const browser = await chromium.launch()

for (const [label, track, viewport] of [
  ['org, wide', 'org', { width: 1600, height: 900 }],
  ['casework, laptop', 'case', { width: 1280, height: 720 }],
  ['casework, small', 'case', { width: 1024, height: 680 }],
]) {
  const page = await browser.newPage({ viewport })
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

  await page.goto(`${BASE}/${track}`, { waitUntil: 'networkidle' })
  await page.waitForSelector('.ins-pane-body')

  // Select a run of words inside the redacted pane by dragging across it.
  const target = await page.evaluate(() => {
    const pane = document.querySelectorAll('.ins-pane-body')[1]
    // A text node well down the pane, so the selection is not near the top.
    const walker = document.createTreeWalker(pane, NodeFilter.SHOW_TEXT)
    const nodes = []
    let n
    while ((n = walker.nextNode())) if (n.textContent.trim().length > 40) nodes.push(n)
    const node = nodes[Math.min(2, nodes.length - 1)]
    if (!node) return null
    const range = document.createRange()
    range.setStart(node, 5)
    range.setEnd(node, 30)
    const rect = range.getBoundingClientRect()
    return { x1: rect.left + 1, y1: rect.top + rect.height / 2, x2: rect.right - 1, y2: rect.top + rect.height / 2 }
  })

  if (!target) {
    check(`${label}: found selectable text`, false)
    await page.close()
    continue
  }

  await page.mouse.move(target.x1, target.y1)
  await page.mouse.down()
  await page.mouse.move(target.x2, target.y2, { steps: 12 })
  await page.mouse.up()
  await page.waitForTimeout(250)

  const tip = page.locator('.ins-selection-tip')
  const visible = await tip.isVisible().catch(() => false)
  check(`${label}: redact control appears`, visible)

  if (visible) {
    const box = await tip.boundingBox()
    const sel = await page.evaluate(() => {
      const r = window.getSelection().getRangeAt(0).getClientRects()
      const real = Array.from(r).filter((x) => x.width >= 1 && x.height >= 1)[0]
      return real ? { left: real.left, top: real.top, right: real.right, bottom: real.bottom } : null
    })

    const dx = Math.abs(box.x - sel.left)
    const dy = Math.abs(box.y + box.height - sel.top)
    check(`${label}: sits at the start of the highlight`, dx <= 40,
      `control x ${box.x.toFixed(0)}, highlight starts at ${sel.left.toFixed(0)}, off by ${dx.toFixed(0)}px`)
    check(`${label}: sits directly above the highlight`, dy <= 40,
      `control bottom ${(box.y + box.height).toFixed(0)}, highlight top ${sel.top.toFixed(0)}, off by ${dy.toFixed(0)}px`)
    check(`${label}: stays inside the viewport`,
      box.x >= 0 && box.x + box.width <= viewport.width && box.y >= 0,
      `box ${JSON.stringify(box)} viewport ${viewport.width}x${viewport.height}`)

    // Pressing it must actually redact, not lose the selection first.
    const before = await page.locator('.ins-chip-redacted').count()
    await tip.locator('button').click()
    await page.waitForTimeout(200)
    const after = await page.locator('.ins-chip-redacted').count()
    check(`${label}: pressing Redact adds a redaction`, after === before + 1,
      `chips ${before} then ${after}`)
    check(`${label}: control goes away after use`,
      !(await page.locator('.ins-selection-tip').isVisible().catch(() => false)))
  }

  // Clicking elsewhere dismisses it.
  await page.mouse.click(target.x2, target.y2)
  await page.waitForTimeout(150)
  check(`${label}: dismissed by a click elsewhere`,
    !(await page.locator('.ins-selection-tip').isVisible().catch(() => false)))

  check(`${label}: no console errors`, errors.length === 0, errors[0] || '')
  await page.close()
}

await browser.close()
console.log(failed === 0 ? '\nbrowser tests passed\n' : `\nbrowser tests FAILED: ${failed}\n`)
process.exit(failed ? 1 : 0)
