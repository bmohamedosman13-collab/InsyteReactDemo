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
import documents from '../data/documents.json'

const TOAST_DURATION = 3500

export default function CaseWorkbench() {
  const [loaded, setLoaded] = useState(false)
  const [activeAnalysis, setActiveAnalysis] = useState(null)
  const [previewDoc, setPreviewDoc] = useState(null)
  const [analysesRun, setAnalysesRun] = useState(0)
  const [toast, setToast] = useState(false)

  function handleLoaded() {
    setLoaded(true)
    setToast(true)
    setTimeout(() => setToast(false), TOAST_DURATION)
  }

  function handleNewPatient() {
    setLoaded(false)
    setActiveAnalysis(null)
    setAnalysesRun(0)
  }

  function handleAnalysisSelect(id) {
    if (activeAnalysis !== id) {
      setAnalysesRun(n => n + 1)
    }
    setActiveAnalysis(id)
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
                  style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                >
                  <ProjectHeader mode="case" analysesRun={analysesRun} />
                  <DocumentTable documents={documents.case} onPreview={setPreviewDoc} />
                  <AnalysisBar active={activeAnalysis} onSelect={handleAnalysisSelect} />
                  {activeAnalysis && (
                    <AnalysisPanel
                      activeAnalysis={activeAnalysis}
                      mode="case"
                      onPreview={setPreviewDoc}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

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

      <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
    </AppShell>
  )
}
