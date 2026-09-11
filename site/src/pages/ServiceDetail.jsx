import { useEffect } from 'react'
import { services } from '../data/services'

export default function ServiceDetail({ serviceId, onBack, onEnquire }) {
  const service = services.find((s) => s.id === serviceId)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [serviceId])

  if (!service) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', color: '#0b1220', flexDirection: 'column', gap: '20px', paddingTop: '84px' }}>
        <p style={{ fontSize: '20px' }}>Service not found.</p>
        <BackButton onClick={onBack} />
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Hero image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(340px, 60vh, 620px)',
          overflow: 'hidden',
          backgroundColor: '#070b14',
        }}
      >
        <img
          src={service.img}
          alt={service.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />
        <div style={{ position: 'absolute', top: 'clamp(90px, 13vh, 120px)', left: 'clamp(20px, 4vw, 56px)' }}>
          <BackButton onClick={onBack} light />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(28px, 5vw, 56px)',
            left: 'clamp(20px, 4vw, 56px)',
            right: 'clamp(20px, 4vw, 56px)',
            color: '#ffffff',
          }}
        >
          <p style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: '10px' }}>
            Service {service.id} &middot; {service.category}
          </p>
          <h1
            style={{
              fontSize: 'clamp(30px, 6vw, 72px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              margin: 0,
              maxWidth: '18ch',
            }}
          >
            {service.title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 56px) clamp(72px, 10vw, 120px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
              color: '#0b1220',
              marginBottom: 'clamp(32px, 5vw, 48px)',
              maxWidth: '620px',
            }}
          >
            {service.tagline}
          </p>

          {service.description.map((p, i) => (
            <p key={i} style={{ fontSize: '15.5px', lineHeight: 1.8, color: '#333333', marginBottom: '20px', maxWidth: '620px' }}>
              {p}
            </p>
          ))}

          <div style={{ marginTop: 'clamp(40px, 6vw, 64px)', paddingTop: '28px', borderTop: '1px solid #e5e5e5' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#0b1220', textTransform: 'uppercase', marginBottom: '24px' }}>
              What&rsquo;s included
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: '12px 32px',
              }}
            >
              {service.features.map((f) => (
                <li key={f} style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#333333', paddingLeft: '18px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: '11px', width: '8px', height: '1px', backgroundColor: '#0b1220' }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: enquiry panel */}
        <aside
          style={{
            position: 'sticky',
            top: '104px',
            border: '1px solid #0b1220',
            padding: 'clamp(24px, 3vw, 32px) clamp(20px, 3vw, 28px)',
            backgroundColor: '#ffffff',
          }}
        >
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666666', marginBottom: '14px' }}>
            Engagement
          </p>
          <dl style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', padding: '16px 0', margin: '0 0 26px', display: 'grid', gap: '10px' }}>
            <Row k="Focus" v={service.focus} />
            <Row k="Turnaround" v={service.turnaround} />
            <Row k="How it's scoped" v={service.engagement} />
            <Row k="Reach" v={service.reach} />
          </dl>

          <button
            onClick={() => onEnquire(service.title)}
            style={{
              width: '100%',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: '#ffffff',
              backgroundColor: '#0b1220',
              border: '1px solid #0b1220',
              padding: '15px 22px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
            }}
          >
            Enquire About This Service
          </button>
          <button
            onClick={onBack}
            style={{
              width: '100%',
              marginTop: '12px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: '#666666',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: 'inherit',
            }}
          >
            &larr; Back to services
          </button>
        </aside>
      </div>
    </div>
  )
}

function Row({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '13px', color: '#333333' }}>
      <dt style={{ color: '#666666', flexShrink: 0 }}>{k}</dt>
      <dd style={{ margin: 0, fontWeight: 500, color: '#0b1220', textAlign: 'right' }}>{v}</dd>
    </div>
  )
}

function BackButton({ onClick, light }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: '12px',
        letterSpacing: '0.14em',
        padding: '11px 22px',
        border: light ? '1px solid #ffffff' : '1px solid #0b1220',
        backgroundColor: light ? 'rgba(0,0,0,0.35)' : 'transparent',
        color: light ? '#ffffff' : '#0b1220',
        cursor: 'pointer',
        textTransform: 'uppercase',
        fontFamily: 'inherit',
        backdropFilter: light ? 'blur(6px)' : 'none',
      }}
    >
      &larr; Back
    </button>
  )
}
