import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DocumentRenderer from './DocumentRenderer'

export default function PreviewModal({ doc, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

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
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.65)',
              zIndex: 100,
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 101,
              maxWidth: 720,
              width: 'calc(100vw - 48px)',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Modal header */}
            <div style={{
              padding: '14px 20px',
              background: '#2D1B4E',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-sans)',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 13, fontWeight: 500, maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {doc.title}
              </span>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontSize: 18,
                  lineHeight: 1,
                  padding: '0 4px',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            <div style={{
              background: '#FAFAF7',
              padding: '40px 48px',
              overflowY: 'auto',
              flex: 1,
            }}>
              <DocumentRenderer doc={doc} />
            </div>

            {/* Modal footer */}
            <div style={{
              background: '#FAFAF7',
              borderTop: '1px solid #e8e8e4',
              padding: '10px 48px',
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: '#aaa',
              flexShrink: 0,
            }}>
              Demo mode: download disabled
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
