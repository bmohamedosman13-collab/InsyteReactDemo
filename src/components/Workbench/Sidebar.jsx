import { motion } from 'framer-motion'

export default function Sidebar({ mode, onNewClick }) {
  const isOrg = mode === 'org'

  const activeItem = isOrg
    ? { name: 'Q1 2026 Program Review', meta: '14 documents · Active' }
    : { name: 'M.J.', meta: '7 documents · 8 weeks' }

  const prevItems = isOrg
    ? [
        { name: '2025 Annual Report', meta: '28 documents' },
        { name: 'Bissell Partnership', meta: '11 documents' },
        { name: 'Funder Reports Q4', meta: '9 documents' },
      ]
    : [
        { name: 'K.T.', meta: '12 documents' },
        { name: 'D.A.', meta: '5 documents' },
      ]

  const label = isOrg ? 'Projects' : 'Patients'
  const newLabel = isOrg ? '+ New project' : '+ New patient'

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 12,
        padding: '20px 16px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        width: 260,
        flexShrink: 0,
        alignSelf: 'flex-start',
      }}
    >
      <div style={{
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: 'var(--text-tertiary)',
        marginBottom: 12,
        fontFamily: 'var(--font-sans)',
      }}>
        {label}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Active item */}
        <div style={{
          padding: '10px 12px 10px 10px',
          borderRadius: 6,
          background: 'rgba(180,164,232,0.08)',
          borderLeft: '2px solid var(--accent)',
          cursor: 'default',
        }}>
          <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>
            {activeItem.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
            {activeItem.meta}
          </div>
        </div>

        {prevItems.map((item, i) => (
          <button
            key={i}
            title="Demo: this project is illustrative only"
            style={{
              padding: '10px 12px',
              borderRadius: 6,
              fontSize: 13,
              color: 'var(--text-secondary)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--card-bg-hover)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            <div>{item.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
              {item.meta}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onNewClick}
        style={{
          marginTop: 16,
          width: '100%',
          padding: '10px 12px',
          background: 'rgba(180,164,232,0.06)',
          border: '1px dashed var(--border-active)',
          borderRadius: 6,
          color: 'var(--accent)',
          fontSize: 13,
          textAlign: 'center',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(180,164,232,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(180,164,232,0.06)'}
      >
        {newLabel}
      </button>
    </motion.div>
  )
}
