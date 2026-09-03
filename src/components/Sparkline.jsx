import { useState } from 'react'

/**
 * PHQ-9 / GAD-7 series. Spec 4.3.
 * The 2025-05-22 gap renders as a marked break, not as an interpolated point,
 * because the measures were not administered that day.
 */
export default function Sparkline({ series }) {
  const { dates, phq9, gad7, gap } = series
  const W = 640
  const H = 132
  const PAD = { top: 14, right: 14, bottom: 26, left: 30 }
  const max = 28
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom
  const [hover, setHover] = useState(null)

  // The ED gap sits between index 6 (2025-05-13) and 7 (2025-06-05).
  const gapAfter = 6
  const x = (i) => PAD.left + (i / (dates.length - 1)) * innerW
  const y = (v) => PAD.top + innerH - (v / max) * innerH

  const path = (vals, from, to) =>
    vals
      .slice(from, to)
      .map((v, k) => `${k === 0 ? 'M' : 'L'} ${x(from + k).toFixed(1)} ${y(v).toFixed(1)}`)
      .join(' ')

  const lines = [
    { key: 'phq9', label: 'PHQ-9', vals: phq9, color: 'var(--plum)' },
    { key: 'gad7', label: 'GAD-7', vals: gad7, color: 'var(--violet)' },
  ]

  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ display: 'flex', gap: 18, marginBottom: 6, fontSize: 12, color: 'var(--ink-tertiary)' }}>
        {lines.map((l) => (
          <span key={l.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 14, height: 2, background: l.color, display: 'inline-block' }} />
            {l.label}
          </span>
        ))}
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 0, height: 12, borderLeft: '1px dashed var(--amber)' }} />
          {gap.label}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        role="img"
        aria-label="PHQ-9 and GAD-7 across the episode"
      >
        {[0, 7, 14, 21, 28].map((v) => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} stroke="var(--line)" strokeWidth="1" />
            <text x={PAD.left - 7} y={y(v) + 3.5} textAnchor="end" fontSize="9" fill="var(--ink-faint)">
              {v}
            </text>
          </g>
        ))}

        {/* ED presentation break */}
        <line
          x1={(x(gapAfter) + x(gapAfter + 1)) / 2}
          x2={(x(gapAfter) + x(gapAfter + 1)) / 2}
          y1={PAD.top - 6}
          y2={PAD.top + innerH}
          stroke="var(--amber)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {lines.map((l) => (
          <g key={l.key}>
            <path d={path(l.vals, 0, gapAfter + 1)} fill="none" stroke={l.color} strokeWidth="1.8" strokeLinejoin="round" />
            <path d={path(l.vals, gapAfter + 1, l.vals.length)} fill="none" stroke={l.color} strokeWidth="1.8" strokeLinejoin="round" />
            {l.vals.map((v, i) => (
              <circle
                key={i}
                cx={x(i)}
                cy={y(v)}
                r={hover === i ? 4 : 2.4}
                fill={l.color}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </g>
        ))}

        {[0, 6, 10, 13].map((i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="9" fill="var(--ink-faint)">
            {dates[i].slice(5)}
          </text>
        ))}

        {hover !== null && (
          <g>
            <rect x={x(hover) - 46} y={PAD.top - 4} width="92" height="34" rx="4" fill="var(--surface)" stroke="var(--line-strong)" />
            <text x={x(hover)} y={PAD.top + 8} textAnchor="middle" fontSize="9.5" fill="var(--ink)">
              {dates[hover]}
            </text>
            <text x={x(hover)} y={PAD.top + 21} textAnchor="middle" fontSize="9.5" fill="var(--ink-secondary)">
              PHQ-9 {phq9[hover]} · GAD-7 {gad7[hover]}
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
