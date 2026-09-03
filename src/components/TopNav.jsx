export default function TopNav({ onHome, trail, tabs, activeTab, onTab }) {
  return (
    <nav
      style={{
        borderBottom: '1px solid var(--line)',
        background: 'var(--surface)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        height: 54,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <button
        onClick={onHome}
        style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'baseline', gap: 8 }}
      >
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--plum)' }}>
          Insyte
        </span>
        <span style={{ fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Demo
        </span>
      </button>

      {trail && (
        <>
          <span style={{ color: 'var(--line-strong)' }}>/</span>
          <span style={{ fontSize: 13.5, color: 'var(--ink-secondary)' }}>{trail}</span>
        </>
      )}

      {tabs && (
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onTab(t.id)}
              className="ins-btn"
              style={{
                padding: '5px 12px',
                fontSize: 12.5,
                background: activeTab === t.id ? 'var(--cream)' : 'var(--surface)',
                borderColor: activeTab === t.id ? 'var(--violet)' : 'var(--line-strong)',
              }}
              title={t.meta}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
