import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DocumentRenderer from './DocumentRenderer'

export default function PreviewModal({ doc, mode, highlightContext, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    if (doc) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [doc, onClose])

  return (
    <AnimatePresence>
      {doc && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.68)',
              zIndex: 100,
            }}
          />

          {/* Modal wrapper — centers with flex so it never clips */}
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 101,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 24px',
            pointerEvents: 'none',
          }}>
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                width: '100%',
                maxWidth: 740,
                maxHeight: 'calc(100vh - 48px)',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.65)',
                pointerEvents: 'auto',
              }}
            >
              {/* Header */}
              <div style={{
                padding: '13px 20px',
                background: '#2D1B4E',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-sans)',
                flexShrink: 0,
              }}>
                <span style={{
                  fontSize: 13,
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '85%',
                }}>
                  {doc.title}
                </span>
                <button
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.55)',
                    cursor: 'pointer',
                    fontSize: 18,
                    lineHeight: 1,
                    padding: '2px 4px',
                    fontFamily: 'var(--font-sans)',
                    flexShrink: 0,
                    marginLeft: 12,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Scrollable body */}
              <div style={{
                background: '#FAFAF7',
                padding: '32px 40px',
                overflowY: 'auto',
                flex: 1,
                minHeight: 0,
              }}>
                <DocumentRenderer
                  doc={doc}
                  mode={mode}
                  highlightContext={highlightContext}
                />
              </div>

              {/* Footer */}
              <div style={{
                background: '#F4F4F0',
                borderTop: '1px solid #e4e4e0',
                padding: '8px 40px',
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                color: '#aaa',
                flexShrink: 0,
              }}>
                Demo mode: download disabled
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
