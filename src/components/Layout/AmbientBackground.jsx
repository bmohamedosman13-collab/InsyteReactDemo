export default function AmbientBackground() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {/* Dotted grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />
      {/* Primary radial glow top-center */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1200px',
        height: '800px',
        background: 'radial-gradient(ellipse at center, rgba(45,27,78,0.45) 0%, rgba(107,79,186,0.15) 30%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      {/* Secondary glow bottom-right */}
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        right: '-150px',
        width: '600px',
        height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(45,27,78,0.25) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
    </div>
  )
}
