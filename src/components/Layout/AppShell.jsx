import AmbientBackground from './AmbientBackground'
import TopNav from './TopNav'

export default function AppShell({ children, showNav = true }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <AmbientBackground />
      {showNav && <TopNav />}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
    </div>
  )
}
