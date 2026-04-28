import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppShell from '../components/Layout/AppShell'
import Sidebar from '../components/Workbench/Sidebar'
import ProjectHeader from '../components/Workbench/ProjectHeader'
import EmptyWorkbench from '../components/Workbench/EmptyWorkbench'
import DocumentTable from '../components/Workbench/DocumentTable'
import AnalysisBar from '../components/Workbench/AnalysisBar'
import AnalysisPanel from '../components/Workbench/AnalysisPanel'
import PreviewModal from '../components/Documents/PreviewModal'
import Tooltip from '../components/Onboarding/Tooltip'
import documents from '../data/documents.json'

const TOAST_DURATION = 3500

function ChevronIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <polyline points={open ? '4,10 8,6 12,10' : '4,6 8,10 12,6'} />
    </svg>
  )
}

export default function CaseWorkbench() {
  const [loaded, setLoaded] = useState(false)
  const [activeAnalysis, setActiveAnalysis] = useState(null)
  const [previewDoc, setPreviewDoc] = useState(null)
  const [previewCtx, setPreviewCtx] = useState(null)
  const [analysesRun, setAnalysesRun] = useState(0)
  const [showTooltip, setShowTooltip] = useState(true)
  const [toast, setToast] = useState(false)
  const [tableOpen, setTableOpen] = useState(true)

  function handleLoaded() {
    setLoaded(true)
    setToast(true)
    setTimeout(() => setToast(false), TOAST_DURATION)
  }

  function handleNewPatient() {
    setLoaded(false)
    setActiveAnalysis(null)
    setAnalysesRun(0)
    setShowTooltip(true)
    setTableOpen(true)
  }

  function handleAnalysisSelect(id) {
    if (activeAnalysis !== id) setAnalysesRun(n => n + 1)
    setActiveAnalysis(id)
    if (tableOpen) setTableOpen(false)
  }

  function handlePreview(doc, ctx = null) {
    setPreviewDoc(doc)
    setPreviewCtx(ctx)
  }

  return (
    <AppShell>
      <div style={{ padding: '32px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <Sidebar mode="case" onNewClick={handleNewPatient} />

          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <AnimatePresence mode="wait">
              {!loaded ? (
                <EmptyWorkbench key="empty" mode="case" onLoaded={handleLoaded} />
              ) : (
                <motion.div
                  key="loaded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}
                >
                  <ProjectHeader mode="case" analysesRun={analysesRun} />

                  {/* Collapsible table section */}
                  <div>
                    {/* Toggle header */}
                    <button
                      onClick={() => setTableOpen(o => !o)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px 2px',
                        marginBottom: tableOpen ? 10 : 0,
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12,
                        textAlign: 'left',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)' }}>
                        Documents
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                        7
                      </span>
                      <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>
                        <ChevronIcon open={tableOpen} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {tableOpen && (
                        <motion.div
                          key="table"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <DocumentTable
                            documents={documents.case}
                            onPreview={doc => handlePreview(doc, null)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <AnalysisBar active={activeAnalysis} onSelect={handleAnalysisSelect} />

                  {activeAnalysis && (
                    <AnalysisPanel
                      activeAnalysis={activeAnalysis}
                      mode="case"
                      onPreview={handlePreview}
                    />
                  )}

                  {showTooltip && !activeAnalysis && (
                    <Tooltip onDismiss={() => setShowTooltip(false)} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              bottom: 32,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--plum)',
              border: '1px solid var(--border-active)',
              borderRadius: 8,
              padding: '12px 20px',
              fontSize: 13,
              color: 'var(--text-primary)',
              zIndex: 50,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            Samples created and uploaded. Preview what's inside each document.
          </motion.div>
        )}
      </AnimatePresence>

      <PreviewModal
        doc={previewDoc}
        mode="case"
        highlightContext={previewCtx}
        onClose={() => { setPreviewDoc(null); setPreviewCtx(null) }}
      />
    </AppShell>
  )
}
