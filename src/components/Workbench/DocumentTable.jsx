import { motion } from 'framer-motion'

function DocIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="var(--border-active)" strokeWidth="1.2" strokeLinecap="round">
      <rect x="1" y="1" width="12" height="14" rx="2" />
      <line x1="4" y1="5" x2="10" y2="5" />
      <line x1="4" y1="8" x2="10" y2="8" />
      <line x1="4" y1="11" x2="8" y2="11" />
    </svg>
  )
}

export default function DocumentTable({ documents, onPreview }) {
  const cols = { gridTemplateColumns: '1fr 150px 80px 100px' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 12,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'grid',
        ...cols,
        gap: 16,
        padding: '12px 20px',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--text-tertiary)',
        borderBottom: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-sans)',
      }}>
        <div>Document</div>
        <div>Type</div>
        <div>Date</div>
        <div />
      </div>

      {/* Rows */}
      {documents.map((doc, i) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.05 + i * 0.03 }}
          style={{
            display: 'grid',
            ...cols,
            gap: 16,
            padding: '13px 20px',
            alignItems: 'center',
            borderBottom: i < documents.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            fontSize: 13,
            cursor: 'default',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--card-bg-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: 'var(--text-primary)',
            fontWeight: 500,
            minWidth: 0,
          }}>
            <DocIcon />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {doc.title}
            </span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{doc.type}</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>{doc.displayDate}</div>
          <div>
            <button
              onClick={() => onPreview(doc)}
              style={{
                padding: '4px 10px',
                background: 'transparent',
                border: '1px solid var(--border-active)',
                borderRadius: 4,
                color: 'var(--accent)',
                fontSize: 11,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(180,164,232,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Preview
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
