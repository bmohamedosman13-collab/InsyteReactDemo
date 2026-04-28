export default function DocumentRenderer({ doc }) {
  if (!doc) return null

  const orgName = doc.id.startsWith('doc-1') || parseInt(doc.id.split('-')[1]) <= 14
    ? 'Northbridge Youth Mental Health Society'
    : 'Northbridge Clinical Services'

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      {/* Document header */}
      <div style={{
        borderBottom: '2px solid #2D1B4E',
        paddingBottom: 16,
        marginBottom: 24,
      }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#888',
          marginBottom: 6,
        }}>
          {orgName}
        </div>
        <h1 style={{
          fontSize: 26,
          fontWeight: 500,
          color: '#2D1B4E',
          marginBottom: 8,
          lineHeight: 1.3,
        }}>
          {doc.title}
        </h1>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: '#666',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px 16px',
        }}>
          <span><strong>Author:</strong> {doc.author}</span>
          <span>·</span>
          <span><strong>Date:</strong> {formatDate(doc.date)}</span>
          {doc.pages && <span>· <strong>Pages:</strong> {doc.pages}</span>}
        </div>
      </div>

      {/* Sections */}
      {doc.sections.map((section, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 19,
            fontWeight: 500,
            color: '#2D1B4E',
            marginBottom: 10,
          }}>
            {section.heading}
          </h2>
          {section.body.split('\n\n').map((para, j) => (
            <p key={j} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.75,
              color: '#2A2A2A',
              marginBottom: para.includes('\n') ? 0 : 14,
              whiteSpace: 'pre-line',
            }}>
              {para}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
}
