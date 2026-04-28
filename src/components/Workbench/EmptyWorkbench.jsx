import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function UploadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="24" height="24" rx="4" />
      <polyline points="16,10 16,22" />
      <polyline points="11,15 16,10 21,15" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <motion.svg
      width="32" height="32" viewBox="0 0 32 32" fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <circle cx="16" cy="16" r="12" stroke="var(--border-active)" strokeWidth="2" />
      <path d="M16 4 A12 12 0 0 1 28 16" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  )
}

export default function EmptyWorkbench({ mode, onLoaded }) {
  const [loading, setLoading] = useState(false)

  const isOrg = mode === 'org'
  const heading = isOrg
    ? 'Upload folders here to start a new project'
    : 'Upload patient files here to start a new chart'
  const sub = 'Drag and drop, or click to browse. Insyte processes intake forms, case files, reports, and clinical documentation.'

  function handleClick() {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      onLoaded()
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: 320,
      }}
    >
      <motion.button
        whileHover={!loading ? { borderColor: 'var(--border-active)' } : {}}
        onClick={handleClick}
        style={{
          background: 'var(--card-bg)',
          border: '1.5px dashed var(--border-subtle)',
          borderRadius: 16,
          padding: '48px 56px',
          textAlign: 'center',
          cursor: loading ? 'default' : 'pointer',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          maxWidth: 480,
          width: '100%',
          transition: 'border-color 0.2s, background 0.2s',
          fontFamily: 'inherit',
        }}
        onMouseEnter={e => {
          if (!loading) {
            e.currentTarget.style.background = 'var(--card-bg-hover)'
            e.currentTarget.style.borderColor = 'var(--border-active)'
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--card-bg)'
          e.currentTarget.style.borderColor = 'var(--border-subtle)'
        }}
      >
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {loading
              ? <SpinnerIcon key="spinner" />
              : <UploadIcon key="upload" />
            }
          </AnimatePresence>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 22,
          fontWeight: 500,
          color: loading ? 'var(--text-secondary)' : 'var(--text-primary)',
          marginBottom: 10,
          transition: 'color 0.2s',
        }}>
          {loading ? 'Processing your documents...' : heading}
        </h3>

        {!loading && (
          <p style={{
            color: 'var(--text-tertiary)',
            fontSize: 13,
            lineHeight: 1.6,
            maxWidth: 340,
            margin: '0 auto',
          }}>
            {sub}
          </p>
        )}
      </motion.button>
    </motion.div>
  )
}
