import { useNavigate } from 'react-router-dom'
import TopNav from '../components/TopNav.jsx'

/**
 * Landing picker. Spec section 1 keeps this stage, restyled to the light
 * cream system. The client code gate that used to follow it is disabled, so
 * each card goes straight to its redaction review.
 */
export default function Landing() {
  const navigate = useNavigate()
  return (
    <>
      <TopNav onHome={() => navigate('/')} />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '72px 24px 60px' }}>
        <h1 style={{ fontSize: 40, lineHeight: 1.14, marginBottom: 14 }}>
          Evidence you can point at.
        </h1>
        <p style={{ fontSize: 16.5, color: 'var(--ink-secondary)', maxWidth: 620, marginBottom: 44 }}>
          Insyte reads the documents you already have, redacts them before anything is analysed,
          and cites every line of what it gives back. Pick a track to walk through.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <PickerCard
            title="Casework"
            lede="Two client folders, one an eleven month depression episode and one a compensable injury claim."
            points={[
              '11 documents across 2 clients',
              '3 client-authored documents',
              'Exports: episode summary, SOAP, DAP, WCB C-851',
            ]}
            onClick={() => navigate('/case')}
          />
          <PickerCard
            title="Organization"
            lede="One fiscal year at a youth mental health nonprofit. Programs, funding, staffing, governance."
            points={[
              '15 documents across 1 fiscal year',
              'Board minutes, financials, incident log',
              'Exports: quarterly report, grant application',
            ]}
            onClick={() => navigate('/org')}
          />
        </div>

        <p style={{ marginTop: 40, fontSize: 13, color: 'var(--ink-faint)' }}>
          Every document in this demo is synthetic. No real person or organisation is represented.
        </p>
      </main>
    </>
  )
}

function PickerCard({ title, lede, points, onClick }) {
  return (
    <button
      onClick={onClick}
      className="ins-card"
      style={{ padding: '24px 24px 20px', textAlign: 'left', transition: 'border-color 0.15s ease, transform 0.15s ease' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--violet)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--line)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <h2 style={{ fontSize: 23, marginBottom: 8 }}>{title}</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-secondary)', marginBottom: 16, lineHeight: 1.6 }}>{lede}</p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {points.map((p) => (
          <li key={p} style={{ fontSize: 12.8, color: 'var(--ink-tertiary)', display: 'flex', gap: 8 }}>
            <span style={{ color: 'var(--violet)' }}>·</span>
            {p}
          </li>
        ))}
      </ul>
    </button>
  )
}
