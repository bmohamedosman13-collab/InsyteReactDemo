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

/* ------------------------------------------------------------------------ */
/* Document strip: every document must be reachable, in both directions.      */

for (const viewport of [
  { width: 1600, height: 900 },
  { width: 1280, height: 720 },
  { width: 1100, height: 700 },
]) {
  const label = `strip at ${viewport.width}`
  const page = await browser.newPage({ viewport })
  await page.goto(`${BASE}/org`, { waitUntil: 'networkidle' })
  await page.waitForSelector('.ins-doctabs-strip')

  // Click through the DOM rather than through Playwright, which scrolls an
  // element into view before clicking and would hide the very bug under test.
  const clickTab = (i) => page.evaluate((n) => {
    document.querySelectorAll('.ins-doctab')[n].click()
  }, i)

  // Smooth scrolling takes longer the further it goes, so a fixed wait measures
  // long jumps mid-flight. Poll until the strip stops moving instead.
  const settled = async () => {
    // Give the scroll a chance to start before deciding it has stopped, then
    // require several stable samples. Sampling immediately after the click
    // reads the position from before the animation began.
    await page.waitForTimeout(120)
    let last = null
    let stable = 0
    for (let i = 0; i < 60; i += 1) {
      const now = await page.evaluate(() => document.querySelector('.ins-doctabs-strip').scrollLeft)
      stable = last !== null && Math.abs(now - last) < 0.5 ? stable + 1 : 0
      last = now
      if (stable >= 3) return now
      await page.waitForTimeout(50)
    }
    return last
  }

  // Poll the outcome rather than guessing at animation timing: wait until the
  // tab is fully in view, or give up. This tests what the reviewer sees, not
  // how it got there.
  const settledVisible = async (i) => {
    for (let n = 0; n < 30; n += 1) {
      const v = await visibility(i)
      if (v.shown > 0.99) return v
      await page.waitForTimeout(60)
    }
    return visibility(i)
  }

  const visibility = (i) => page.evaluate((n) => {
    const strip = document.querySelector('.ins-doctabs-strip')
    const tab = document.querySelectorAll('.ins-doctab')[n]
    const s = strip.getBoundingClientRect()
    const t = tab.getBoundingClientRect()
    const overlap = Math.max(0, Math.min(s.right, t.right) - Math.max(s.left, t.left))
    return {
      shown: overlap / t.width,
      scrollLeft: strip.scrollLeft,
      count: document.querySelectorAll('.ins-doctab').length,
      fits: strip.scrollWidth <= strip.clientWidth,
    }
  }, i)

  const state = await visibility(0)
  check(`${label}: strip holds every document`, state.count === 15, `found ${state.count}`)
  check(`${label}: the strip actually overflows`, !state.fits,
    'nothing is off screen, so this viewport cannot exercise the bug')

  // Forward: from the start, jump to each document in turn.
  const forward = []
  for (let i = 1; i < state.count; i += 1) {
    await clickTab(i)
    const v = await settledVisible(i)
    if (v.shown <= 0.99) forward.push(`${i + 1} at ${(v.shown * 100).toFixed(0)}%`)
  }
  check(`${label}: every document reachable going forward`, forward.length === 0,
    `off screen after selecting: ${forward.join(', ')}`)

  // Backward: from the end, walk back down.
  const backward = []
  for (let i = state.count - 2; i >= 0; i -= 1) {
    await clickTab(i)
    const v = await settledVisible(i)
    if (v.shown <= 0.99) backward.push(`${i + 1} at ${(v.shown * 100).toFixed(0)}%`)
  }
  check(`${label}: every document reachable going backward`, backward.length === 0,
    `off screen after selecting: ${backward.join(', ')}`)

  // Large jumps, which is where this actually goes wrong. Stepping one tab at
  // a time never moves the strip far enough to expose an offset error.
  const jumps = [[0, 14], [14, 0], [0, 11], [11, 0], [0, 7], [14, 3], [2, 13], [13, 2]]
  const broken = []
  for (const [from, to] of jumps) {
    await clickTab(from)
    await settled()
    await clickTab(to)
    const jv = await settledVisible(to)
    if (jv.shown <= 0.99) {
      broken.push(`${from + 1} to ${to + 1}: ${(jv.shown * 100).toFixed(0)}% visible`)
    }
  }
  check(`${label}: large jumps bring the target into view`, broken.length === 0,
    broken.join('; '))

  // Walking the whole set with Next unreviewed, which is the only way to reach
  // a document that is not currently on screen. Every step must bring its
  // target into view.
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForSelector('.ins-doctabs-strip')
  const walk = []
  for (let step = 0; step < 14; step += 1) {
    const moved = await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Next unreviewed')
      if (!btn) return false
      btn.click()
      return true
    })
    if (!moved) break
    await settled()
    const seen = await page.evaluate(() => {
      const strip = document.querySelector('.ins-doctabs-strip')
      const tabs = [...document.querySelectorAll('.ins-doctab')]
      const tab = tabs.find((t) => getComputedStyle(t).backgroundColor === 'rgb(45, 27, 78)')
      if (!tab) return null
      const s = strip.getBoundingClientRect()
      const t = tab.getBoundingClientRect()
      const overlap = Math.max(0, Math.min(s.right, t.right) - Math.max(s.left, t.left))
      return { shown: overlap / t.width, index: tabs.indexOf(tab) }
    })
    if (!seen || seen.shown <= 0.9) {
      walk.push(seen ? `document ${seen.index + 1} at ${(seen.shown * 100).toFixed(0)}%` : 'no active tab')
    }
  }
  check(`${label}: walking with Next unreviewed keeps each document in view`,
    walk.length === 0, walk.join('; '))

  // Next unreviewed has to bring its target into view as well.
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Next unreviewed')
    btn?.click()
  })
  await settled()
  const active = await page.evaluate(() => {
    const strip = document.querySelector('.ins-doctabs-strip')
    const tabs = [...document.querySelectorAll('.ins-doctab')]
    const tab = tabs.find((t) => getComputedStyle(t).backgroundColor === 'rgb(45, 27, 78)')
    if (!tab) return null
    const s = strip.getBoundingClientRect()
    const t = tab.getBoundingClientRect()
    const overlap = Math.max(0, Math.min(s.right, t.right) - Math.max(s.left, t.left))
    return { shown: overlap / t.width, index: tabs.indexOf(tab) }
  })
  check(`${label}: Next unreviewed brings its document into view`,
    active !== null && active.shown > 0.9,
    active ? `document ${active.index + 1} only ${(active.shown * 100).toFixed(0)}% visible` : 'no active tab found')

  await page.close()
}

await browser.close()
console.log(failed === 0 ? '\nbrowser tests passed\n' : `\nbrowser tests FAILED: ${failed}\n`)
process.exit(failed ? 1 : 0)
