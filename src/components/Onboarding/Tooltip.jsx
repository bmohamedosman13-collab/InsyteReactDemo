import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  {
    title: 'Welcome',
    body: "We've loaded a sample organization for you to explore. Click any document to preview, or pick an analysis below to begin.",
  },
  {
    title: 'Documents',
    body: 'Click Preview on any document to see its full contents rendered in a clean document view.',
  },
  {
    title: 'Analyses',
    body: 'Choose an analysis below. Each one looks at all 14 documents at once and surfaces patterns you would miss manually.',
  },
  {
    title: 'Citations',
    body: 'Every insight links back to the source documents that informed it. Click any citation chip to open the source.',
  },
]

export default function Tooltip({ onDismiss }) {
  const [step, setStep] = useState(0)

  function next() {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      onDismiss()
    }
  }

  const current = STEPS[step]

  return (
    <AnimatePresence>
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 8 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          top: 80,
          right: 0,
          background: 'var(--plum)',
          border: '1px solid var(--accent)',
          borderRadius: 10,
          padding: '14px 16px',
          maxWidth: 260,
          zIndex: 20,
          boxShadow: '0 10px 40px rgba(180,164,232,0.2)',
          pointerEvents: 'auto',
        }}
      >
        <div style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--accent)',
          marginBottom: 6,
          fontFamily: 'var(--font-sans)',
        }}>
          {current.title}
        </div>
        <div style={{
          fontSize: 13,
          color: 'var(--text-primary)',
          lineHeight: 1.55,
          marginBottom: 10,
        }}>
          {current.body}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 11,
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-sans)',
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span>Step {step + 1} of {STEPS.length}</span>
            <button
              onClick={onDismiss}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-tertiary)',
                cursor: 'pointer',
                fontSize: 11,
                fontFamily: 'var(--font-sans)',
                padding: 0,
              }}
            >
              Dismiss
            </button>
          </div>
          <button
            onClick={next}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: 11,
              fontFamily: 'var(--font-sans)',
              padding: 0,
            }}
          >
            {step < STEPS.length - 1 ? 'Next →' : 'Done →'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
