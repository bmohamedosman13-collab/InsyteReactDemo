/**
 * Simulated processing. Spec section 0 rule 2: every "processing" step is a
 * delay, no backend and no model calls. Durations are fixed by the spec and
 * are deliberately not randomised, so a demo runs the same way every time.
 */

/** Spec 0.2 */
export const TIMING = {
  redactionPass: 2200,
  analysisButton: 1400,
  exportGeneration: 1800,
  notePass: 900,
}

/** The four approval states, 550ms each. Spec 3.2. */
export const APPROVAL_STATES = [
  'Locking redaction set',
  'Tagging sentences',
  'Building citation index',
  'Ready',
]

export const APPROVAL_STEP_MS = 550

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Step through a list of labels, calling onStep for each.
 * Returns a cancel function so a component unmounting mid-sequence does not
 * set state on a dead component.
 */
export function runSequence(labels, stepMs, onStep, onDone) {
  let cancelled = false
  let index = 0

  function tick() {
    if (cancelled) return
    onStep(labels[index], index)
    index += 1
    if (index < labels.length) {
      setTimeout(tick, stepMs)
    } else {
      setTimeout(() => {
        if (!cancelled) onDone?.()
      }, stepMs)
    }
  }

  tick()
  return () => {
    cancelled = true
  }
}

/** Timestamp for history rail entries and analysis re-run labels. */
export function stamp(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function relativeTime(date) {
  const diffMs = Date.now() - date.getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.round(hours / 24)
  return days === 1 ? 'yesterday' : `${days} days ago`
}
