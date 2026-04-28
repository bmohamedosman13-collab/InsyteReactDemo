import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppShell from '../components/Layout/AppShell'

function PickerCard({ icon, title, description, cta, onClick, delay }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={onClick}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 16,
        padding: '32px 28px',
        textAlign: 'left',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        cursor: 'pointer',
        width: '100%',
        transition: 'border-color 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border-active)'
        e.currentTarget.style.background = 'var(--card-bg-hover)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
        e.currentTarget.style.background = 'var(--card-bg)'
      }}
    >
      <div style={{
        width: 40,
        height: 40,
        border: '1px solid var(--accent)',
        borderRadius: icon === 'circle' ? '50%' : 10,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 18,
          height: 18,
          border: '1.5px solid var(--accent)',
          borderRadius: icon === 'circle' ? '50%' : 4,
        }} />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 24,
        fontWeight: 500,
        color: 'var(--text-primary)',
        marginBottom: 8,
      }}>
        {title}
      </h3>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: 13,
        lineHeight: 1.6,
        marginBottom: 20,
      }}>
        {description}
      </p>
      <span style={{
        color: 'var(--accent)',
        fontSize: 13,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        {cta}
      </span>
    </motion.button>
  )
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <AppShell showNav={false}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--accent)',
            marginBottom: 12,
            fontFamily: 'var(--font-sans)',
          }}
        >
          Document Intelligence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}
        >
          Welcome to Insyte
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: 15,
            maxWidth: 480,
            marginBottom: 48,
            lineHeight: 1.6,
          }}
        >
          Choose a workspace to begin. This is an interactive demo using sample data.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
          maxWidth: 720,
          width: '100%',
        }}>
          <PickerCard
            icon="square"
            title="Organization"
            description="For agencies, programs, and leadership reviewing documents across multiple cases, files, and reports."
            cta="Enter workspace →"
            onClick={() => navigate('/org')}
            delay={0.15}
          />
          <PickerCard
            icon="circle"
            title="Casework"
            description="For clinicians and caseworkers reviewing all documents related to a single client over time."
            cta="Enter workspace →"
            onClick={() => navigate('/case')}
            delay={0.22}
          />
        </div>
      </div>
    </AppShell>
  )
}
