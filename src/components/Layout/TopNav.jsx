import { useNavigate, useLocation } from 'react-router-dom'

function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8, flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" stroke="#B4A4E8" strokeWidth="1.5" />
      <rect
        x="9" y="1"
        width="6" height="6"
        fill="#B4A4E8"
        transform="rotate(45 12 4)"
      />
    </svg>
  )
}

export default function TopNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const isOrg = location.pathname === '/org'
  const isCase = location.pathname === '/case'

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      height: 60,
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative',
      zIndex: 10,
      background: 'rgba(15,10,31,0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <LogoMark />
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 22,
          fontWeight: 500,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
        }}>
          Insyte
        </span>
      </button>

      <div style={{
        display: 'flex',
        gap: 4,
        padding: 4,
        background: 'var(--card-bg)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 8,
      }}>
        {[
          { label: 'Organization', path: '/org', active: isOrg },
          { label: 'Casework', path: '/case', active: isCase },
        ].map(({ label, path, active }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              padding: '6px 14px',
              fontSize: 13,
              fontFamily: 'var(--font-sans)',
              color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: active ? 'var(--card-bg-hover)' : 'transparent',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}
