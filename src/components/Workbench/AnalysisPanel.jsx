import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import analysisResults from '../../data/analysisResults.json'
import SentimentResult from '../Analyses/SentimentResult'
import PatternResult from '../Analyses/PatternResult'
import RiskResult from '../Analyses/RiskResult'
import KeywordSearch from '../Analyses/KeywordSearch'
import SuggestedChips from '../Onboarding/SuggestedChips'

const CHIP_TO_PATTERN = {
  'Programs by performance': 'performance',
  'Staff turnover and retention': 'turnover',
  'Disciplinary actions across programs': 'disciplinary',
  'Mood trajectory across journal': 'mood',
  'Sleep and mood pattern': 'sleep',
  'Social withdrawal trajectory': 'social',
}

const CHIP_TO_RISK = {
  'Fraud or financial irregularity': 'fraud',
  'Duty of care or client safety': 'dutyOfCare',
  'Suicidal ideation or self-harm': 'ideation',
}

const CHIP_TO_KEYWORD = {
  'fraud': 'fraud',
  'burnout': 'burnout',
  'waitlist': 'waitlist',
  'suicidal ideation': 'suicidal ideation',
  'sleep': 'sleep',
  'PHQ-9': 'PHQ-9',
  'safety plan': 'safety plan',
  'behavioural activation': 'behavioural activation',
}

export default function AnalysisPanel({ activeAnalysis, mode, onPreview }) {
  const [activeChip, setActiveChip] = useState(null)
  const [patternScenario, setPatternScenario] = useState(null)
  const [riskScenario, setRiskScenario] = useState(null)
  const [keywordQuery, setKeywordQuery] = useState(null)

  useEffect(() => {
    setActiveChip(null)
    setPatternScenario(null)
    setRiskScenario(null)
    setKeywordQuery(null)
  }, [activeAnalysis])

  function handleChipClick(chip) {
    setActiveChip(chip)

    if (activeAnalysis === 'pattern' && CHIP_TO_PATTERN[chip]) {
      setPatternScenario(CHIP_TO_PATTERN[chip])
    } else if (activeAnalysis === 'risk' && CHIP_TO_RISK[chip]) {
      setRiskScenario(CHIP_TO_RISK[chip])
    } else if (activeAnalysis === 'keyword') {
      const q = CHIP_TO_KEYWORD[chip] ?? chip
      setKeywordQuery(q)
    }
  }

  if (!activeAnalysis) return null

  const patternData = analysisResults[mode]?.pattern
  const resolvedPattern = patternScenario
    ? patternData?.[patternScenario]
    : patternData?.[Object.keys(patternData || {})[0]]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeAnalysis}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 120, damping: 14 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        {/* Suggested chips */}
        <SuggestedChips
          mode={mode}
          activeAnalysis={activeAnalysis}
          activeChip={activeChip}
          onChipClick={handleChipClick}
        />

        {/* Result panel */}
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-active)',
          borderRadius: 12,
          padding: '24px',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}>
          {activeAnalysis === 'keyword' && (
            <KeywordSearch
              mode={mode}
              initialQuery={keywordQuery}
              onPreview={onPreview}
            />
          )}

          {activeAnalysis === 'sentiment' && (
            <>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                <div>
                  <div style={{
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--accent)',
                    marginBottom: 4,
                    fontFamily: 'var(--font-sans)',
                  }}>
                    Sentiment Analysis
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                  }}>
                    {mode === 'org' ? 'Q1 2026 Program Review' : 'M.J. — Treatment Period'}
                  </h3>
                </div>
                <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-tertiary)', flexShrink: 0, marginLeft: 16 }}>
                  <div>{mode === 'org' ? '14' : '7'} documents analyzed</div>
                  <div style={{ marginTop: 2 }}>Completed in 1.2s</div>
                </div>
              </div>
              <SentimentResult mode={mode} onPreview={onPreview} />
            </>
          )}

          {activeAnalysis === 'pattern' && (
            <PatternResult
              result={resolvedPattern}
              onPreview={onPreview}
            />
          )}

          {activeAnalysis === 'risk' && (
            <RiskResult
              mode={mode}
              initialScenario={riskScenario}
              onPreview={onPreview}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
