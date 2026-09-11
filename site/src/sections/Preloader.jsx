import { useEffect, useState } from 'react'

export default function Preloader() {
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 500)
    const t2 = setTimeout(() => setPhase('done'), 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#070b14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'reveal' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'reveal' ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '0 24px',
          transform: phase === 'loading' ? 'translateY(30px)' : 'translateY(0)',
          opacity: phase === 'loading' ? 0 : 1,
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: 'clamp(10px, 1.6vw, 14px)',
            fontWeight: 400,
            letterSpacing: '0.32em',
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          Welcome
        </span>
        <span
          style={{
            display: 'block',
            fontSize: 'clamp(24px, 6vw, 60px)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: '#ffffff',
          }}
        >
          HNK IoT Solutions
        </span>
      </div>
    </div>
  )
}
